import React from "react";
import { Link } from "react-router-dom";



export default function Header(){
    
  

  
    return(
        <>
     <nav className="nav">
  <Link className="nav-link active" aria-current="page" to="/">Add Contact</Link>
  <Link className="nav-link" to="/show">Show List</Link>

</nav>
        </>
    )
}