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
        <div className="editporfile-body">
            <div className="editporfile-container">
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
                    
                    <p><span className='spnedit'>Email</span> <Field className="editfield" name="emailField" type="email" placeholder={email}/></p>
                    

                    <p> <span className='spnedit'>Telefone</span> <Field className="editfield" name="telefoneField" placeholder={telefone}/></p>
                    
                    <button type="submit" className='editporfile-button'>Salvar</button>
                    <a className="editLink" href="/porfile">Cancelar</a>
                </Form>
            </Formik>
            </div>
            
        </div>
    );
};

export default EditPorfile;
