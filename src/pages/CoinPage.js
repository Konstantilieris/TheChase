import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CryptoState } from '../context/CryptoContext';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import { styled } from "@mui/material/styles";
import { Button, Typography } from '@mui/material';
import parse from "html-react-parser"
import { numberWithCommas } from '../components/banner/Carousel';
import HistoricalInfo from '../components/HistoricalInfo';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
const Container = styled("div")(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Sidebar = styled("div")(({ theme }) => ({
  width: '30%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 25,
  borderRight: '2px solid #007B48',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));
const RespDiv= styled("div")(({theme})=>({
  
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection:"column",
      justifyContent: "space-around",
      alignItems:"center"
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
 
}))
const customstyle= {
        heading:{
          fontWeight:"bold",
          marginBottom:20,
          fontFamily:"Montserrat",
          color:"#007B48",
          
          
        },
        description: {
          width: "100%",
          fontFamily: "Montserrat",
          fontSize:20,
          padding: 25,
          paddingBottom: 15,
          paddingTop: 0,
          textAlign: "justify",
        },

};


function CoinPage() {
 
   const {id}= useParams();
   const [coin,setCoin]=useState();
   const {currency,symbol,user,watchlist,setAlert}=CryptoState();

   const fetchCoin= async()=>{
     const {data}= await axios.get(SingleCoin(id));
     setCoin(data);
   };
  useEffect(()=>{
    fetchCoin();
    },[]
  );
 
   const addToWatchlist=async()=>{
     const coinRef=doc(db,"watchlist",user.uid);
     try {
      await setDoc(coinRef,{coins:watchlist?[...watchlist, coin?.id]:[coin?.id]});
      setAlert({open:true,message:`${coin.name} has been successfully added to the watchlist`,type:"success"})
     } catch (error) {
      setAlert({open:true,message:error.message,type:"error"})
      return;
      
     }
   }
   const removeFromWatchlist=async()=>{
    const coinRef= doc(db,"watchlist",user.uid);
    try {
      await setDoc(coinRef,
        {
         coins:watchlist.filter((watch)=>watch!==coin?.id)
        },
        {merge:"true"}
        );
        setAlert({open:true,message:`${coin.name}Removed from Watchlist`,type:"success"})
      
    } catch (error) {
      setAlert({open:true,message:error.message,type:"error"})
    }
   }
   const inWatchList=watchlist.includes(coin?.id);
  return (
    
      <Container>
        <Sidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20,color:"#af1fc2" }}

        />
        <Typography variant="h3" style={customstyle.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" style={customstyle.description}>
        {parse(`${coin?.description.en.split(". ")[0]}. `)}
        {parse(`${coin?.description.en.split(". ")[1]} `)}
        {parse(`${coin?.description.en.split(". ")[2]}.`)}
        </Typography>
        <RespDiv>
          <span style={{display:"flex"}}>
            <Typography variant='h5' style={customstyle.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' style={{fontFamily:"Montserrat"}}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{display:"flex"}}>
            <Typography variant='h5' style={customstyle.heading}>
            Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' style={{fontFamily:"Montserrat"}}>
            {symbol}{" "}
            {coin?.market_data?.current_price?.[currency.toLowerCase()] && numberWithCommas(coin.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>
          <span style={{display:"flex"}}>
            <Typography variant='h5' style={customstyle.heading}>
            Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' style={{fontFamily:"Montserrat"}}>
            {symbol}{" "}
            {coin?.market_data?.market_cap?.[currency.toLowerCase()] &&
  numberWithCommas(
    coin.market_data.market_cap[currency.toLowerCase()]
      .toString()
      .slice(0, -6)
  )}M
            </Typography>
          </span>
         {user&& <Button onClick={inWatchList?removeFromWatchlist:addToWatchlist} style={{color:"black",backgroundColor:inWatchList?"#af1fc2":"#FFD700",width:100,height:40,fontSize:15,fontFamily:"Montserrat",fontWeight:"bold"}}>{inWatchList?"REMOVE":"ADD"}</Button>}
        </RespDiv>
        </Sidebar>
        <HistoricalInfo coinid={id}/>
      </Container>
    
  )
}

export default CoinPage;
