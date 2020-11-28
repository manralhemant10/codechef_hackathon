import React, {useContext} from 'react'
import { Route, Switch } from 'react-router-dom';
import Nav from "./components/Nav";
import Home from './components/Home/Home'
import Login from './components/User/Login'
import Dashboard from './components/User/Dashboard/Dashboard'
import { isLoggedin } from './components/Loggedin';
import Viewalltags from './components/Home/Viewalltags';
import Logout from './components/User/Logout';


function App() {
  const logState = useContext(isLoggedin)
  const { loginState } = logState
 
  return (
    <>
      <div className="mainContainer">
        <Nav/>
        <Switch>
          <Route exact path="/" component ={Home}/>
          <Route exact path="/login" component ={Login}/>
          <Route exact path="/alltags" component ={Viewalltags}/>
          <Route exact path="/logout" component ={Logout}/>
          {loginState?(<Route exact path="/dashboard" component ={Dashboard}/>):<Route exact path="/dashboard" component ={Login}/>}
          <Route component={Home}/>
        </Switch>
      </div>
    </>
  );
}

export default App;
