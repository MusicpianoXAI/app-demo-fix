import StyleInfo from "./StyleInfo";
import "./StyleGroup.css"
import React, { useContext } from "react";
import { Context } from "./App";

const StyleGroup = ({category}) => {

    const { idealValues, myValues, visible } = useContext(Context)

    const ids = Object.keys(idealValues).filter((key, index) => idealValues[key].cat === category && visible[index])

    if (ids.length === 0){
        return null
    }
                

    return (
        <div className="StyleGroup">
            <div className="StyleGroup__title">
                {category.toUpperCase()}
            </div>
            {
            ids.map((key, index)=>{ 
              return <StyleInfo key={index} my={myValues[key]} ideal={idealValues[key]}/>
            })
            }
        </div>
    )
}

export default StyleGroup