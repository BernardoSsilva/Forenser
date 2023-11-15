import { Field, Form, Formik } from "formik";
import * as yup from 'yup';
import { api } from "../../service";
import "./Denuncia.css";



const Denuncia = () => {

    const handleClickDenuncia = (values:any) =>{
        console.log(values)
        try{
            api.post('/cadastrarDenuncia', values).then((response:any)=>{
                
                console.log(response)
                alert("Denuncia registrada com sucesso")
            })
        }catch(error){
            console.log(error)
        }
    }


    return(
        <div className="body">

            <a  className="den-Link" href="/sesstrue">Retornar ao inicio</a>
            <div className="container-den">
            <Formik
                onSubmit={handleClickDenuncia} 
                initialValues={{
                    nome:undefined,
                    local: undefined,
                    descricao: undefined,
                }}>
                <Form>
                    <label>
                        <p>Digite seu nome</p>
                    </label>
                    <Field className="den-text" type="textarea" name="nome" placeholder="nome"/>

                    <label>
                        <p>Informe a localidade do ocorrido</p>
                    </label>
                    <Field className="den-text" type="text" name="local" placeholder="Rua ..., Numero..., Ponto de referencia"/>

                    <label>
                        <p>Faça uma descrição detalhada da denuncia</p>
                    </label>
                    <Field className="den-bField" as="textarea" name="descricao" placeholder="Ocorrido, material de denuncia"/>
                    <p><button type="submit">Registrar denuncia</button></p>
                </Form>
            </Formik>

            </div>
            
        </div>
    )
}

export default Denuncia