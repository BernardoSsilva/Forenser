import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/register/Register";

const RoutesDoc = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={ <Home /> } path="/"/>
                <Route element={ <Login /> } path="/login" />
                <Route element = { <Register /> } path="/register" />
            </Routes>

        </BrowserRouter>
    )
}

export default RoutesDoc