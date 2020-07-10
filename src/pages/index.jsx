import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from '../components/Home';
import SingleEpisode from '../components/SingleEpisode';

export default function Index(){
    return(
        <Switch>
            <Route path="/" exact={true}>
                <Home/>
            </Route>
            <Route path="/:id" exact={true}>
                <SingleEpisode />
            </Route>
            <Route component={() => <h1> 404 Not Found </h1>} />
        </Switch>
    )
}