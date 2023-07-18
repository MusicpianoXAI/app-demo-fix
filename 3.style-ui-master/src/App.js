import './App.css';
import React, { useEffect, useRef, useState } from "react";
import StyleGroup from "./StyleGroup";
import Spider from "./Spider";
import SettingsIcon from '@mui/icons-material/Settings';
import UpdateIcon from '@mui/icons-material/Update';
import UploadIcon from '@mui/icons-material/Upload';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from "./Settings";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./Theme";
import { useWindowSize } from "./functions";

export const Context = React.createContext(null)

function App() {

  const [myValues, setMyValues] = useState(null)
  const [idealValues, setIdealValues] = useState(null)
  const [fetchedIdealValues, setFetchedIdealValues] = useState(null)
  const [categories, setCategories] = useState(null)
  const [visible, setVisible] = useState(null)
  const [openMenu, setOpenMenu] = useState(false)
  const { height, width } = useWindowSize()

  const changeIdealValue = (opt1, value) => {
    let newValues = JSON.parse(JSON.stringify(idealValues))
    const id = Object.keys(newValues).filter((key, index)=>newValues[key].opt1 === opt1)[0]
    let newValue = newValues[id]
    newValue.value = value
    setIdealValues(newValues)

  }

  const changeVisibility = (id, value)=> {
    let newValues = [...visible]
    newValues[id] = value
    setVisible(newValues)
  }

  const changeVisibilityForSeveral = (ids, value) => {
    let newValues = [...visible]
    ids.forEach(id => newValues[id] = value)
    setVisible(newValues)
  }

  const fetchMyValues = ()=>{
    fetch('http://localhost:5000/my-values') //https://35.192.87.34- changed to local host
    .then(response=>response.json())
    .then(data=>{
      setMyValues(data);
      
    })
  }

  const setIdeal = () => {
      setIdealValues(myValues);
      //setFetchedIdealValues(myValues);
  }

  const fetchIdealValues = ()=>{
    fetch('http://localhost:5000/ideal-values') //35.192.87.34- changed to local host
    .then(response=>response.json())
    .then(data=>{
      setIdealValues(data);
      setFetchedIdealValues(data);
      setCategories([...new Set(Object.keys(data).map((key, index)=>data[key]['cat']))])
      setVisible(Object.values(data).map(val => true))
    })
  }

  const resetIdealValues = () => {
      setIdealValues(fetchedIdealValues);
  }

  useEffect(()=>{
    fetchMyValues()
    fetchIdealValues()
  },[])


  return (
    <div className="App" >
      <Context.Provider value={{myValues, idealValues, categories, visible, openMenu, height, width, changeIdealValue, changeVisibility, changeVisibilityForSeveral}}>
      <header className="App-header">
        <ThemeProvider theme={theme}>

        <div className='bar' >
          <label>Music XAI</label>
          <Tooltip title="Refresh my performance">
            <IconButton color="primary" onClick={fetchMyValues}>
              <UpdateIcon/>
            </IconButton>
          </Tooltip>

          <Tooltip title="Set ideal performance to my performance">
            <IconButton color="primary" onClick={setIdeal}>
              <UploadIcon/>
            </IconButton>
          </Tooltip>

          <Tooltip title="Reset ideal performance">
            <IconButton color="primary" onClick={resetIdealValues}>
              <SettingsBackupRestoreIcon/>
            </IconButton>
          </Tooltip>
          
          <Tooltip title={openMenu?"View application":"Choose what dimensions to use"}>
            <IconButton color={openMenu?"secondary":"primary"} onClick={()=>setOpenMenu(!openMenu)}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>

        </div>
        
        {myValues && idealValues && categories?
          <>
          {openMenu?<Settings/>:
          <div className='content'>

            <div className="StyleInfoContainer">
              {categories.map(cat=>{
                return <StyleGroup key={cat} category={cat}/>
              })}
            </div>

            <div className="SpiderContainer">
              <Spider />
            </div>

          </div>
          }
          </>
          :null}
          </ThemeProvider>
      </header>
      </Context.Provider>
    </div>
  );
}

export default App;
