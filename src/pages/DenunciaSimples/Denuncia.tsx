import { Field, Form, Formik } from "formik";
import * as yup from 'yup';
import { api } from "../../service";



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

    // const denunciaValidation = yup.object().shape({
    //     nome: yup.string().required("Este campo é obrigatorio"),
    //     local: yup.string().required("Este campo é obrigatorio"),
    //     Denuncia: yup.string().required("Este campo é obrigatorio")
    // });


    return(
        <div>
            <a href="/sesstrue">Retornar ao inicio</a>
            <Formik
                onSubmit={handleClickDenuncia} 
                //validationSchema={denunciaValidation}
                initialValues={{
                    nome:undefined,
                    local: undefined,
                    descricao: undefined,
                }}>
                <Form>
                    <label>
                        <p>Digite seu nome</p>
                    </label>
                    <Field type="text" name="nome" placeholder="nome"/>

                    <label>
                        <p>Informe a localidade do ocorrido</p>
                    </label>
                    <Field type="text" name="local" placeholder="Rua ..., Numero..., Ponto de referencia"/>

                    <label>
                        <p>Faça uma descrição detalhada da denuncia</p>
                    </label>
                    <Field type="text" name="descricao" placeholder="Ocorrido, material de denuncia"/>
                    <button type="submit">Registrar denuncia</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Denuncia