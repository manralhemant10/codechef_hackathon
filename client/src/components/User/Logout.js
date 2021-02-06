import React,{useContext} from 'react'
import { Redirect } from 'react-router-dom'
import { isLoggedin } from '../Loggedin';


const Logout = ()=>{
    const logState = useContext(isLoggedin)
    const {setLoginState } = logState;
        setLoginState(true)
        localStorage.clear()
        
        return(
        <Redirect to="/" />
        )
       
}
export default Logout