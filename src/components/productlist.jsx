import {useEffect, useState} from "react";
import {supabase} from "../App.jsx";
import {Link} from "react-router-dom";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell, TableContainer
} from "@mui/material"


// wyświetlenie produktu
const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const {data, error} = await supabase
            .from('products')
            .select('*');

        if (error) {
            console.error("Error fetching products:", error);
        }

        if (data) {
            setProducts(data);
        }
    };

    // usuwanie produktu z listy
    const handleDelete = async (id) => {
        const {error} = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) {
            console.error(`Error deleting product with id ${id}:`, error);
            return;
        }

        // zaktualizowanie  stanu komponentu (element znika bez odświeżania)
        setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    };

    return (
        <div>
            <TableContainer className="ListProduct">
                <Table aria-label="Products table" stickyHeader className="Test3">
                    <TableHead>
                        <TableRow classes="ListProduct_head">
                            <TableCell className="ListProduct_head">Lp.</TableCell>
                            <TableCell align={"center"} className="ListProduct_head">Name</TableCell>
                            <TableCell className="ListProduct_head">Location</TableCell>
                            <TableCell className="ListProduct_head">Price</TableCell>
                            <TableCell className="ListProduct_head">Quantity</TableCell>
                            <TableCell className="ListProduct_head">Part Number</TableCell>
                            <TableCell align={"center"} className="ListProduct_head">Product Description</TableCell>
                            <TableCell className="ListProduct_head"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell className="ListProduct_body">{index + 1}</TableCell>
                                <TableCell className="ListProduct_body">{row.name}</TableCell>
                                <TableCell className="ListProduct_body">{row.location}</TableCell>
                                <TableCell className="ListProduct_body">{row.price}</TableCell>
                                <TableCell className="ListProduct_body">{row.quantity}</TableCell>
                                <TableCell className="ListProduct_body">{row.part}</TableCell>
                                <TableCell className="ListProduct_body">{row.description}</TableCell>
                                <TableCell className="ListProduct_body">
                                    <div>
                                        <Tooltip title="Edit">
                                            <IconButton>
                                                <Link to={"/" + row.id} className="ListProduct_body_button"><ModeEditOutlinedIcon/></Link>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton>
                                                <a onClick={() => handleDelete(row.id)}><DeleteOutlineIcon/></a>
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*{products.map((product) => (*/}
            {/*    <div key={product.id} className="ListProduct_elements">*/}

            {/*        <div>Name: {product.name}</div>*/}
            {/*        <div>Location: {product.location}</div>*/}
            {/*        <div>Price: {product.price} zł</div>*/}
            {/*        <div>Quantity: {product.quantity}</div>*/}
            {/*        <div>Part Number: {product.part}</div>*/}
            {/*        <div>Product Description: {product.description}</div>*/}
            {/*        <div className="buttons">*/}
            {/*            <Link to={"/" + product.id}><ModeEditOutlinedIcon/></Link>*/}
            {/*            <button onClick={() => handleDelete(product.id)}><DeleteOutlineIcon/></button>*/}
            {/*        </div>*/}

            {/*    </div>*/}
            {/*))}*/}
        </div>
    );
};

export default ProductList;

