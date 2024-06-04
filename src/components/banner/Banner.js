import { Container, Typography, } from '@mui/material'
import { red } from '@mui/material/colors';
import React from 'react'
import {makeStyles } from 'tss-react/mui'
import Carousel from './Carousel';
const useStyles= makeStyles()(()=>{return({
  banner:{
    backgroundImage:"url(./bannerpic.jpg)",
  },
  bannerContent:{
   
    height:400,
    display:"flex",
    flexDirection:"column",
    paddingTop:25,
    justifyContent:"space-around",
  },
  tagline:{
    display:"flex",
    height:"40%",
    flexDirection:"column",
    justifyContent:"center",
    textAlign:"center",
  },
   
})})



const Banner = () => {
   const {classes}=useStyles();

  return (
    <div className={classes.banner} >
      <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
              <Typography variant="h2" style={{
              color:"#007B48",
              fontFamily:"Montserrat",
              fontWeight:"bold",
                marginBottom:15,
    } }>Crypto Chaser</Typography>
              <Typography variant='subtitle2' style={{color:"#FFD700",textTransform:"capitalize",fontFamily:"Montserrat",fontSize:"20px"}}> Get All Info Regarding Your Favorite Crypto Currency</Typography>
            </div>
            <Carousel> </Carousel>
      </Container>
    </div>
  )
}

export default Banner
