import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {supabase} from "../App.jsx";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import {InputAdornment, MenuItem} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";

function Update() {
    const {id} = useParams()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [part, setPart] = useState("")
    const [description, setDescription] = useState("")
    const [formError, setFormError] = useState(null)

    //update produktów
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !location || !price || !quantity || !part || !description) {
            setFormError("Please complete the fields")
            return
        }
        const {data, error} = await supabase
            .from("products")
            .update({name, location, price, quantity , part, description})
            .eq("id", id)
        if(error) {
            console.log(error)
            setFormError("Please complete the fields")
        }
        if(data) {
            console.log(data)
            setFormError(null)

        }
        //po zaaktualizowaniu powrót do listy produktów
        navigate("/productlist");
    }


    useEffect(() => {
        const updateProduct = async () => {
           const {data, error} = await supabase
               .from("products")
               .select()
               .eq("id", id)
               .single();

            if (error) {
                navigate("/", {replace: true})
            }
            if(data) {
                setName(data.name)
                setLocation(data.location)
                setPrice(data.price)
                setQuantity(data.quantity)
                setPart(data.part)
                setDescription(data.description)
                console.log(data)
            }
        }
        updateProduct();

    }, [id, navigate]);

    return (

        <div className="addProduct">
            <form onSubmit={handleSubmit} className="addProduct_form">
                <div className="addProduct_form_column">

                    <TextField
                        className="addProduct_form_input"
                        id="outlined-basic"
                        label="Product Name"
                        variant="outlined"
                        // id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <FormControl className="addProduct_form_input">
                        <InputLabel id="demo-simple-select-label">Location</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={location}
                            label="Location"
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <MenuItem value="S01">S01</MenuItem>
                            <MenuItem value="S02">S02</MenuItem>
                            <MenuItem value="S03">S03</MenuItem>
                            <MenuItem value="S04">S04</MenuItem>
                            <MenuItem value="S05">S05</MenuItem>
                            <MenuItem value="S06">S06</MenuItem>
                            <MenuItem value="S07">S07</MenuItem>
                            <MenuItem value="S08">S08</MenuItem>
                            <MenuItem value="S09">S09</MenuItem>
                            <MenuItem value="S10">S10</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className="addProduct_form_input" >
                        <InputLabel id="demo-simple-select-label">Price</InputLabel>
                        <OutlinedInput
                            labelId="demo-simple-select-label"
                            id="outlined-adornment-weight"
                            label="Price"
                            variant="outlined"
                            type="number"
                            endAdornment={<InputAdornment position="end">zł</InputAdornment>}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </FormControl>

                    <TextField
                        className="addProduct_form_input"
                        id="outlined-basic"
                        label="Quantity"
                        variant="outlined"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />

                    <TextField
                        className="addProduct_form_input"
                        id="outlined-basic"
                        label="Part Number"
                        variant="outlined"
                        type="text"
                        value={part}
                        onChange={(e) => setPart(e.target.value)}
                    />

                    <TextField
                        className="addProduct_form_input"
                        id="outlined-multiline-flexible"
                        label="Description"
                        multiline
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}

                    />
                </div>
                <button className="addProduct_form_submitButton">
                    <span>Update Product</span></button>
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    )

}

export default Update;


//
// return (
//     <div>
//         <div className="addProduct">
//             <form className="addProduct_form" onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder={"Product Name"}
//                     id="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                 />
//                 <select
//                     placeholder={"Location"}
//                     id="location"
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                 >
//                     <option value=" ">Location</option>
//                     <option value="S01">S01</option>
//                     <option value="S02">S02</option>
//                     <option value="S03">S03</option>
//                     <option value="S04">S04</option>
//                     <option value="S05">S05</option>
//                     <option value="S06">S06</option>
//                     <option value="S07">S07</option>
//                     <option value="S08">S08</option>
//                     <option value="S09">S09</option>
//                     <option value="S10">S10</option>
//                 </select>
//                 <input
//                     type="number"
//                     placeholder={"Product Price"}
//                     id="price"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                 />
//                 <input
//                     type="number"
//                     placeholder={"Quantity"}
//                     id="quantity"
//                     value={quantity}
//                     onChange={(e) => setQuantity(e.target.value)}
//                 />
//                 <input
//                     type="text"
//                     placeholder={"Part Number"}
//                     id="part"
//                     value={part}
//                     onChange={(e) => setPart(e.target.value)}
//                 />
//                 <textarea
//                     placeholder={"Product Description"}
//                     id="description"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//
//                 />
//                 <button>Update Product</button>
//                 {formError && <p className="error">{formError}</p>}
//             </form>
//         </div>
//     </div>
// )