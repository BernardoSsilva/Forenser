import React from 'react';
import './acidenteIndex.css';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import { api } from '../../service';
import * as yup from 'yup';





const AcidenteIndex = () => {

    const handleClickBoletim = (values: any) => {
        try {
          api.post("/registrarAcidente", values).then((response :any) => {
            console.log(response);
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
        <div>
            <p><a href="/boletimocc"> retornar </a></p>
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
                        <p>Data da ocorrência</p>
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
                        <p>Motorista</p>
                        <Field name="motorista" type="text"/>
                        <p>Veículos envolvidos</p>
                        <Field name="veiculos" type="text" placeholder="informar: placa, modelo e ano dos veículos"/>
                        <p>Relato do fato</p>
                        <Field name="relato_fato" type="text"/>

                        <button type='submit'>Registrar Boletim</button>
                    </Form>
            </Formik>
        </div>
    )
}

export default AcidenteIndex