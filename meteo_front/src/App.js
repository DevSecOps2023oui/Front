import logo from './logo.svg';
import './App.css';
import { Chart } from "react-google-charts";
import axios from "axios";

export let dataTemperature = [[
    { type: "date", label: "Date" },
    "Temperature",
    ],
    [new Date(2014, 0), -0.5],
    [new Date(2014, 1), -12],
    [new Date(2014, 2), 0.5],
    [new Date(2014, 3), 10],
    [new Date(2014, 4), -3],
    [new Date(2014, 5), 9],
    [new Date(2014, 6), 10.6],
    [new Date(2014, 7), 10.3],
    [new Date(2014, 8), 7.4],
    [new Date(2014, 9), 4.4],
    [new Date(2014, 10), 1.1],
    [new Date(2014, 11), -0.2]
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
    [new Date(2014, 0), 10],
    [new Date(2014, 1), 5],
    [new Date(2014, 2), 35],
    [new Date(2014, 3), 20],
    [new Date(2014, 4), 30],
    [new Date(2014, 5), 9],
    [new Date(2014, 6), 45],
    [new Date(2014, 7), 5],
    [new Date(2014, 8), 32],
    [new Date(2014, 9), 44],
    [new Date(2014, 10), 11],
    [new Date(2014, 11), 2]
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
    [new Date(2014, 0), 10],
    [new Date(2014, 1), 5],
    [new Date(2014, 2), 35],
    [new Date(2014, 3), 20],
    [new Date(2014, 4), 30],
    [new Date(2014, 5), 9],
    [new Date(2014, 6), 45],
    [new Date(2014, 7), 5],
    [new Date(2014, 8), 32],
    [new Date(2014, 9), 44],
    [new Date(2014, 10), 11],
    [new Date(2014, 11), 2]
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
    return (
        <div className="App">            
            <header className="App-header">
                <h1>Application de suivi météo</h1>
                <Chart
                    chartType="Line"
                    width="90%"
                    height="400px"
                    data={dataTemperature}
                    options={optionsTemperature}
                />
                <Chart
                    chartType="Line"
                    data={dataVent}
                    options={optionsVent}
                    width="90%"
                    height="400px"
                    legendToggle
                />
                <Chart
                    chartType="Line"
                    data={dataHydrometrie}
                    options={optionsHydrometrie}
                    width="90%"
                    height="400px"
                    legendToggle
                />
                <button className="favorite styled" type="button" name='Rafraichir' onClick={reload()}>
                Rafraichir
              </button>
            </header>
            
        </div>
    );
}
//Rafraichir les données du graphe
async function reload() {
    await getDataTemperature()
    await getDataVent()
    await getDataHydrometrie()
    //window.setTimeout(3000);
}
async function getDataTemperature(){
    let res = await axios.get('')
    dataTemperature = [[
        { type: "date", label: "Date" },
        "Temperature",
    ]]
    for (let i = 0; i < res.length; i++) {
        dataTemperature.push([new Date(res[i].datetime), res[i].temperature])
    }
}
async function getDataVent() {
    let res = await axios.get('')
    dataVent = [[
        { type: "date", label: "Date" },
        "Vitesse du vent",
      ]]
    for (let i = 0; i < res.length; i++) {
        dataVent.push([new Date(res[i].datetime), res[i].wind_power])
    }
}
async function getDataHydrometrie() {
    let res = await axios.get('')
    dataHydrometrie = [[
        { type: "date", label: "Date" },
        "Humidité (%)",
    ]]
    for (let i = 0; i < res.length; i++) {
        dataHydrometrie.push([new Date(res[i].datetime), res[i].hydrometry])
    }
}

export default App;
