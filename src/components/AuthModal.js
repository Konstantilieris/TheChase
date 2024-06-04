import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { AppBar, Tab, Tabs } from '@mui/material';
import Login from './Login';
import SignUp from './SignUp';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { CryptoState } from '../context/CryptoContext';
const style = {container:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: "#302D2D",
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,},
    google:{
      display:"flex",
      flexDirection:"column",
      gap:12,
      alignItems:"center",
      borderTop:"5px solid black",
      paddingTop:"0px",
      padding:"24px",
    }
  };
  
const AuthModal = () => {
  const {setAlert}=CryptoState();
    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value,setValue]=useState(0);
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle=()=>{
    signInWithPopup(auth,googleProvider).then(res=>{
         setAlert({open:true, message:`Sign Up Successful.Welcome ${res.user.email}`,type:"success",})
         handleClose();
        })
        .catch((error)=>{
          setAlert({open:true,message:error.message,type:"error"})
          return;
        });
    
  }
  return (
    <>
    <Button style={{backgroundColor:"#FFD700",color:"black",width:90,height:40,fontSize:20,fontFamily:"Montserrat",fontWeight:"bold"}} onClick={handleOpen}>Login</Button>
    <Modal
      open={open}
      onClose={handleClose}
     
    >
      <Box sx={style.container}>
      <Box sx={{ borderBottom: 4, borderColor: 'divider',}}>
        <AppBar position="static" style={{backgroundColor:"transparent",color:"white"}}>
        <Tabs value={value} onChange={handleChange} aria-label='loginform' variant="fullWidth">
          <Tab label="Login" style={{color:'white'}}/>
          <Tab label="SignUP" style={{color:'white'}}/>
        </Tabs>
        </AppBar>
        {value===0 && < Login handleClose={handleClose}/>}
        {value === 1 && <SignUp handleClose={handleClose} />}
        <Box style={style.google} >
          <span style={{fontSize:20,fontWeight:"bold",fontFamily:"Montserrat",color:"white"}}>OR</span>
          <GoogleButton style={{width:"100%",outline:"none"}} onClick={signInWithGoogle}/>
        </Box>
        
        </Box>
      </Box>
    </Modal>
    </>
  )
}

export default AuthModal
