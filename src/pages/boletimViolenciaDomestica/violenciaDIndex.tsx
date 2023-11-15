import React, { useEffect, useState } from 'react';
import './violenciaDIndex.css';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { api } from '../../service';
import * as yup from 'yup';
import jwtDecode from 'jwt-decode';





const ViolenciaDIndex = () => {

    const token = localStorage.getItem("jwtToken")
    const [id, setId] = useState();

    useEffect(() =>{
        setId(jwtDecode(token).id)
    },[])


    const handleClickViolencia= (values: any) => {
        try {
          api.post(`/registrarViolenciaD/${id}`, values).then((response :any) => {
            console.log(response);
            alert("boletim cadastrado com sucesso")
            navigate('/sesstrue');
          }) 
        }catch (error) {
            console.log(error);
          }
        }

    const validationViolencia =yup.object().shape({
        violencia: yup.string().required("este campo é obrigatório"),
        data_fato: yup.date().required("este campo é obrigatório"),
        horario: yup.string().required("este campo é obrigatório"),
        tipo_local: yup.string().required("este campo é obrigatório"),
        endereco: yup.string().required("este campo é obrigatório"),
        comunicante: yup.string().required("este campo é obrigatório"),
        vitima: yup.string().required("este campo é obrigatório"),
        relato_fato: yup.string().required("este campo é obrigatório"),
    })

    return(
        <div className='body-bol'>

            <p><a href="/boletimocc" className='linkBol'> retornar </a></p>
             <div className="container-bol">
             <h1>Violencia domestica</h1>
            <Formik
            onSubmit={handleClickViolencia}
            validationSchema={validationViolencia} 
            initialValues={{
                violencia: undefined,
                data_fato: undefined,
                horario: undefined,
                tipo_local: undefined,
                endereco: undefined,
                comunicante: undefined,
                vitima: undefined,
                relato_fato: undefined
            }}>
                    <Form>
                        <p>Houve uso de violencia durante a ocorrencia?</p>
                        
                        <label>
                                <Field name="violencia" type="radio" value="S"/>
                                Sim
                            </label>
                            <label>
                                <Field name="violencia" type="radio" value="N" />
                                Não
                            </label>

                        <p>Data da ocorrencia</p>
                        <Field name="data_fato" type="date" className="bol-field"/>
                        <p>Horario da ocorrência</p>
                        <Field name="horario" type="time" className="bol-field"/>
                        <p>tipo de local</p>
                        <Field as="select" name="tipo_local" className="bol-field">
                            <option>
                                Outros
                            </option>
                            <option>
                                Via Férrea
                            </option>
                            <option>
                                Via Pública
                            </option>
                        </Field>
                        <p>Endereço</p>
                        <Field name="endereco" type="text" className="bol-field"/>
                        <h2>Envolvidos</h2>
                        <p>Comunicante</p>
                        <Field name="comunicante" type="text" className="bol-field"/>
                        <p>Vitima</p>
                        <Field name="vitima" type="text" className="bol-field"/>
                        <p>Relato do fato</p>
                        <Field name="relato_fato" as="textarea" className="textArea"/>

                        <button type='submit'>Registrar Boletim</button>
                    </Form>
            </Formik>
             </div>
        </div>
    )
}
export default ViolenciaDIndex