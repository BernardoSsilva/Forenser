import { useEffect, useState } from 'react';
import * as yup from 'yup';
import './editPorfile.css';
import jwtDecode from 'jwt-decode';
import { Field, Form, Formik } from 'formik';
import { api } from '../../service';

const EditPorfile = () => {
    const token = localStorage.getItem("jwtToken");

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        setNome(jwtDecode(token).nome);
        setEmail(jwtDecode(token).email);
        setTelefone(jwtDecode(token).telefone);
        setId(jwtDecode(token).id);
    }, [token]);

    const editHandleClick = (values:any) => {
        console.log(id);
        try {
            api.put(`/editValues/${id}`, values).then((response) => {
                console.log(response);
                if (response) {
                    alert("dados alterados com sucesso");
                } else {
                    alert("houve um problema, tente novamente mais tarde");
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const validateFields = yup.object().shape({
        emailField: yup.string().email("E-mail inválido").required("Este campo é obrigatório"),
        telefoneField: yup.string().required("Este campo é obrigatório"),
    });

    return (
        <div>
            <h1>{nome}</h1>
            <Formik
                initialValues={{
                    telefoneField: telefone,
                    emailField: email
                }}
                validationSchema={validateFields}
                onSubmit={editHandleClick}
            >
                <Form>
                    
                    <p>Email</p>
                    <Field name="emailField" type="email" placeholder={email}/>

                    <p>Telefone</p>
                    <Field name="telefoneField" placeholder={telefone}/>
                    <button type="submit">Salvar</button>
                    <a href="/porfile">Cancelar</a>
                </Form>
            </Formik>
        </div>
    );
};

export default EditPorfile;
