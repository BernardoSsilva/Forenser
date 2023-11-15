import React, { useEffect, useState } from 'react';
import './acidenteIndex.css';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { api } from '../../service';
import * as yup from 'yup';
import jwtDecode from 'jwt-decode';





const AcidenteIndex = () => {

    const token = localStorage.getItem("jwtToken")
    const [id, setId] = useState();

    useEffect(() =>{
        setId(jwtDecode(token).id)
    },[])

    const handleClickBoletim = (values: any) => {
        try {
          api.post(`/registrarAcidente/${id}`, values).then((response :any) => {
            console.log(response);
            alert("boletim cadastrado com sucesso")
            navigate('/sesstrue');
          }) 
        }catch (error) {
            console.log(error);
          }
        }

    const validateValues =yup.object().shape({
        data_fato: yup.date().required("este campo é obrigatório"),
        horario: yup.string().required("este campo é obrigatório"),
        tipo_local: yup.string().required("este campo é obrigatório"),
        endereco: yup.string().required("este campo é obrigatório"),
        comunicante: yup.string().required("este campo é obrigatório"),
        motorista: yup.string().required("este campo é obrigatório"),
        veiculos: yup.string().required("este campo é obrigatório"),
        relato_fato: yup.string().required("este campo é obrigatório"),
    })

    return(
        <div className='body-bol'>
            <p><a href="/boletimocc" className='linkBol'> Retornar </a></p>
            <div className="container-bol">
            <h1>Acidente de Trânsito sem Vítima</h1>
            <Formik
                onSubmit={handleClickBoletim}
                validationSchema={validateValues}
                initialValues={{
                    data_fato: undefined,
                    horario: undefined,
                    tipo_local: undefined,
                    endereco: undefined,
                    comunicante: undefined,
                    motoriasta: undefined,
                    veiculos: undefined,
                    relato_fato: undefined
                }}>
                    <Form>
                        <p>Data da ocorrência: <Field name="data_fato" className="bol-field" type="date" /></p>
                        
                        <p>Horario da ocorrência: <Field name="horario" className="bol-field" type="time" /></p>
                        
                        <p>tipo de local: <Field as="select" name="tipo_local" className="bol-field">
                            <option>
                                Outros
                            </option>
                            <option>
                                Via Férrea
                            </option>
                            <option>
                                Via Pública
                            </option>
                        </Field></p>
                        
                        <p>Endereço: <Field name="endereco" type="text" className="bol-field"/></p>
                        
                        <h2>Envolvidos</h2>
                        <p>Comunicante: <Field name="comunicante" type="text" className="bol-field"/></p>
                        
                        <p>Motorista: <Field name="motorista" type="text" className="bol-field" /></p>
                        
                        <p>Veículos envolvidos</p>
                        <Field className="textArea" name="veiculos" as="textarea" placeholder="informar: placa, modelo e ano dos veículos"/>
                        <p>Relato do fato</p>
                        <Field className="textArea" name="relato_fato" as="textarea"/>

                        <p><button type='submit'>Registrar Boletim</button></p>
                    </Form>
            </Formik>
            </div>
        </div>
    )
}

export default AcidenteIndex