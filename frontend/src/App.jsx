import React from "react";
import {BrowserRouter , Routes , Route} from 'react-router-dom'
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProduct from "./component/AddProduct";
import ShowList from "./component/ShowList";
import Update from "./component/Update";
import Header from "./component/Headre";

export default function App(){
    return(
        <>
         <BrowserRouter>
         <Header/>
           <Routes>
           
             <Route path="/" element={<AddProduct/>} />
             <Route path="/show" element={<ShowList/>} />
             <Route path="/edit/:id" element={<Update/>} />
           </Routes>
         </BrowserRouter>
        </>
    )
}