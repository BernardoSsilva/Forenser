import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/register/Register";
import LogedHomePage from "../pages/LogedHomePage/LogedHomePage";
import CadSucess from "../pages/cadSucess/CadSucess";
import BoletimIndex from "../pages/boletim de ocorrencia/boletimindex";


const RoutesDoc = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={ <Home />} path="/"/>
                <Route element={ <Login /> } path="/login" />
                <Route element = { <Register /> } path="/register" />
                <Route element={<LogedHomePage />} path="/sesstrue"/>
                <Route element={<CadSucess />} path="/cadsucess" />
                <Route element={<BoletimIndex />} path="/boletimocc" />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesDoc