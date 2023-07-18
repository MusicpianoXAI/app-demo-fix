import "./StyleInfo.css"
import { Slider } from '@mui/material'
import React, { useContext } from "react"
import { Context } from "./App";

const StyleInfo = props => {

    const { changeIdealValue } = useContext(Context);

    return (
        <div className='StyleInfo'>
            <div className='StyleInfo__text'>
                {props.my.opt1} - {props.my.opt2}
            </div>
            <div className='ideal-slider'>
                <Slider min={-1} max={1} value={props.ideal.value} step={0.01} onChange={(e,v)=>changeIdealValue(props.my.opt1, v)}/>
            </div>
            <div className='my-slider'>
                <Slider min={-1} max={1} value={props.my.value} disabled />
            </div>
        </div>
    )
}

export default StyleInfo;