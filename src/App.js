import './App.css';
import { Chart } from "react-google-charts";
import axios from "axios";
import { useState } from 'react';

const superagent = require('superagent');

export let dataTemperature = [[
    { type: "date", label: "Date" },
    "Temperature",
    ],
    []
]
export const optionsTemperature = {
    chart: {
        title: "Température",
    },
    series: {
        // Gives each series an axis name that matches the Y-axis below.
        0: { axis: "Temperature" },
        1: { axis: "Date" },
    },
    axes: {
        // Adds labels to each axis; they don't have to match the axis names.
        y: {
            Temps: { label: "Température (°C)" },
            Daylight: { label: "Temps (h)" },
        },
    },
}
export let dataVent = [[
    { type: "date", label: "Date" },
    "Vitesse du vent",
    ],
    []
]
export const optionsVent = {
    chart: {
        title: "Vitesse du vent",
    },
    series: {
        // Gives each series an axis name that matches the Y-axis below.
        0: { axis: "Vitesse du vent" },
        1: { axis: "Date" },
    },
    axes: {
        // Adds labels to each axis; they don't have to match the axis names.
        y: {
            Temps: { label: "Vitesse du vent (km/h)" },
            Daylight: { label: "Temps (h)" },
        },
    },
  }
export let dataHydrometrie = [
    [
        { type: "date", label: "Date" },
        "Humidité (%)",
    ],
    []
]
export const optionsHydrometrie = {
    chart: {
        title: "Hydrometrie",
    },
    series: {
        // Gives each series an axis name that matches the Y-axis below.
        0: { axis: "date" },
        1: { axis: "Date" },
    },
    axes: {
        // Adds labels to each axis; they don't have to match the axis names.
        y: {
            Temps: { label: "Humidité (%)" },
            Daylight: { label: "Temps (h)" },
        },
    },
}

function App() {
    const [temp, setTemp] = useState()
    const [vent, setVent] = useState()
    const [hydro, setHydro] = useState()
    //Rafraichir les données du graphe
    async function reload() {
        let res1 = await superagent.get('https://devsecops-omg.boats/api/temp')
        let res = await axios.get('https://devsecops-omg.boats/api/allday')
        dataTemperature = [[
            { type: "date", label: "Date" },
            "Temperature",
        ]]
        dataVent = [[
            { type: "date", label: "Date" },
            "Vitesse du vent",
        ]]
        dataHydrometrie = [[
            { type: "date", label: "Date" },
            "Humidité (%)",
        ]]
        let data = res1.body
        data.sort(function (a, b) {
            return a.datetime = b.datetime
        })
        for (let i = 0; i < data.length; i++) {
            let dateJ = new Date(data[i].datetime)
            dataTemperature.push([dateJ, data[i].temperature])
            dataVent.push([dateJ, data[i].wind_power])
            dataHydrometrie.push([dateJ, data[i].hydrometry])
        }
        setTemp(dataTemperature)
        setVent(dataVent)
        setHydro(dataHydrometrie)

        //window.setTimeout(3000);
    }
    return (
        <div className="App">            
            <header className="App-header">
                <h1>Application de suivi météo</h1>
                <button className="button" type="button" name='Rafraichir' onClick={() => reload()}>
                    Rafraichir
                </button> 
                <Chart
                    chartType="Line"
                    width="90%"
                    height="400px"
                    data={temp}
                    options={optionsTemperature}
                    legendToggle
                />
                <Chart
                    chartType="LineChart"
                    data={vent}
                    options={optionsVent}
                    width="90%"
                    height="400px"
                    legendToggle
                />
                <Chart
                    chartType="Line"
                    data={hydro}
                    options={optionsHydrometrie}
                    width="90%"
                    height="400px"
                    legendToggle
                />          
            </header>
            
        </div>
    );
}


export default App;
