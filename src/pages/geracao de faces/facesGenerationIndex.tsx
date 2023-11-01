import React, { useEffect, useState } from "react";
import { OpenAI } from "openai";
import { api } from "../../service";

// const openai = new OpenAI({
//     apiKey: "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",
//     dangerouslyAllowBrowser: true 
// });

const FacesGenerationIndex: React.FC = () => {
    // const [imageUrl, setImageUrl] = useState("");

    // const generateImage = async () => {
    //     try {
    //         const response = await openai.images.generate({
    //             prompt: "A cute baby sea otter",
    //             n: 1,
    //             size: "1024x1024"
    //         });
    //         setImageUrl(response.data[0].url);
    //     } catch (error) {
    //         console.error("Erro ao gerar imagem:", error);
    //     }
    // };

    // useEffect(() => {
    //     generateImage();
    // }, []);

    const handleClickGenerate = (values: any) => {
        try {
          api.post("/generate", values).then((response) => {
            console.log(response);
            alert("Gerado")
          })
        }catch (error) {
            console.log(error);
          }
        }


    return (
        <div>
            {/* {imageUrl ? (
                <img src={imageUrl} className="image" alt="ai thing" />
            ) : (
                <p>Carregando...</p>
            )} */}

            <p>O que você deseja ver?</p>
            <button onClick={handleClickGenerate}> Gerar </button>
        </div>
    );
};

export default FacesGenerationIndex;