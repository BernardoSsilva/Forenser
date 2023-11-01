import React, { useEffect, useState } from 'react';
import './rouboIndex.css';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { api } from '../../service';
import * as yup from 'yup';
import jwtDecode from 'jwt-decode';





const RouboIndex = () => {

    const token = localStorage.getItem("jwtToken")
    const [id, setId] = useState();

    useEffect(() =>{
        setId(jwtDecode(token).id)
    },[])

    const handleClickRoubo = (values: any) => {
        try {
          api.post(`/registrarRoubo/${id}`, values).then((response :any) => {
            console.log(response);
            alert("boletim cadastrado com sucesso")
          }) 
        }catch (error) {
            console.log(error);
          }
        }

    const validationRoubo =yup.object().shape({
        violencia: yup.string().required("este campo é obrigatório"),
        subtracao: yup.string().required("este campo é obrigatório"),
        data_fato: yup.date().required("este campo é obrigatório"),
        horario: yup.string().required("este campo é obrigatório"),
        tipo_local: yup.string().required("este campo é obrigatório"),
        endereco: yup.string().required("este campo é obrigatório"),
        comunicante: yup.string().required("este campo é obrigatório"),
        vitima: yup.string().required("este campo é obrigatório"),
        objetos: yup.string().required("este campo é obrigatório"),
        relato_fato: yup.string().required("este campo é obrigatório"),
    })

    return(
        <div>
            <p><a href="/boletimocc"> retornar </a></p>
             <h1>Roubo ou furto</h1>
            <Formik
            onSubmit={handleClickRoubo}
            validationSchema={validationRoubo} 
            initialValues={{
                violencia: undefined,
                subtracao:undefined,
                data_fato: undefined,
                horario: undefined,
                tipo_local: undefined,
                endereco: undefined,
                comunicante: undefined,
                vitima: undefined,
                objetos: undefined,
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

                            <p>O bem chegou a ser subtraido?</p>
                        <label>
                                <Field name="subtracao" type="radio" value="S"/>
                                Sim
                            </label>
                            <label>
                                <Field name="subtracao" type="radio" value="N" />
                                Não(apenas uma ameaça)
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
                        <p>Objetos roubados</p>
                        <Field name="objetos" type="text"/>
                        <p>Relato do fato</p>
                        <Field name="relato_fato" type="text"/>

                        <button type='submit'>Registrar Boletim</button>
                    </Form>
            </Formik>
        </div>
    )
}
export default RouboIndex