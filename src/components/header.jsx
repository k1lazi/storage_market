import {
    Link,
    Outlet
} from "react-router-dom";


function Header() {
    return (
        <div>
            <div className="header">
                <h1 className="header_logo">Storage-Market</h1>
                <ul>
                    <li className="header_elements">
                        <Link to="/" className="header_elements_links" >Main Page </Link>
                        <Link to="/addproduct" className="header_elements_links">Add Product </Link>
                        <Link to="/productlist" className="header_elements_links">Product List </Link>

                    </li>
                </ul>
            </div>
            <Outlet/>

        </div>
    )
}


export default Header;

