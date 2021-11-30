import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, Toolbar, Typography ,ThemeProvider} from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
const useStyles = makeStyles(()=>({
    title:{
        flex:1,
        color: 'gold',
        fontFamily:'Montserrat',
        fontWeight:'bold',
        cursor: 'pointer',
        transition: '0.8s all',
        "&:hover": {
            // transform: 'scale(1.02)',
            color: '#FF5403',
          },
    }
}))

function Header() {
    
    const classes = useStyles();
    const navigate = useNavigate();

    const { currency , setCurrency } = CryptoState();

    const darkTheme = createTheme({
        palette: {
          type: 'dark',
          primary:{
              main:'#fff',
          }
        },
      });

    
    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                    <Typography className={classes.title} onClick={()=>navigate('/')} variant='h6'>
                        Crypto Tracker
                    </Typography>
                    <Select variant='outlined' 
                        style={{width:100,height:40,marginRight:15}}
                        value={currency}
                        onChange={(e)=>setCurrency(e.target.value)}
                    >
                        <MenuItem value={'USD'}>USD</MenuItem>
                        <MenuItem value={'THB'}>THB</MenuItem>
                    </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header
