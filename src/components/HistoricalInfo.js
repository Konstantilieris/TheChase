import {React,useEffect,useState} from 'react'
import { CryptoState } from '../context/CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { styled } from "@mui/material/styles";
import { CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJs,LineElement,CategoryScale,LinearScale,PointElement,Tooltip} from 'chart.js'
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';


ChartJs.register(
  LineElement,CategoryScale,LinearScale,PointElement,Tooltip
)
const Container = styled("div")(({ theme }) => ({
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
  }}));
  
const HistoricalInfo = (id) => {
    const [historicalData,setHistoricalData]=useState();
    const [days,setDays]=useState(1);
    const {currency}=CryptoState();
    const [flag,setflag] = useState(false);
  
    
    const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart(id.coinid, days, currency));
        setflag(true);
        setHistoricalData(data.prices);
      };
    
      useEffect(() => {
        fetchHistoricData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [days]);
    
   
   
   
    
  return (
    <Container>
      {!historicalData | flag===false ?<CircularProgress size={250} thickness={1} style={{color:"gold"}}/>:
      
      <>
      <Line data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                    backgroundColor:"green"
                  },
                ],
              }}
              options={
                
                {
                elements: {
                  point: {
                    radius: 3,
                    
                  },
                },
                plugins:{
                  legend:true,
                },
                Tooltip:{

                },
              }}
      />
      </>
      }
        <div style={{display:"flex",marginTop:20,justifyContent:"space-around",width:"100%",}}>
          {chartDays.map(day=>(
            <SelectButton key={day.value}   
            selected={day.value===days}
            onClick={() => {setDays(day.value);
              setflag(false);
            }}>
              {day.label}
            </SelectButton>
          ))}
        </div>
      </Container>
  )
}

export default HistoricalInfo
