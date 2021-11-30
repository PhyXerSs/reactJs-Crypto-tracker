import { makeStyles } from '@material-ui/core';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CoinPage from './Pages/CoinPage';
import Homepage from './Pages/Homepage';

function App() {
  const useStyles = makeStyles(()=>({
    App:{
      backgroundColor: '#111',
      color: 'white',
      minHeight:'100vh',
    }
  }));
  const classes = useStyles()

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header/>
        <Routes >
          <Route exact path="/" element={<Homepage/>}/>
          <Route path="/coins/:id" element={<CoinPage/>}/>
        </Routes >
      </div>
    </BrowserRouter>
  );
}

export default App;
