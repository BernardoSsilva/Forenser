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
    sex: "",
    age: "",
    skinColor: "",
    faceShape: "",
    hairHeight: "",
    beard: "",
    hairColor: "",
    eyeShape: "",
    mouthShape: "",
    noseShape: "",
    hairType: "",
    eyeColor: "", 
    hairStyle: "", 
    ethnicity: "", 
    chinShape: "", 
    headShape: "", 
    earShape: "", 
    beardStyle: "", 
    accessories: "", 
    facialMarks: "", 
    beauty: "", 
  });
  

  useEffect(() => {
    api.get(`/${userId}`)
      .then((response) => {
        console.log(response.data);
        setBoletim(response.data);
      })
      .catch((error) => {
        console.error('Erro ao obter boletins:', error);
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
    //apiKey: "",
    dangerouslyAllowBrowser: true
  });

  const imageGenerate = async () => {
    try {
      const prompt = `a highly realistic portrayal of a ${beauty} ${formValues.age} ${formValues.skinColor} ${formValues.sex} with ${formValues.hairColor} ${formValues.hairHeight} hair, ${formValues.eyeShape} eyes, ${formValues.faceShape} face, ${formValues.mouthShape} mouth, ${formValues.noseShape} nose, ${formValues.beard} beard, and ${formValues.hairType} hair type. They have ${formValues.eyeColor} eyes, ${formValues.hairStyle} hair style, ${formValues.ethnicity} ethnicity, ${formValues.chinShape} chin shape, ${formValues.headShape} head shape, ${formValues.earShape} ear shape, ${formValues.beardStyle} beard style, ${formValues.accessories} accessories, and ${formValues.facialMarks} facial marks.`;
      const image = await openai.images.generate({ model: "dall-e-3", prompt:`${prompt}` });
      const imageUrl = image.data[0].url;
      setImageUrl(imageUrl);
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
  
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao salvar face:', error);
    }
  };

  return (
    <div className="container">
      <div className="image-container">
        <a href="/sesstrue" className="return">Retornar</a>
        <img className="image-FaceGen" src={imageUrl} alt="Imagem gerada" />
      </div>

      <p className='caixaTextoFaces'>
          <span>Atenção</span><br></br>
          Nenhuma das imagens aqui geradas são 100% condizentes com a realidade, são apenas imagens aproximadas para que possa ser iniciado o procsso de reconhecimento facial
        </p>
      
      
      <div className="data-container">
      <p>O que você deseja ver?</p>
      <label htmlFor="sex" className="select-label">Sex:</label>
      <select id="sex" onChange={handleSelectChange} value={formValues.sex} className="select-dropdown">
        <option value="man">Male</option>
        <option value="woman">Female</option>
      </select>

     
<label htmlFor="age" className="select-label">
  Age Group:
</label>
<select id="age" onChange={handleSelectChange} value={formValues.age} className="select-dropdown">
  <option value="young">Young</option>
  <option value="middle-aged">Middle-Aged</option>
  <option value="elderly">Elderly</option>
  <option value="child">Child</option>
  <option value="teen">Teen</option>
  
</select>

<label htmlFor="skinColor" className="select-label">
  Skin Color:
</label>
<select id="skinColor" onChange={handleSelectChange} value={formValues.skinColor} className="select-dropdown">
  <option value="light">Light</option>
  <option value="medium">Medium</option>
  <option value="dark">Dark</option>
  <option value="olive">Olive</option>
  <option value="pale">Pale</option>
  
</select>


<label htmlFor="faceShape" className="select-label">
  Face Shape:
</label>
<select id="faceShape" onChange={handleSelectChange} value={formValues.faceShape} className="select-dropdown">
  <option value="oval">Oval</option>
  <option value="round">Round</option>
  <option value="square">Square</option>
  <option value="heart">Heart</option>
  <option value="diamond">Diamond</option>
  
</select>


<label htmlFor="hairHeight" className="select-label">
  Hair Height:
</label>
<select id="hairHeight" onChange={handleSelectChange} value={formValues.hairHeight} className="select-dropdown">
  <option value="short">Short</option>
  <option value="medium">Medium</option>
  <option value="long">Long</option>
  <option value="bald">Bald</option>
  <option value="shaved">Shaved</option>

</select>


<label htmlFor="hairType" className="select-label">
  Hair Type:
</label>
<select id="hairType" onChange={handleSelectChange} value={formValues.hairType} className="select-dropdown">
  <option value="straight">Straight</option>
  <option value="wavy">Wavy</option>
  <option value="curly">Curly</option>
  <option value="coiled">Coiled</option>
  <option value="frizzy">Frizzy</option>
 
</select>

<label htmlFor="hairColor" className="select-label">
  Hair Color:
</label>
<select id="hairColor" onChange={handleSelectChange} value={formValues.hairColor} className="select-dropdown">
  <option value="black">Black</option>
  <option value="brown">Brown</option>
  <option value="blonde">Blonde</option>
  <option value="red">Red</option>
  <option value="gray">Gray</option>

</select>


<label htmlFor="beard" className="select-label">
  Beard:
</label>
<select id="beard" onChange={handleSelectChange} value={formValues.beard} className="select-dropdown">
  <option value="none">None</option>
  <option value="stubble">Stubble</option>
  <option value="full">Full</option>
  <option value="goatee">Goatee</option>
  <option value="moustache">Moustache</option>

</select>

<label htmlFor="eyeShape" className="select-label">
  Eye Shape:
</label>
<select id="eyeShape" onChange={handleSelectChange} value={formValues.eyeShape} className="select-dropdown">
  <option value="round">Round</option>
  <option value="almond">Almond</option>
  <option value="hooded">Hooded</option>
  <option value="upturned">Upturned</option>
  <option value="downturned">Downturned</option>

</select>


<label htmlFor="mouthShape" className="select-label">
  Mouth Shape:
</label>
<select id="mouthShape" onChange={handleSelectChange} value={formValues.mouthShape} className="select-dropdown">
  <option value="small">Small</option>
  <option value="medium">Medium</option>
  <option value="large">Large</option>
  <option value="wide">Wide</option>
  <option value="thin">Thin</option>

</select>


<label htmlFor="noseShape" className="select-label">
  Nose Shape:
</label>
<select id="noseShape" onChange={handleSelectChange} value={formValues.noseShape} className="select-dropdown">
  <option value="pointed">Pointed</option>
  <option value="flat">Flat</option>
  <option value="wide">Wide</option>
  <option value="snub">Snub</option>
  <option value="hawk">Hawk</option>
  
</select>


<label htmlFor="eyeColor" className="select-label">
  Eye Color:
</label>
<select id="eyeColor" onChange={handleSelectChange} value={formValues.eyeColor} className="select-dropdown">
  <option value="blue">Blue</option>
  <option value="brown">Brown</option>
  <option value="green">Green</option>
  <option value="hazel">Hazel</option>
  <option value="gray">Gray</option>
  
</select>


<label htmlFor="hairStyle" className="select-label">
  Hair Style:
</label>
<select id="hairStyle" onChange={handleSelectChange} value={formValues.hairStyle} className="select-dropdown">
  <option value="mullet">Mullet</option>
  <option value="ponytail">Ponytail</option>
  <option value="bald">Bald</option>
  <option value="afro">Afro</option>
  <option value="spiky">Spiky</option>
</select>

<label htmlFor="ethnicity" className="select-label">
  Ethnicity:
</label>
<select id="ethnicity" onChange={handleSelectChange} value={formValues.ethnicity} className="select-dropdown">
  <option value="caucasian">Caucasian</option>
  <option value="african">African</option>
  <option value="asian">Asian</option>
  <option value="hispanic">Hispanic</option>
  <option value="middle-eastern">Middle Eastern</option>
</select>


<label htmlFor="chinShape" className="select-label">
  Chin Shape:
</label>
<select id="chinShape" onChange={handleSelectChange} value={formValues.chinShape} className="select-dropdown">
  <option value="pointed">Pointed</option>
  <option value="square">Square</option>
  <option value="rounded">Rounded</option>
  <option value="cleft">Cleft</option>
  <option value="strong">Strong</option>

</select>

<label htmlFor="headShape" className="select-label">
  Head Shape:
</label>
<select id="headShape" onChange={handleSelectChange} value={formValues.headShape} className="select-dropdown">
  <option value="round">Round</option>
  <option value="oval">Oval</option>
  <option value="heart">Heart</option>
  <option value="diamond">Diamond</option>
  <option value="square">Square</option>

</select>

<label htmlFor="earShape" className="select-label">
  Ear Shape:
</label>
<select id="earShape" onChange={handleSelectChange} value={formValues.earShape} className="select-dropdown">
  <option value="small">Small</option>
  <option value="large">Large</option>
  <option value="attached">Attached</option>
  <option value="pointy">Pointy</option>
  <option value="lobed">Lobed</option>

</select>

<label htmlFor="beardStyle" className="select-label">
  Beard Style:
</label>
<select id="beardStyle" onChange={handleSelectChange} value={formValues.beardStyle} className="select-dropdown">
  <option value="long">Long</option>
  <option value="degrade">Degrade</option>
  <option value="circle">Circle</option>
  <option value="goatee">Goatee</option>
  <option value="muttonchops">Mutton Chops</option>
</select>

<label htmlFor="beaty" className="select-label">
  Beleza
</label>
<select id="beauty" onChange={handleSelectChange} value={formValues.beauty} className="select-dropdown">
  <option value="ugly">feio(a)</option>
  <option value="beauty">bonito(a)</option>
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
