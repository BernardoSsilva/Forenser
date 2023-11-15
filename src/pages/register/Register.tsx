import React from "react";
import InputMask from 'react-input-mask';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import { api } from "../../service";
import './register.css';
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const handleClickRegister =(values:any) => {
        try{
            api.post("/registerP", values).then((Response: any) => {
                console.log(Response);
                if(Response){
                    navigate('/cadsucess');
                }
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
        <div className="body-reg">
            <a href="/" className="return-reg">Retornar a tela inicial</a>
                <div className="container-reg">
                
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

                    
                <Form>
                <h1>Registro</h1>

                        <label>
                            <p>
                                Digite seu nome:
                            </p>
                        </label>
                    <Field className="registerFIeld" name="nome" placeholder="Nome completo" />

                        <ErrorMessage 
                        component="span"
                        name="nome"
                        className="formError"/>

                        <label>
                            <p>
                                Digite seu telefone:
                            </p>
                        </label>
                        <Field name="telefone"  className="registerFIeld" 
                        render={({ field }: any) => ( <InputMask
                            {...field}
                            mask="(99) 9 9999-9999"
                            placeholder="telefone"
                        />
                        )}/>

                        <ErrorMessage 
                        component="span"
                        name="telefone"
                        className="formError"/>

                        <label>
                            <p>
                                Digite seu CPF:
                            </p>
                        </label>
                        <Field name="cpf" render={({ field }: any) => (
                                    <InputMask
                                        {...field}
                                        mask="999.999.999-99"
                                        placeholder="CPF"
                                    />
                                )} className="registerFIeld"/>

                        <ErrorMessage 
                        component="span"
                        name="cpf"
                        className="formError"/>

                        <div className="radioGroup">
                            <p>Sexo</p>
                            <label>
                                <Field name="sexo" type="radio" value="M"/>
                                Masculino
                            </label>
                            <label>
                                <Field name="sexo" type="radio" value="F" />
                                Feminino
                            </label>
                        </div>
    
                        <ErrorMessage 
                        component="span"
                        name="sexo"
                        className="formError"/>

                        <label>
                            <p>
                                Digite sua data de nascimento:
                            </p>
                        </label>

                        <Field name="data_n" type="date" className="registerFIeld"/>

                        <ErrorMessage 
                        component="span"
                        name="data_n"
                        className="formError"/>

                        <label>
                            <p>
                                Digite seu e-mail:
                            </p>
                        </label>

                        <Field name="email" placeholder="Email" className="registerFIeld"/>

                        <ErrorMessage 
                        component="span"
                        name="email"
                        className="formError"/>

                        <label>
                            <p>
                                Digite sua senha:
                            </p>
                        </label>

                        <p><Field name="senha" type="password" placeholder="Senha"  className="registerFIeld"/></p>

                        <ErrorMessage 
                        component="span"
                        name="senha"
                        className="formError"/>
                        
                        <label>
                            <p>
                                Confirme sua senha:
                            </p>
                        </label>
                        
                        <p><Field name="confirm" placeholder="Confirmar Senha" className="registerFIeld"/></p>

                        <ErrorMessage 
                        component="span"
                        name="confirm"
                        className="formError"/>
                    <button type="submit">Registrar-se</button> ja possui uma conta? <a href='/login'>Realizar Login</a>
                </Form>
                </Formik>
                </div>

           
            </div>
    );
}

export default Register