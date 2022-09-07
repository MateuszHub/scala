import { Tab, Tabs } from "react-bootstrap";
import ItemAdd from "../component/ItemAdd";

function AddItem() {

    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Add game</h2>
            <ItemAdd />

        </main>
    );
}

export default AddItem;