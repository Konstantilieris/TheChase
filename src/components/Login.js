import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { CryptoState } from '../context/CryptoContext';
const Login = ({handleClose}) => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {setAlert}=CryptoState();
    const handleSubmit= async()=>{
      try{ 
        const result= await signInWithEmailAndPassword(auth,email,password)
        setAlert({open:true,message:"Login successfull",type:"success"
        })
         handleClose();
      }
      catch (error){
            setAlert({open:true,message:error.message,type:"error"})

            }
            return;
         }
  return (
    <Box p={3} style={{display:"flex",flexDirection:"column",gap:"20px"}}>
      <TextField variant="outlined" type="email" label="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <TextField variant="outlined" type="password" label="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <Button variant="contained"style={{backgroundColor:"gold",color:"black"}} onClick={handleSubmit}>LOGIN</Button>
    </Box>
  )
}

export default Login
