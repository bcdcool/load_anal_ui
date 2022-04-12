import './App.css';
import { MDBContainer } from "mdbreact";
import { Line } from "react-chartjs-2";
import {React, useEffect, useState, useMemo} from "react";  
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  registerables
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ...registerables
);

const refData = {
  labels: ["Sunday", "Monday", "Tuesday",
    "Wednesday", "Thursday", "Friday", "Saturday"],
  datasets: [
    {
      label: "Hours Studied in Geeksforgeeks",
      data: [2, 5, 7, 9, 7, 6, 4],
      fill: false,
      backgroundColor: "rgba(6, 156,51, .3)",
      borderColor: "#02b844",
    },
    {
      label: "Hours Studied in Geeksforgeeks2",
      data: [3, 0, 6, 8, 7, 6, 9],
      fill: false,
      backgroundColor: "rgba(6, 156,51, .3)",
      borderColor: "blue",
    }

  ]
}

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchLoadData(); 
  },[])

  const lines = useMemo(() => {
    const markup = []; 
    let i = 0; 
    for(let device in data){
      markup.push(
        <div>
          Device ID: {device}
        </div>        
      )
      for(let part in data[device]){
        const lineData = data[device][part];
        markup.push(
          <MDBContainer>
            Part ID: {part}
            <Line data={lineData}/>
          </MDBContainer>        
        )
      }
    }

    return markup; 
  }, [data]) 

  async function fetchLoadData() {
    axios.get("http://localhost:8080/guidewheel/loadanalysis/getAllLineData")
    .then((result) => {
      let data = result.data; 
      setData(data); 
    })
  }

  return (
    <div className="App">
      <body>
          <h1>Pump Data Analsys</h1>
          {lines}  
      </body>
    </div>
  );
}

export default App;
