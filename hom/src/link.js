import React from 'react';
import { Link,Outlet } from "react-router-dom";
import "./link.css";

export default function Linked() {
  return (
    <>
    <div className='links'> 
        <ul>
         <li><Link to="Vehicles" className='single-link'>Vehicles</Link>
         </li>
         <li><Link to="Electronic" className='single-link'>Electronic</Link>
         </li>
         <li>
          <Link to="Houses" className='single-link'>House and House holds</Link>
         </li>
         <li>
          <Link to="Sports" className='single-link'>Sports</Link>
         </li>
         <li>
          <Link to="Others" className='single-link'>Others</Link>
         </li>
        </ul>
        
    </div>
    <Outlet/>
    </>
  )
}
