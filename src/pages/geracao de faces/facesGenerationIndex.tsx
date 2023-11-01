import React, { useEffect, useRef, useState } from "react";

import { api } from "../../service";


const FacesGenerationIndex = () => {
    const [imageUrl, setImageUrl] = useState("");
    const inputRef = useRef(null)

    const imageGenerate = async () => {
        if(inputRef.current.value === ""){
            return 0
        }
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:
                    "Bearer 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",
                    "User-Agent": "Chrome",
                },
                body:JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    n:1,
                    size:"512x512",
                }),

            }
        )
        const data = await response.json()
        console.log(data)
        const data_array = data.data
        setImageUrl(data_array[0].url)
    }

    
    return (
        <div>
            < p>O que você deseja ver?</p>
            <input type="text" ref={inputRef}/>
            <button onClick={() => {imageGenerate()}}> Gerar </button>
        </div>
    );
};

export default FacesGenerationIndex;