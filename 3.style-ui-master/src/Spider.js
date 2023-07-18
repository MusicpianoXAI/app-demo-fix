import React, { useContext } from 'react';
import { Context } from "./App";
import { Radar } from 'react-chartjs-2';
import "./Spider.css"

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);



const Spider = () => {

    const {myValues, idealValues, visible, width, height} = useContext(Context)

    const myObjects = Object.values(myValues).filter((val, id)=>visible[id])
    const idealObjects = Object.values(idealValues).filter((val, id)=>visible[id])

    const options = {
        scales: {
            r: {
                angleLines: {
                    color:'#474747'
                },
                ticks: {
                  color: 'white',
                  showLabelBackdrop: false // hide square behind text
                },
                pointLabels: {
                  color: 'white' 
                },
                grid: {
                  color: "#474747",
                },
                
                
                // suggestedMin: -1,
                // suggestedMax: 1

            }
        },
        maintainAspectRatio:false,
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          }
        }
      }

    const data = {
        labels: myObjects.map(val=>val.opt2),
        datasets: [
          {
            label: 'My Performance',
            data: myObjects.map(obj=>obj.value),
            backgroundColor: 'rgba(111, 102, 206, 0.2)',
            borderColor: 'rgba(111, 102, 206, 1)',
            borderWidth: 1,
          },
          {
            label: 'Ideal Performance',
            data: idealObjects.map(obj=>obj.value),
            backgroundColor: 'rgba(244, 218, 78, 0.2)',
            borderColor: 'rgba(244, 218, 78, 1)',
            borderWidth: 1,
          }
        ],
      };


  return (
    <div className='Spider'>
        <Radar data={data} options={options} height={height*0.8} width={width* 0.45}/>
    </div>
  )
}

export default Spider;