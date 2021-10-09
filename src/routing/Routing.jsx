import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from "../home/Home";
import Login from "../forms/Login";


const Routing = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path={"/"}   component={Home}/>
                    <Route path={"/login"}    component={Login}/>
                    <Route />
                    <Route />

                </Switch>
            </Router>
            
        </>
    );
};

export default Routing;