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
          }) 
        }catch (error) {
            console.log(error);
          }
        }

    const validationViolencia =yup.object().shape({
        violencia: yup.string().required("este campo é obrigatório"),
        obito: yup.string().required("este campo é obrigatório"),
        data_fato: yup.date().required("este campo é obrigatório"),
        horario: yup.string().required("este campo é obrigatório"),
        tipo_local: yup.string().required("este campo é obrigatório"),
        endereco: yup.string().required("este campo é obrigatório"),
        comunicante: yup.string().required("este campo é obrigatório"),
        vitima: yup.string().required("este campo é obrigatório"),
        relato_fato: yup.string().required("este campo é obrigatório"),
    })

    return(
        <div>

            <p><a href="/boletimocc"> retornar </a></p>
             <h1>Violencia domestica</h1>
            <Formik
            onSubmit={handleClickViolencia}
            validationSchema={validationViolencia} 
            initialValues={{
                violencia: undefined,
                obito:undefined,
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

                            <p>a vitima foi levada a obito?</p>
                        <label>
                                <Field name="obito" type="radio" value="S"/>
                                Sim
                            </label>
                            <label>
                                <Field name="obito" type="radio" value="N" />
                                Não
                            </label>
                        <p>Data da ocorrencia</p>
                        <Field name="data_fato" type="date" />
                        <p>Horario da ocorrência</p>
                        <Field name="horario" type="time" />
                        <p>tipo de local</p>
                        <Field as="select" name="tipo_local">
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
                        <Field name="endereco" type="text"/>
                        <h2>Envolvidos</h2>
                        <p>Comunicante</p>
                        <Field name="comunicante" type="text"/>
                        <p>Vitima</p>
                        <Field name="vitima" type="text"/>
                        <p>Relato do fato</p>
                        <Field name="relato_fato" type="text"/>

                        <button type='submit'>Registrar Boletim</button>
                    </Form>
            </Formik>
        </div>
    )
}
export default ViolenciaDIndex