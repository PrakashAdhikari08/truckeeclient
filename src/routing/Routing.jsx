import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from "../home/Home";
import Login from "../forms/Login";
import Register from "../forms/Register";
import VerifyAccount from "../forms/VerifyAccount";


const Routing = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path={"/"}   component={Home}/>
                    <Route path={"/login"}    component={Login}/>
                    <Route path={"/register"}    component={Register}/>
                    <Route path={"/verify-account"}    component={VerifyAccount}/>


                    <Route />
                    <Route />

                </Switch>
            </Router>
            
        </>
    );
};

export default Routing;