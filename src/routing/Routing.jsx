import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from "../Home";
import Login from "../forms/Login";
import Register from "../forms/Register";
import VerifyAccount from "../forms/VerifyAccount";
import Profile from "../profile/Profile";
import Header from "../navbar/Header";
import ForgetPassword from "../forms/ForgetPassword";
import ResetPassword from "../forms/ResetPassword";


const Routing = () => {
    return (
        <>

            <Router>
                <Header />
                <Switch>
                    <Route exact path={'/'} component={Home}/>
                    <Route path={"/login"}               component={Login}/>
                    <Route path={"/register"}            component={Register}/>
                    <Route path={"/verify-account"}      component={VerifyAccount}/>
                    <Route path={"/profile"}             component={Profile}/>
                    <Route path={"/forget-password"}     component={ForgetPassword}/>
                    <Route path={"/reset-password"}     component={ResetPassword}/>




                    <Route />
                    <Route />

                </Switch>
            </Router>
            
        </>
    );
};

export default Routing;