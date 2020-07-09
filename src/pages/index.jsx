import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from '../components/Home';

export default function Index(){
    return(
        <Switch>
            <Route path="/">
                <Home/>
            </Route>
            <Route component={() => <h1> 404 Not Found </h1>} />
        </Switch>
    )
}