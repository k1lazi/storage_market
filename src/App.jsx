import Header from "./components/header.jsx";
import MainPage from "./components/mainpage.jsx";
import AddProduct from "./components/addproduct.jsx";
import ProductList from "./components/productlist.jsx";
import Update from "./components/update.jsx";
import {
    HashRouter,
    Route,
    Routes,
} from "react-router-dom"
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gbfokwyztnhqbaiupstq.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdiZm9rd3l6dG5ocWJhaXVwc3RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0NzIzNjEsImV4cCI6MjAxMzA0ODM2MX0.bAB49s0Ivl0YQ6rLIic9HZqCt7VqlC5doSJmW1eSww0"
const supabase = createClient(supabaseUrl, supabaseKey)
export {supabase};
function App() {
return(
    <>
        <HashRouter>
            <Routes>
                <Route  element={<Header/>}>
                    <Route path="/" element={<MainPage/>} />
                    <Route path="/addproduct" element={<AddProduct/>} />
                    <Route path="/productlist" element={<ProductList />} />
                    <Route path="/:id" element={<Update/>}/>
                </Route>
            </Routes>
        </HashRouter>
    </>
)
}

export default App;
