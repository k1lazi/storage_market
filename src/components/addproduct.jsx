import {useState} from "react";
import {supabase} from "../App.jsx";
import "../style/_addProduct.scss";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import {InputAdornment, MenuItem} from "@mui/material";
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput'

function AddProduct() {


    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [part, setPart] = useState("")
    const [description, setDescription] = useState("")
    const [formError, setFormError] = useState(null)

    // przekazywanie wartości z inputów, walidacja ich
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !location || !price || !quantity || !part || !description) {
            setFormError("Please complete the fields")
            return
        }
        const {data, error} = await supabase
            .from("products")
            .insert([{name, location, price, quantity, part, description}])
        if (error) {
            console.log(error)
            setFormError("Please complete the fields")
        }
        if (data) {
            console.log(data)
            setFormError(null)
        }
        setName("");
        setLocation("");
        setPrice("");
        setQuantity("");
        setPart("");
        setDescription("");
    }


    //wyświetlane inputy
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
                    <span>Add Product</span></button>
                {formError && <p className="error" >{formError}</p>}
            </form>
        </div>
    )

}

export default AddProduct;



