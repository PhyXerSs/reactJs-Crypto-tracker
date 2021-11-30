import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel';

const useStyles = makeStyles(()=>({
    banner:{
        backgroundImage: 'url(/picture/banner.jpg)',
        // backgroundRepeat:'no-repeat',
        backgroundPosition: 'center -200px'
    },
    bannerContent:{
        height: 400,
        display: 'flex',
        flexDirection:"column",
        paddingTop: 25,
        justifyContent:'space-around'
    },
    tagline:{
        display: 'flex',
        height: '40%',
        flexDirection: 'column',
        justifyContent:'center',
        textAlign:'center'
    },
    fadeBottom:{
        height:'7.4rem',
        backgroundImage:'linear-gradient(180deg,transparent,rgba(37,37,37,0.61),#111)'
    }
}))


function Banner() {
    const classes  = useStyles();
    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent} >
                <div className={classes.tagline}>
                    <Typography 
                        variant="h2"
                        style={{
                            fontWeight:'bold',
                            marginBottom:15,
                            fontFamily:'Montserrat'
                        }}
                    >
                        Crypto Tracker
                    </Typography>
                    <Typography 
                        variant="subtitle2"
                        style={{
                            color:'darkgray',
                            textTransform:'capitalize',
                            fontFamily:'Montserrat'
                        }}
                    >
                        Get all the Info regarding your favorite Crypto Currency
                    </Typography>
                </div>
                <Carousel/>
            </Container>
            <div className={classes.fadeBottom}/>
            
        </div>
    )
}

export default Banner
