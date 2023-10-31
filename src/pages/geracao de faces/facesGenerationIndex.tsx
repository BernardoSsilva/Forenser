import React, { useState } from "react";

// import { OpenAI } from "openai";

// const openai = new OpenAI({
//     apiKey:  
//     dangerouslyAllowBrowser: true 
// });


const FacesGenerationIndex: React.FC = () => {

    // const logo =
    // const [userPrompt, setUserPrompt] = useState("");
    // const [imageUrl, setImageUrl] = useState("");


    // const generateImage = async () => {
    //     const prompt = userPrompt;
    //     const maxTokens = 100; 
    //     const engine = "text-davinci-003";

    //     try {
    //         const response = await openai.completions.create({
    //             model: engine,
    //             prompt: prompt,
    //             max_tokens: maxTokens,
    //         });

    //         const generatedText = response.choices[0].text.trim();
    //         setImageUrl(generatedText);
    //     } catch (error) {
    //         console.error("Erro ao chamar API OpenAI:", error);
    //     }
    //     await new Promise(resolve => setTimeout(resolve, 5000));
    // };

    return (
        <div>
            {imageUrl ? (
                <img src={imageUrl} className="image" alt="ai thing" />
            ) : (
                <img src={logo} className="image" alt="logo" />
            )}

            <p>O que você deseja ver?</p>
            <input
                placeholder="A sunset on the Sydney Opera House"
                onChange={(e) => setUserPrompt(e.target.value)}
            />
            <button onClick={generateImage}>Generate</button>
        </div>
    );
};

export default FacesGenerationIndex;
