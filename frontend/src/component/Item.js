function Item({item}) {
    return (
        <li>
            <ul>
                <li>{item.name}</li>
                <li>{(item.price / 100)}zł</li>
                <li>{item.quantity}</li>
            </ul>
        </li>
    )
}

export default Item;