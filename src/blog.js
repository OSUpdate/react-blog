
import React from "react";
import App from "./App";
import {Provider} from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configure from "./store/configure";
const store = configure();

const Blog = () => {
    return(
        <Provider store = {store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
        
    );
};

export default Blog;
