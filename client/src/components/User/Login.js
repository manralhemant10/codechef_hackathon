import React, {useState, useContext} from 'react'
import axios from 'axios';
import { isLoggedin } from '../Loggedin';
import { Redirect } from 'react-router-dom';


const Login = ()=>{

    const logState = useContext(isLoggedin)
    const { loginState,setLoginState } = logState;
    const [user, setUser] = useState({
        name: '',
        email:'',
        password:''
    })
    const [reg, setReg] = useState(0)

    const [err, setErr] = useState('');

    const onChangeInput = e=>{
        const {name, value}=e.target;
        setUser({...user, [name]:value})
        setErr('')
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        await axios.post('http://localhost/codechef/server/api/v1/register',{
            username:user.name,
            email:user.email,
            password:user.password
        })
        .then(res=>{
            setUser({name:'',email:'',password:''})
        })
        .catch((err)=>{
               setErr("Invalid data")
            }
        )
    }

    const LoginSubmit = async e =>{
        e.preventDefault()
            await axios.post('http://localhost/codechef/server/api/v1/login',{
                email:user.email,
                password:user.password
            })
            .then(res=>{
                setUser({name:'',email:'',password:''})
                localStorage.setItem('token', res.data.token)
                 //setting to false becaue it is handled inside Loggedin.js
                setLoginState(false) 
            })
            .catch((err)=>{
                   setErr("Invalid credentials")
                }
            )
           

    }

   const showReg=()=> {
       setReg(1)
       setUser({name:'',email:'',password:''})
       setErr("")
}


   const showlog=()=>{
        setReg(0)
        setUser({name:'',email:'',password:''})
       setErr("")
   }
    return(
        loginState?<Redirect to='/dashboard'/>:
        (<div className="loginContainer">
        {
        reg?(
            <div className="login" id="regdiv">
                    <h1 className="logh2">Register</h1>
                    <form onSubmit={registerSubmit} className="login-form">
                        <input type="text" name="name" 
                            placeholder="User Name" required value={user.name}  onChange={onChangeInput}/>
                        <input type="email" name="email" 
                            placeholder="Email" required value={user.email}  onChange={onChangeInput}/>
                        <input type="password" name="password"
                            placeholder="Password" required value={user.password} autoComplete="true"  onChange={onChangeInput}/>
                        <button className="btnlog" type="submit">Register</button>
                            <p style={{color:"#06a1cc"}}>You have an account?<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="sp" onClick={showlog}>Login Now</span></p>
                        <h3 style={{color: "#06a1cc"}}>{err}</h3>
                    </form>
            </div>
        )
        :
        (
            <div className="login" id="logindiv">
                <h1 className="logh2">Login</h1>
                    <form onSubmit={LoginSubmit} className="login-form">
                        <input type="email" name="email" 
                            placeholder="Email" required value={user.email} onChange={onChangeInput}/>
                        <input type="password" name="password" 
                            placeholder="Password" required value={user.password} autoComplete="true"  onChange={onChangeInput}/>
                        <button className="btnlog" type="submit">Login</button>
                            <p style={{color:"#06a1cc"}}>You don't have an account?<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="sp" onClick={showReg}>Register Now </span></p>
                        <h3 style={{color: "#06a1cc"}}>{err}</h3>
                    </form>
            </div>
        )
        }
        
        </div>)
    )
}

export default Login