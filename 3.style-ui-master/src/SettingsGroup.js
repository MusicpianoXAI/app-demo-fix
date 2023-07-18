import React, { useContext} from "react";
import { Context } from "./App";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import "./Settings.css"

const SettingsGroup = ({category}) => {

    const { myValues, visible, changeVisibility, changeVisibilityForSeveral } = useContext(Context);
    const objects = Object.values(myValues).filter(obj => obj.cat === category)
    const ids = objects.map(obj=>obj['Unnamed: 0'])
    const groupVisible = visible.filter((val, i)=> ids.includes(i))

    const allTrue = groupVisible.every(v=>v)
    const someTrueNotAll = groupVisible.some(v=>v) && groupVisible.some(v=>!v)

    const toggleGroup = () => {
        if (allTrue || someTrueNotAll){
            changeVisibilityForSeveral(ids, false)
        } else {
            changeVisibilityForSeveral(ids, true)
    }}

    return (
        <div className={`SettingsGroup ${category}`}>
            <FormControlLabel className='category' control={<Checkbox 
            checked={allTrue} 
            indeterminate={someTrueNotAll}
            onChange={toggleGroup}
            />} label={category}/>
            {
            objects.map((obj,index)=>{
                return <FormControlLabel className='dimension' key={index} control={<Checkbox checked={groupVisible[index]} />} label={`${obj.opt1} - ${obj.opt2}`} onChange={(e,c)=>changeVisibility(ids[index], c)}/>
            })}
        </div>
    )
}

export default SettingsGroup;
