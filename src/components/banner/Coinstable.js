import React, { useEffect } from 'react'
import { CoinList } from '../../config/api';
import axios from 'axios';
import { useState  } from 'react';
import { CryptoState } from '../../context/CryptoContext';
import { Paper,Container,Pagination,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from "@mui/material/styles";
import { numberWithCommas } from './Carousel';


const StyledPagination = styled(Pagination)({
  '& .MuiPaginationItem-root': {
    color: '#FFD700',
    '&.Mui-selected': {
      backgroundColor: '#FFD700',
      color: 'black',
    },
    '&:hover': {
      backgroundColor: 'lightgray',
      color:'black',
    },
  },
});

const Coinstable = () => {
    
    
    const {currency,symbol,coins,loading,fetchCoins}=CryptoState();
    const [search,setSearch]=useState("");
    const [page,setPage] = useState(1);
    
    console.log(coins)
    useEffect(()=>{
          fetchCoins();
    },[currency])
    
    const navigate=useNavigate();
    const handleSearch = () => {
      return coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search) ||
          coin.symbol.toLowerCase().includes(search)
      );
    };
      
  return (
    
       <Container style={{textAlign:"center"}}>
           <Typography variant="h4" style={{margin:18,fontFamily:"Montserrat"}}>Cryptocurrency Prices by Market Cap</Typography>
       
       <TextField label="Search your prefered crypto"  variant="filled" color="secondary" style={{marginBottom:20,width:"100%",backgroundColor:"#fff"}} onChange={(e)=>setSearch(e.target.value)}/>
      <TableContainer  component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "#FFD700" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                 <TableRow>
                   {["Coin","Price","24h Change","Market Cap"].map((head)=>(
                    <TableCell style={{color:"black",fontWeight:"700",fontFamily:"Montserrat",fontSize:"20px"}} key={head}
                    align={head==="Coin"? "center":"right"}>
                      {head}
                     </TableCell>
                      ))}
                 </TableRow>
              </TableHead>
              <TableBody>
              {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                   return(
                    <TableRow onClick={()=>navigate(`/coins/${row.id}`)}  key={row.name}>
                          <TableCell component="th" scope="row" styles={{display:"flex",gap:15,}} >
                            <img src={row?.image} alt={row.name} height="50" style={{marginBottom:10}}
                            />
                            <div style={{display:"flex",flexDirection:"column"}}>
                              <span style={{textTransform:"uppercase",fontSize:22}}>{row.symbol}</span>
                              <span style={{color:"darkgrey"}}>{row.name}</span>
                            </div>
                            </TableCell>
                            <TableCell align="right" style={{fontSize:"20px",fontFamily:"Fira Sans"}}>
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                            <TableCell align="right" style={{color: profit>0?"rgb(14,203,129)":"red",fontWeight:500,fontSize:"25px",fontFamily:"Fira Sans"}}>
                                 {profit && "+"}
                                 {row.price_change_percentage_24h.toFixed(2)} %
                            </TableCell>
                            <TableCell align="right" style={{fontSize:"20px",fontWeight:500,fontFamily:"Fira Sans"}}>
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                        </TableCell>
                    </TableRow>
                   );
                 }
                 )}
            
              
              </TableBody>
            </Table>
            

          )
          }
      </TableContainer>
       <StyledPagination   count={parseInt((handleSearch()?.length / 10).toFixed(0))}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
           
          }} 
           onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}/>
      </Container>
    
   
  );
}

export default Coinstable
