import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

const Routes = () => {
    return(
        <div>
                <Route path="/" Component={Home}></Route>
                <Route path="/login" Component={Login}></Route>
        </div>
    )
}

export default Routes