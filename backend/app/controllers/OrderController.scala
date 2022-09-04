package controllers

import com.stripe.model.Product
import com.stripe.Stripe
import com.stripe.model.checkout.Session
import com.stripe.param.checkout.SessionCreateParams.LineItem.PriceData
import play.api.libs.json.Format.GenericFormat
import play.api.libs.json._
import play.api.mvc.{Action, AnyContent, BaseController, ControllerComponents}
import repositories.Tables.{Items, ItemsOrders, ItemsOrdersRow, Orders, OrdersRow}
import slick.jdbc.JdbcBackend.Database
import slick.jdbc.MySQLProfile.api._
import slick.lifted.TableQuery

import java.sql.Date
import java.time.Instant
import java.util.concurrent.atomic.AtomicInteger
import javax.inject.Inject
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.language.postfixOps
import com.stripe.param.checkout.SessionCreateParams

import com.stripe.net.Webhook
import scala.collection.mutable
import scala.jdk.CollectionConverters.MapHasAsJava

class OrderController @Inject()(val controllerComponents: ControllerComponents)
  extends BaseController {

  implicit val orderFormat: OFormat[OrdersRow] = Json.format[OrdersRow]
  val orders = TableQuery[Orders]
  val items = TableQuery[Items]
  val itemsOrders = TableQuery[ItemsOrders]
  val db = Database.forConfig("mydb")

  def afterPay() = Action(parse.raw).async {
    req => {
      val sigHeader = req.headers.get("Stripe-Signature").get
      val payload = req.body.asBytes().map(_.utf8String).getOrElse("")
      println(sigHeader)
      println(payload)

      val event = Webhook.constructEvent(payload, sigHeader, "")
      if (event.getType == "checkout.session.completed") {
        val sess = event.getDataObjectDeserializer().getObject().get().asInstanceOf[Session];
        if (sess.getPaymentStatus == "paid") {
          val orderq = orders.filter(_.payid === sess.getId)
          val orderr = db.run(orderq.result)
          orderr.map { order =>
            if (order.nonEmpty) {
              val newItem = order.head.copy(paid = Some(sess.getAmountTotal.toInt))
              val q = orderq.update(newItem)
              db.run(q)
              (Ok("paid"))
            } else {
              (NotFound("Not found order " + sess.getId))
            }
          }
        } else {
          Future(NotFound("Wrong event type"))
        }
      } else {
        Future(NotFound("Wrong event type"))
      }

    }
  }

  def pay(id: Int) = Action.async {
    Stripe.apiKey = ""
    val domain = s"https://localhost:9443/orders/${id}/afterpay"

    val orderq = orders.filter(_.id === id)
    val orderr = db.run(orderq.result)
    orderr.map { order =>
      if (order.nonEmpty) {
        var param: mutable.HashMap[String, Object] = mutable.HashMap()
        param += ("name" -> "Somethgin1")

        val product = Product.create(param.asJava)
        val priceData = new PriceData.Builder().setProduct(product.getId)
          .setCurrency("PLN")
          .setUnitAmount(12333)
          .setTaxBehavior(PriceData.TaxBehavior.INCLUSIVE)
          .build();
        val params = SessionCreateParams.builder
          .setMode(SessionCreateParams.Mode.PAYMENT)
          .setSuccessUrl(domain + "?success=true")
          .setCancelUrl(domain + "?canceled=true")
          .addLineItem(
            SessionCreateParams.LineItem.builder.setQuantity(1L).setPriceData(priceData).build).build
        val session = Session.create(params)
        val newItem = order.head.copy(link = Some(session.getUrl), payid = Some(session.getId))
        val q = orderq.update(newItem)
        db.run(q)
        Redirect(session.getUrl)
      } else
        NotFound("Not found")
    }
  }

  def getAll(): Action[AnyContent] = Action.async {
    request => {
      val id = request.session.get("id").get.toInt
      println(id)
      val res = db.run(orders.filter(_.userId === id).result)
      res.map { items =>
        Ok(Json.toJson(items))
      }
    }
  }

  def add(): Action[AnyContent] = Action.async {
    request => {
      val id = request.session.get("id").get
      println(id)
      val content = request.body
      val jsonObject = content.asJson
      val order: Option[List[Int]] =
        jsonObject.flatMap(
          Json.fromJson[List[Int]](_).asOpt
        )
      val o = order.get
      val price = new AtomicInteger(0);
      val itemsInCart = Future.sequence(o.map(id => {
        val singleItem = db.run(items.filter(_.id === id).result)
        singleItem.map(si => {
          if (si.nonEmpty) {
            price.addAndGet(si.head.price.getOrElse(0))
          }
          si.head
        })
      }))
      itemsInCart.flatMap(iIC => {
        val newOrder = new OrdersRow(
          id = 0,
          userId = Some(id.toInt),
          when = Some(new Date(Instant.now().toEpochMilli)),
          paid = Some(price.get()))
        val insertQ = (orders returning orders.map(_.id)) += newOrder
        val insertResult: Future[Int] = db.run(insertQ)
        insertResult.map { insertedId =>
          iIC.foreach(siic => {
            val newItemOrder = new ItemsOrdersRow(0, Some(siic.id), Some(insertedId))
            val insertIOQ = itemsOrders += newItemOrder
            db.run(insertIOQ)
          })
          Ok(Json.toJson(insertedId))
        }
      })
    }
  }


}