import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import Axios from "axios";
import './login.css';

const Login = () => {

    const handleClickLogin = (values: any) => {};
    const handleClickRegister = (values: { email: any; password: any; nome:any; telefone:any;sexo:any;cpf:any;data_n:any;}) => {
        Axios.post("https://localhost:3001/register", {
            email: values.email,
            password: values.password,
            nome: values.nome,
            telefone: values.telefone,
            sexo: values.sexo,
            cpf: values.cpf,
            data_n: values.data_n,
        }).then((Response: any) => {
            console.log(Response)
        });
    };

    const validationLogin = yup.object().shape({
        email: yup.string().email("E-mail invalido").required("Este campo é obrigatório"),
        senha: yup.string().min(8, "Senha invalida").required("Este campo é obrigatório"),
    });

    
    const validationRegister = yup.object().shape({
        email: yup.string().email("E-mail invalido").required("Este campo é obrigatório"),
        senha: yup.string().min(8, "Senha invalida").required("Este campo é obrigatório"),
        confirm: yup.string().oneOf([yup.ref("senha")], "as senhas devem ser iguais").required("Este campo é obrigatório"),
        nome:   yup.string().required("este campo é obrigatório"),
        telefone: yup.string().required("este campo é obrigatório"),
        sexo: yup.string().required("este campo é obrigatório"),
        cpf: yup.string().required("este campo é obrigatório"),
        data_n: yup.date().required("este campo é obrigatório"),
    });

    return(
        <div>
            <h1>Login</h1>
            <Formik 
            onSubmit={handleClickLogin}
            validationSchema={validationLogin}
            initialValues={{}}>
                <Form className="login-form">
                    <div className="formFields">

                        <Field name="email" className="formField" placeholder="Email" />

                        <ErrorMessage 
                        component="span"
                        name="email"
                        className="formError"/>

                        <p><Field name="senha" className="formField" placeholder="Senha" /></p>

                        <ErrorMessage 
                        component="span"
                        name="senha"
                        className="formError"/>
                    </div>
                    <button className="Button" type="submit">Login</button>
                </Form>

            </Formik>


            <h1>Registro</h1>
            <Formik 
                onSubmit={handleClickRegister}
                validationSchema={validationRegister} 
                initialValues={{
                    email: undefined,
                    password: undefined,
                    nome: undefined,
                    telefone: undefined,
                    sexo: undefined,
                    cpf: undefined,
                    data_n: undefined
                }}>
                <Form className="login-form">
                    <div className="formFields">
                    <Field name="nome" className="formField" placeholder="Nome completo" />

                        <ErrorMessage 
                        component="span"
                        name="nome"
                        className="formError"/>

                        <Field name="telefone" className="formField" placeholder="Telefone" />

                        <ErrorMessage 
                        component="span"
                        name="telefone"
                        className="formError"/>

                        <Field name="cpf" className="formField" placeholder="CPF" />

                        <ErrorMessage 
                        component="span"
                        name="cpf"
                        className="formError"/>

                        <Field name="sexo" className="formField" placeholder="Sexo(M/F)" />
    
                        <ErrorMessage 
                        component="span"
                        name="sexo"
                        className="formError"/>

                        <Field name="data_n" className="formField" placeholder="data de nascimento(aaaa-mm-dd)" />

                        <ErrorMessage 
                        component="span"
                        name="data_n"
                        className="formError"/>

                        <Field name="email" className="formField" placeholder="Email" />

                        <ErrorMessage 
                        component="span"
                        name="email"
                        className="formError"/>

                        <p><Field name="senha" className="formField" placeholder="Senha" /></p>

                        <ErrorMessage 
                        component="span"
                        name="senha"
                        className="formError"/>

                        <p><Field name="confirm" className="formField" placeholder="Confirmar Senha" /></p>

                        <ErrorMessage 
                        component="span"
                        name="confirm"
                        className="formError"/>
                    </div>
                    <button className="Button" type="submit">Registrar-se</button>
                </Form>

            </Formik>
        </div>
    )
}

export default Login