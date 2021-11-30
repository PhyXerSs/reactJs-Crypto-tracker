import { AppBar, makeStyles } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';

const useStyles = makeStyles((theme)=>({
    carousel:{
        height: '50%',
        display: 'flex',
        alignItems:'center',
    },
    carouselItem:{
        display: 'flex',
        flexDirection:'column',
        alignItems:'center',
        cursor: 'pointer',
        textTransform:'uppercase',
        color:'white'
    }
}))

function Carousel() {
    const [trending , setTrending] = useState([]);
    const classes = useStyles();
    
    const { currency , setCurrency ,symbol } = CryptoState();
    
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    async function fetechTrendingCoin(){
        const {data} = await axios.get(TrendingCoins(currency));
        setTrending(data);
    }

    useEffect(()=>{
        fetechTrendingCoin();
    },[currency])

    const items = trending.map((coin,index) =>{
        let profit = coin.price_change_percentage_24h > 0;
        return(
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
                <img src={coin?.image} alt={coin.name} height="80" style={{marginButtom:20}} onDragStart={(e)=>e.preventDefault()}/>    
                <span>
                    {coin?.symbol}
                        &nbsp;
                        <span style={{
                            color:profit ? "rgb(14,203,129)" : "red",
                            fontWeight:500,
                        }}>
                            {profit && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}%
                        </span>
                </span>
                <span style={{fontSize:22 , fontWeight:500}}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })

    const responsive = {
        0:{
            items:2,   
        },
        576:{
            items:4,
        }
    }
    console.log(trending)
    return (
        <div className={classes.carousel}>
            <AliceCarousel 
                mouseTracking
                touchTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
                // animationType={'fadeout'}
            />
        </div>
    )
}

export default Carousel
