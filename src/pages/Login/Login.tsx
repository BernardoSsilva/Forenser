import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import { api } from "../../service";
import './login.css';

const Login = () => {

    const handleClickLogin = (values: any) => {
        try{
            api.post("/loginP", values).then((Response: any) =>{
                console.log(Response)
            })
        } catch(error){
            console.log(error)
        }
        
    };
    

    const validationLogin = yup.object().shape({
        email: yup.string().email("E-mail invalido").required("Este campo é obrigatório"),
        senha: yup.string().min(8, "Senha invalida").required("Este campo é obrigatório"),
    });

    
    
    return(
        <div className="container">
            
            <Formik 
            onSubmit={handleClickLogin}
            validationSchema={validationLogin}
            initialValues={{}}>
                <Form className="login-form">
                <h1>Login</h1>
                    <div className="formFields">

                        <Field name="email" type="email" className="formField" placeholder="Email" />

                        <ErrorMessage 
                        component="span"
                        name="email"
                        className="formError"/>

                        <p><Field name="senha"  type="password" className="formField" placeholder="Senha" /></p>

                        <ErrorMessage 
                        component="span"
                        name="senha"
                        className="formError"/>
                    </div>
                    <button className="Button" type="submit">Login</button> Ainda não possui uma conta? <a href='/register'>Registre-se</a>
                </Form>
            </Formik>
        </div>
    )
}

export default Login