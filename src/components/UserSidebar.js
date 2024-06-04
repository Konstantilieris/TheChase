import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Avatar, Button } from '@mui/material';
import { CryptoState } from '../context/CryptoContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { numberWithCommas } from '../components/banner/Carousel';
import { AiFillDelete } from "react-icons/ai";
import { doc,setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function UserSidebar() {
 
  const style={container:{
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace",
  },
      profile:{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        height: "92%",
    
      },
      picture:{
        width: 200,
         height: 200,
         cursor: "pointer",
         backgroundColor: "#EEBC1D",
           objectFit: "contain",
      },
      watchlist:{
        flex: 1,
        width: "100%",
        backgroundColor: "grey",
        borderRadius: 10,
        padding: 15,
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        overflowY: "scroll",
      },
      coins:{
        padding: 10,
        borderRadius: 5,
        color: "black",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EEBC1D",
        boxShadow: "0 0 3px black",

      },
};
  const {user,setAlert,symbol,coins,watchlist}=CryptoState();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const LogOut=async()=>{
    await signOut(auth)
     setAlert({open:true,message:"LogOut successfull",type:"success"});
     toggleDrawer();
  }
  const removeCoin=async(coin)=>{
    const coinRef= doc(db,"watchlist",user.uid);
    try {
      await setDoc(coinRef,
        {
         coins:watchlist.filter((watch)=>watch!==coin?.id)
        },
        {merge:"true"}
        );
        setAlert({open:true,message:`${coin.name}Removed from Watchlist`,type:"success"})
        return;
    } catch (error) {
      setAlert({open:true,message:error.message,type:"error"})
    }
   }
  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar onClick={toggleDrawer(anchor, true)} src={user.photoURL} alt={user.displayName || user.email} />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
                 >
            <div style={style.container} >
             <div style={style.profile}>
                <Avatar src={user.photoURL} alt={user.displayName || user.email} style={style.picture}/>
                <span style={{width:"100%",wordWrap:"break-word",textAlign:"center",fontSize:"25px"}}>
                    {user.displayName|| user.email}
                </span>
                <div style={style.watchlist}>
                  <span style={{fontSize: 15, textShadow: "0 0 5px black" }}>Watchlist</span>
                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <div style={style.coins}>
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}{" "}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <AiFillDelete
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => removeCoin(coin)}
                            />
                          </span>
                        </div>
                      );
                    else return <></>;
                  })}
                </div>
             </div>
             <Button variant="contained" onClick={LogOut}>LogOut</Button>
            </div>
            
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}