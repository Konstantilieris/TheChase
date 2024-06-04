import React from 'react'
import { AppBar,MenuItem,Select,Toolbar, Typography,} from '@mui/material'
import { useNavigate } from "react-router-dom";
import { CryptoState } from '../context/CryptoContext';
import AuthModal from './AuthModal';
import { styled } from "@mui/material/styles";
import UserSidebar from './UserSidebar';
const Header = () => {
const navigate= useNavigate();
const { currency, setCurrency,user}= CryptoState();
const Container = styled("div")(() => ({
  display:"flex",
  flexDirection:"row",
  backgroundColor:"black",
  alignItems: "center",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  padding: "10px 20px",
  justifyContent:"space-between",
}))
   const style={
          heading:{
            display:"flex",
            flexDirection:"row",
           justifySelf:"flex-start",
           },
           toolbar:{
            
            display:"flex",
            flexDirection:"row",
            justifySelf:"end",
           }

   }




  return (
    
    <AppBar  position="sticky" >
      
        <Container>
               <div style={style.heading} >
        <Typography variant="h3"style={{flex:1, marginLeft:100,fontFamily:"Montserrat",fontSize:"30px",color:"#007B48",fontWeight:"bold"}} onClick={()=>navigate("/")}>
               The Chase
             </Typography>
             </div>
             <div style={style.toolbar}>
          <Toolbar>
           
           
             <Select c variant="outlined" style={{ marginRight: 30 ,backgroundColor:"#FFD700",width:100,height:40,marginLeft:30,fontSize:20,fontFamily:"Montserrat",fontWeight:"bold"}} value={currency} onChange={(e)=>setCurrency(e.target.value)} >
              <MenuItem value={"eur"}> EUR</MenuItem>
              <MenuItem value={"usd"}>USD</MenuItem>
             </Select>
             {user? <UserSidebar/> :<AuthModal/>}
             
          </Toolbar>
          </div>
         </Container>
    </AppBar>
 
  )
}

export default Header
