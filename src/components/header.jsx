import {
    Link,
    Outlet
} from "react-router-dom";

const handleHamburgerClick = () =>  {
    const headerElements = document.querySelector(".header_elements");
    const headerActive = document.querySelector(".header");
    const headerHamburger = document.querySelector(".header_hamburger");
    headerElements.classList.toggle("active");
    headerActive.classList.toggle("active");
    headerHamburger.classList.toggle("active")
}

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
                <div className="header_hamburger" onClick={handleHamburgerClick}>
                    <div className="header_hamburger_element"></div>
                    <div className="header_hamburger_element"></div>
                    <div className="header_hamburger_element"></div>
                </div>
            </div>
            <Outlet/>

        </div>
    )
}


export default Header;

