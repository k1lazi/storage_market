import {supabase} from "../App.jsx";
import {useEffect, useState} from "react";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

function MainPage() {
    const [activeLocation, setActiveLocation] = useState("");
    const [productsLocation, setProductsLocation] = useState("")
    const [productsForActiveLocation, setProductsForActiveLocation] = useState("")

    //pokazanie listy
    const handleLocationHover = (location) => {
        setActiveLocation(location);
        // pokazanie produktu do odpowiedniej lokalizacji
        const productsForLocation = productsLocation.filter(product => product.location === location);
        setProductsForActiveLocation(productsForLocation);
    }

    // chowanie listy
    const handleLocationLeave = () => {
        setActiveLocation(null);
        setProductsForActiveLocation([])
    }

    useEffect(() => {


        const getLocation = async () => {
            const {data, error} = await supabase
                .from("products")
                .select("*")


            if (error) {
                console.log(error)
            }
            if (data) {
                console.log(data)
                setProductsLocation(data)
            }
        }
        getLocation();
    }, []);
    return (
        <div className="mainPage">
            <div className="mainPage_element" onClick={() => handleLocationHover("S01")}>S01</div>
            <div className="mainPage_element" onClick={() => handleLocationHover("S02")}>S02</div>
            <div className="mainPage_element" onClick={() => handleLocationHover("S03")}>S03</div>
            <div className="mainPage_element" onClick={() => handleLocationHover("S04")}>S04</div>
            <div className="mainPage_element" onClick={() => handleLocationHover("S05")}>S05</div>
            <div className="mainPage_element" onClick={() => handleLocationHover("S06")}>S06</div>
            <div className="mainPage_element" onClick={() => handleLocationHover("S07")}>S07</div>
            <div className="mainPage_element" onClick={() => handleLocationHover("S08")}>S08</div>
            <div className="mainPage_element" onClick={() => handleLocationHover("S09")}>S09</div>
            <div className="mainPage_element" onClick={() => handleLocationHover("S10")}>S10</div>

            {activeLocation && (

                <div className="mainPage_element_list">
                    <div className="mainPage_element_list_table">
                        <div>Name</div>
                        <div>Price</div>
                        <div>Quantity</div>
                        <div>Location</div>
                    </div>
                    <button onClick={handleLocationLeave} className="mainPage_element_list_button"><CloseSharpIcon/></button>
                    {productsForActiveLocation.map((product) => (
                        <ul key={product.location} className="mainPage_element_list_row">
                            <div>{product.name}</div>
                            <div>{product.price}zł</div>
                            <div>{product.quantity}</div>
                            <div>{product.location}</div>
                        </ul>
                    ))}

                </div>
            )}
        </div>
    )

}

export default MainPage;


