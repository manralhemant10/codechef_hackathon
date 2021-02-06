import React,{useContext} from 'react'
import {NavLink} from 'react-router-dom'
import { isLoggedin } from './Loggedin';

const Nav =()=>{
    const logState = useContext(isLoggedin)
    const { loginState } = logState


    return(
    <>
        <div className="navContainer">
            <h3>Practice Problems</h3>
            <nav >
                <NavLink activeClassName="navActive" className="navItems"  exact  to="/">Home</NavLink>
                
                {
                    loginState?
                    <NavLink activeClassName="navActive" className="navItems"  exact  to="/dashboard">Dashboard</NavLink>  
                    :null
                }
                {
                    loginState?
                    <NavLink className="navItems"to="/logout">Logout</NavLink>:
                    <NavLink activeClassName="navActive" className="navItems" exact  to="/login">Login</NavLink>
                }
           </nav>
            
            
        </div>
    </>
    )
}

export default Nav