import React, { useEffect, useState } from "react";
import OpenAI from "openai";
import axios from "axios";
import "./facesGeneration.css"
import jwtDecode from "jwt-decode";
import { api } from "../../service";


const FacesGenerationIndex = () => {
  const token = localStorage.getItem('jwtToken');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  const [boletim, setBoletim] = useState([]);
  const [selectedBoletim, setSelectedBoletim] = useState(null);
  const [imageUrl, setImageUrl] = useState(); 
  const [formValues, setFormValues] = useState({
    fat: "skiny",
    sex: "male",
    age: "young",
    skinColor: "white",
    faceShape: "square",
    hairHeight: "long",
    beard: "none",
    hairColor: "black",
    eyeShape: "round",
    mouthShape: "large",
    noseShape: "pointy",
    hairType: "coiled",
    eyeColor: "blue", 
    hairStyle: "mullet", 
    ethnicity: "caucasian", 
    chinShape: "pointy", 
    headShape: "square", 
    earShape: "small", 
    beardStyle: "degrade", 
    accessories: "none", 
    facialMarks: "none", 
    beauty: "ugly", 
  });
  

  useEffect(() => {
 
          api.get(`/${userId}`)
            .then((secondResponse) => {
              const boletinsFromSecondApi = secondResponse.data;
              setBoletim(boletinsFromSecondApi);
            })
            .catch((secondError) => {
              console.error('Erro ao obter boletins na segunda chamada:', secondError);
            });
  }, [userId]);

  const handleBoletimSelect = (event) => {
    const selectedBoletimId = event.target.value;
    console.log("selectedBoletimId:", selectedBoletimId);

    const boletimNumber = selectedBoletimId;


    const selectedBoletim = boletim.find((item) => item.id_fato == boletimNumber);
    console.log("selectedBoletim:", selectedBoletim);

    setSelectedBoletim(selectedBoletim);
};

  const handleSelectChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const openai = new OpenAI({
    apiKey: "sua chave api",
    dangerouslyAllowBrowser: true
  });

  const imageGenerate = async () => {
    try {
      const prompt = `a highly realistic portrayal of a ${formValues.beauty} ${formValues.fat} ${formValues.age} ${formValues.skinColor} ${formValues.sex} with ${formValues.hairColor} ${formValues.hairHeight} hair, ${formValues.eyeShape} eyes, ${formValues.faceShape} face, ${formValues.mouthShape} mouth, ${formValues.noseShape} nose, ${formValues.beard} beard, and ${formValues.hairType} hair type. They have ${formValues.eyeColor} eyes, ${formValues.hairStyle} hair style, ${formValues.ethnicity} ethnicity, ${formValues.chinShape} chin shape, ${formValues.headShape} head shape, ${formValues.earShape} ear shape, ${formValues.beardStyle} beard style, ${formValues.accessories} accessories, and ${formValues.facialMarks} facial marks.`;
      const image = await openai.images.generate({ model: "dall-e-3", prompt:`${prompt}` });
      const imageUrl = image.data[0].url;
      setImageUrl(imageUrl);
      localStorage.setItem('generatedImage', imageUrl);
    } catch (error) {
      console.error(error);
    } 
  };

  const handleClickSave = async () => {
    try {
  
      if (!selectedBoletim) {
        console.error('Nenhum boletim selecionado.');
        return;
      }
  
      const description =  `a highly realistic portrayal of a ${formValues.age} ${formValues.skinColor} ${formValues.sex} with ${formValues.hairColor} ${formValues.hairHeight} hair, ${formValues.eyeShape} eyes, ${formValues.faceShape} face, ${formValues.mouthShape} mouth, ${formValues.noseShape} nose, ${formValues.beard} beard, and ${formValues.hairType} hair type.`; 
      const tipoBoletim = selectedBoletim.tipo; 
      const boletimId = selectedBoletim.id_fato;
  
      const data = {
        imageUrl: imageUrl,
        description,
        tipoBoletim,
        boletimId,
      };
  
      console.log(data);
  
      const response = await api.post(`/salvaFace/${userId}`, data);
      if (response.status === 200) {
        localStorage.setItem('generatedImage', imageUrl);
      }
  
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao salvar face:', error);
    }
  };

  return (
    <div className="body-faces">
      <div className="image-container">
        <a href="/sesstrue" className="return">Retornar</a>
        <img className="image-FaceGen" src={imageUrl} alt="Imagem gerada" />

        <p className='caixaTextoFaces'>
          <span>Atenção</span><br></br>
          Nenhuma das imagens aqui geradas são 100% condizentes com a realidade, são apenas imagens aproximadas para que possa ser iniciado o procsso de reconhecimento facial
        </p>
      </div>

     
      
      
      <div className="data-container">
      <p>O que você deseja ver?</p>
      <label htmlFor="sex" className="select-label">Sex:</label>
      <select id="sex" onChange={handleSelectChange} value={formValues.sex} className="select-dropdown">
        <option value="man">Homem</option>
        <option value="woman">Mulher</option>
      </select>

     
<label htmlFor="age" className="select-label">
  Grupo de idade:
</label>
<select id="age" onChange={handleSelectChange} value={formValues.age} className="select-dropdown">
  <option value="young">Jovem adulto</option>
  <option value="middle-aged">Meia idade</option>
  <option value="elderly">Idoso</option>
  <option value="teen">Jovem</option>
  
</select>

<label htmlFor="skinColor" className="select-label">
  Pele:
</label>
<select id="skinColor" onChange={handleSelectChange} value={formValues.skinColor} className="select-dropdown">
  <option value="light">Branca</option>
  <option value="medium">Parda</option>
  <option value="dark">Escura</option>
  <option value="olive">Morena</option>
  <option value="pale">Palida</option>
  
</select>


<label htmlFor="faceShape" className="select-label">
  Formato do rosto:
</label>
<select id="faceShape" onChange={handleSelectChange} value={formValues.faceShape} className="select-dropdown">
  <option value="oval">Oval</option>
  <option value="round">Redonda</option>
  <option value="square">Quadrada</option>
  <option value="heart">Coração</option>
  <option value="diamond">Diamante</option>
  
</select>


<label htmlFor="hairHeight" className="select-label">
  Altura do cabelo:
</label>
<select id="hairHeight" onChange={handleSelectChange} value={formValues.hairHeight} className="select-dropdown">
  <option value="short">Curto</option>
  <option value="medium">Medio</option>
  <option value="long">Longo</option>
  <option value="bald">Careca</option>
  <option value="shaved">Raspado</option>

</select>


<label htmlFor="hairType" className="select-label">
  Tipo de cabelo:
</label>
<select id="hairType" onChange={handleSelectChange} value={formValues.hairType} className="select-dropdown">
  <option value="straight">Liso</option>
  <option value="wavy">Ondulado</option>
  <option value="curly">Encaracolado</option>
  <option value="coiled">Cacheado</option>
  <option value="frizzy">Frisado</option>
 
</select>

<label htmlFor="hairColor" className="select-label">
  Cor do cabelo:
</label>
<select id="hairColor" onChange={handleSelectChange} value={formValues.hairColor} className="select-dropdown">
  <option value="black">Preto</option>
  <option value="brown">Castanho</option>
  <option value="blonde">Loiro</option>
  <option value="red">Ruivo</option>
  <option value="gray">Grisalo</option>

</select>


<label htmlFor="beard" className="select-label">
  Barba:
</label>
<select id="beard" onChange={handleSelectChange} value={formValues.beard} className="select-dropdown">
  <option value="none">Sem barba</option>
  <option value="stubble">Barba por fazer</option>
  <option value="full">Fechada</option>
  <option value="goatee">Cavanhaque</option>
  <option value="moustache">Bigode</option>

</select>

<label htmlFor="eyeShape" className="select-label">
  Formato do olho:
</label>
<select id="eyeShape" onChange={handleSelectChange} value={formValues.eyeShape} className="select-dropdown">
  <option value="round">Redondo</option>
  <option value="almond">Alongado</option>
  <option value="hooded">Fechado</option>
  <option value="upturned">Elevado</option>
  <option value="downturned">Caido</option>

</select>


<label htmlFor="mouthShape" className="select-label">
  Formato da boca:
</label>
<select id="mouthShape" onChange={handleSelectChange} value={formValues.mouthShape} className="select-dropdown">
  <option value="small">Pequena</option>
  <option value="medium">Media</option>
  <option value="wide">Grossa</option>
  <option value="thin">Fina</option>

</select>


<label htmlFor="noseShape" className="select-label">
  Formato do nariz:
</label>
<select id="noseShape" onChange={handleSelectChange} value={formValues.noseShape} className="select-dropdown">
  <option value="pointed">Pontudo</option>
  <option value="flat">Chato</option>
  <option value="wide">Largo</option>
  <option value="snub">Empinado</option>
  <option value="hawk">Alquilino(curvo)</option>
  
</select>


<label htmlFor="eyeColor" className="select-label">
  Cor dos olho:
</label>
<select id="eyeColor" onChange={handleSelectChange} value={formValues.eyeColor} className="select-dropdown">
  <option value="blue">Azul</option>
  <option value="brown">Castanho</option>
  <option value="green">Verde</option>
  <option value="gray">Cinza</option>
  
</select>


<label htmlFor="hairStyle" className="select-label">
  Estilo de cabelo:
</label>
<select id="hairStyle" onChange={handleSelectChange} value={formValues.hairStyle} className="select-dropdown">
  <option value="mullet">Mullet</option>
  <option value="ponytail">Rabo de cavalo</option>
  <option value="bald">Careca</option>
  <option value="afro">Afro</option>
  <option value="spiky">Bagunçado</option>
</select>

<label htmlFor="ethnicity" className="select-label">
  Etinia:
</label>
<select id="ethnicity" onChange={handleSelectChange} value={formValues.ethnicity} className="select-dropdown">
  <option value="caucasian">Caucasiana</option>
  <option value="african">Africana</option>
  <option value="asian">Asiatica</option>
  <option value="hispanic">Hispanica</option>
  <option value="middle-eastern">Oriente medio</option>
</select>


<label htmlFor="chinShape" className="select-label">
  Formato do queixo:
</label>
<select id="chinShape" onChange={handleSelectChange} value={formValues.chinShape} className="select-dropdown">
  <option value="pointed">Pontudo</option>
  <option value="square">Quadrado</option>
  <option value="rounded">Arredondado</option>
  <option value="cleft">Fendido</option>
  <option value="strong">Definido</option>

</select>

<label htmlFor="fat" className="select-label">
  Aspecto:
</label>
<select id="fat" onChange={handleSelectChange} value={formValues.fat} className="select-dropdown">
  <option value="fat">Gordo</option>
  <option value="lean">Magro</option>
  <option value="anorexic">Anorexico</option>
  <option value="obese">Obeso</option>
  <option value="strong">Forte</option>
</select>

<label htmlFor="headShape" className="select-label">
  Formato da cabeça:
</label>
<select id="headShape" onChange={handleSelectChange} value={formValues.headShape} className="select-dropdown">
  <option value="round">Redonda</option>
  <option value="oval">Oval</option>
  <option value="heart">Coração</option>
  <option value="diamond">Diamante</option>
  <option value="square">Quadrada</option>

</select>

<label htmlFor="earShape" className="select-label">
  Formato das orelhas:
</label>
<select id="earShape" onChange={handleSelectChange} value={formValues.earShape} className="select-dropdown">
  <option value="small">Pequenas</option>
  <option value="large">Grandes</option>
  <option value="pointy">Pontudas</option>

</select>

<label htmlFor="beardStyle" className="select-label">
  Estilo da barba:
</label>
<select id="beardStyle" onChange={handleSelectChange} value={formValues.beardStyle} className="select-dropdown">
  <option value="long">Longa</option>
  <option value="degrade">Degrade</option>
  <option value="circle">Circular</option>
  <option value="muttonchops">Costeletas</option>
</select>

<label htmlFor="beaty" className="select-label">
  Beleza:
</label>
<select id="beauty" onChange={handleSelectChange} value={formValues.beauty} className="select-dropdown">
  <option value="ugly">feio(a)</option>
  <option value="beauty">bonito(a)</option>
</select>

<label htmlFor="accessories" className="select-label">
  Assessorios
</label>
<select id="accessories" onChange={handleSelectChange} value={formValues.accessories} className="select-dropdown">
  <option value="none">Nenhum</option>
  <option value="earring">Brinco</option>
  <option value="glasses">Oculos</option>
</select>


<label htmlFor="facialMarks" className="select-label">
  Marcas faciais
</label>
<select id="facialMarks" onChange={handleSelectChange} value={formValues.facialMarks} className="select-dropdown">
<option value="none">Nenhuma</option>
  <option value="scars">Cicatrizes</option>
  <option value="wrinkles">Rugas</option>
</select>



        <label htmlFor='boletimSelect' className="select-label">Selecione um Boletim de Ocorrência:</label>
        <select id='boletimSelect' onChange={handleBoletimSelect} className="select-dropdown">
          <option value={null}>Selecione um boletim</option>
          {boletim.map((item) => (
            <option key={item.id_fato} value={item.id_fato}>
              Boletim #{item.id_fato} - {item.tipo} - {item.relato_fato}
            </option>
          ))}
        </select>

        <button onClick={imageGenerate} className="button-container">Gerar</button>

        <button onClick={handleClickSave} className="button-container">Salvar</button>
      </div>

      
    </div>
  );
};

export default FacesGenerationIndex;
