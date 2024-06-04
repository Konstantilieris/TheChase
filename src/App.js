
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';
import { makeStyles } from 'tss-react/mui';
import { Box } from '@mui/material';
import Alert from './components/Alert';

const useStyles= makeStyles()(()=>{return({
  Main:{
  backgroundColor:"#03001C",
  color:"white",
  minHeight:"100vh",
  
  }
 })})
function App() {
    
 const {classes}=useStyles();
   
  return(
   
    <BrowserRouter >
    < div className={classes.Main}>
      <Header/>
       <Routes>
       <Route path='/' Component={Homepage} exact/>
       <Route path="/coins/:id" Component={CoinPage}/>
       </Routes>
    </div>
    <Alert/>
    </BrowserRouter>
  
  )
  
}

export default App;
