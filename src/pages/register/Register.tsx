import React from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import { api } from "../../service";
import './register.css';

const Register = () => {
    const handleClickRegister =(values:any) => {
        try{
            api.post("/registerP", values).then((Response: any) => {
                console.log(Response)
            });
        } catch(error){
            console.log(error)
        }     
    };

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
        <div >
                <div className="container">
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
                <Form className="register-form">
                <h1>Registro</h1>

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

                        <div className="radioGroup">
                            <p>Sexo</p>
                            <label>
                                <Field name="sexo" type="radio" className="formField" value="M"/>
                                Masculino
                            </label>
                            <label>
                                <Field name="sexo" type="radio" className="formField" value="F" />
                                Feminino
                            </label>
                        </div>
    
                        <ErrorMessage 
                        component="span"
                        name="sexo"
                        className="formError"/>

                        <Field name="data_n" type="date" className="formField" />

                        <ErrorMessage 
                        component="span"
                        name="data_n"
                        className="formError"/>

                        <Field name="email" className="formField" placeholder="Email" />

                        <ErrorMessage 
                        component="span"
                        name="email"
                        className="formError"/>

                        <p><Field name="senha" type="password" className="formField" placeholder="Senha" /></p>

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
                    <button className="Button" type="submit">Registrar-se</button> ja possui uma conta? <a href='/login'>Realizar Login</a>
                </Form>
                </Formik>
                </div>

           
            </div>
    );
}

export default Register