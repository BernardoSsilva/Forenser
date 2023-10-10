import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/register/Register";

const Routes = () => {
    return(
        <BrowserRouter>
            <Route Component = { Home } path="/" exact/>
            <Route Component = { Login } path="/login" />
            <Route Component = { Register } path="/register" />
        </BrowserRouter>
    )
}

export default Routes