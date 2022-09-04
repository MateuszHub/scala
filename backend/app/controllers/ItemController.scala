package controllers

import play.api.libs.json.Format.GenericFormat
import play.api.libs.json._
import play.api.mvc.{Action, AnyContent, BaseController, ControllerComponents}
import repositories.Tables.ItemsRow
import slick.jdbc.JdbcBackend.Database
import slick.jdbc.MySQLProfile.api._
import slick.lifted.TableQuery

import javax.inject.Inject
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.language.postfixOps


class ItemController @Inject()(val controllerComponents: ControllerComponents)
  extends BaseController {
  val items = TableQuery[repositories.Tables.Items]

  implicit val itemFormat: OFormat[ItemsRow] = Json.format[ItemsRow]

  val db = Database.forConfig("mydb")

  def getAll(): Action[AnyContent] = Action.async {
    val res = db.run(items.result)
    res.map { item =>
      Ok(Json.toJson(item))
    }
  }

  def add(): Action[AnyContent] = Action.async {
    request =>
      val content = request.body
      val jsonObject = content.asJson
      val item: Option[ItemsRow] =
        jsonObject.flatMap(
          Json.fromJson[ItemsRow](_).asOpt
        )
      val insertPlayerQuery = items += item.get
      val insertResult: Future[Int] = db.run(insertPlayerQuery)
      insertResult.map {
        res => Ok(res.toString)
      }
  }

  def deactive(id: Int): Action[AnyContent] = Action.async {
    request =>
      val content = request.body
      val jsonObject = content.asJson
      val item: Option[ItemsRow] =
        jsonObject.flatMap(
          Json.fromJson[ItemsRow](_).asOpt
        )
      val db = Database.forConfig("mydb")
      val itemById = items.filter(_.id === id)
      val res = db.run(itemById.result)
      res.map { item =>
        if (item.nonEmpty) {
          val newItem = item.head.copy(active = Some(false))
          val q = itemById.update(newItem)
          db.run(q)
          Ok(Json.toJson(newItem))
        } else
          Ok(Json.toJson("Not found"))
      }
  }
}
