import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from "../navbar/Header";
import Login from "../forms/Login";
import Register from "../forms/Register";
import VerifyAccount from "../forms/VerifyAccount";
import Profile from "../profile/Profile";
import Header from "../navbar/Header";


const Routing = () => {
    return (
        <>

            <Router>
                <Header />
                <Switch>
                    <Route path={"/login"}    component={Login}/>
                    <Route path={"/register"}    component={Register}/>
                    <Route path={"/verify-account"}    component={VerifyAccount}/>
                    <Route path={"/profile"}    component={Profile}/>



                    <Route />
                    <Route />

                </Switch>
            </Router>
            
        </>
    );
};

export default Routing;