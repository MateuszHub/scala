function Item({item}) {
    return (
        <li>
            <ul>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.quantity}</li>
            </ul>
        </li>
    )
}

export default Item;