
import React from "react";
import App from "./App";
import {Provider} from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import configure from "./store/configure";
import {
    Index,
    Login,
    Edit,
    NotFound
} from "./page/index.async.js";
const store = configure();

const Blog = () => {
    return(
        <Provider store = {store}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Index}/>
                    <Route exact path="/board/:name" component={Index}/>
                    <Route exact path="/board/:name/:num" component={Index}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/edit/:token" component={Edit}/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </Provider>
        
    );
};

export default Blog;