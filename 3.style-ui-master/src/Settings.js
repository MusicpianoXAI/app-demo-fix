import React, { useContext } from "react";
import { Context } from "./App";
import  SettingsGroup from "./SettingsGroup";
import "./Settings.css"

const Settings = () =>{

    const { categories } = useContext(Context);

    const cols = [categories.slice(0,4), categories.slice(4,6), categories.slice(6)]

    return (
        <div className='Settings'>
            {cols.map((col, index)=>
            <div className='Settings__col' key={index}>
                {col.map((cat, index2)=><SettingsGroup key={index2} category={cat}/>)}                     
            </div>
            )}
        </div>
    )
}

export default Settings;