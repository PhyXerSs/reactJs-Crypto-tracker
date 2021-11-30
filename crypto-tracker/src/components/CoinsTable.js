import { Container, createTheme, Typography ,ThemeProvider, TextField, TableContainer, LinearProgress, Table, TableHead, TableCell,TableRow, TableBody, makeStyles } from '@material-ui/core';

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';

function CoinsTable() {
    const [coins , setCoins] = useState([]);
    const [loading , setLoading] = useState(false);
    const [search , setSearch] = useState('');
    const {currency ,symbol} = CryptoState();
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    
    async function fetchCoins(){
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }
    useEffect(()=>{
       fetchCoins();
    },[currency])

    // console.log(coins)
    const darkTheme = createTheme({
        palette:{
            primary:{
                main:'#fff',
            },
            type:"dark",
        }
    })

    function handleSearch(){
        return coins.filter((coin)=>(
            coin.name.toLowerCase().includes(search.toLowerCase()) || 
            coin.symbol.toLowerCase().includes(search.toLowerCase())
        ));
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const useStyle = makeStyles(()=>({
        row:{
            backgroundColor: "#16171a",
            cursor: "pointer",
            transition:"0.8s all",
            "&:hover": {
              backgroundColor: "#131111",
            },
            fontFamily: "Montserrat",
        },
        pagination: {
            "& .MuiPaginationItem-root": {
              color: "gold",
            },
        },
    }))

    const classes = useStyle();
    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign:'center' }}>
                <Typography
                    variant="h4"
                    style={{margin:18, fontFamily:"Montserrat"}}
                >
                    Cryptocurrency Prices by Market Cap
                </Typography>
                <TextField
                    label="Search For a Crypto Currency..." variant="outlined"
                    style={{marginBottom:20,marginTop:30,width:'100%'}}
                    onChange={(e)=>setSearch(e.target.value)}
                />
                <TableContainer>
                    {
                        loading ? (<LinearProgress style={{backgroundColor:'gold'}}/>):
                        
                        (<>
                            <Table>
                                <TableHead style={{backgroundColor:'#EEBC1D'}}>
                                    <TableRow>
                                        {
                                            ["Coin","Rank","Price","24h Change","Market Cap"].map((head,index)=>{
                                                if(head==="Rank"){
                                                    return(
                                                        <TableCell
                                                            style={{
                                                                color:'black',
                                                                fontWeight:'700',
                                                                fontFamily:'Montserrat',
                                                            }}
                                                            key={head}
                                                            align="center"
                                                        >
                                                            {head}
                                                        </TableCell>
                                                    );
                                                }
                                                
                                                
                                                return (<TableCell
                                                            style={{
                                                                color:'black',
                                                                fontWeight:'700',
                                                                fontFamily:'Montserrat',
                                                            }}
                                                            key={head}
                                                            align={head === "Coin" ?  "" : "right"}
                                                        >
                                                            {head}
                                                        </TableCell>
                                                );
                                            })
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                        {handleSearch()
                                            .slice((page-1)*10,(page-1) *10 + 10)
                                            .map((row,index)=>{
                                            const profit = row.price_change_percentage_24h > 0;
                                            return(
                                                <TableRow
                                                    onClick={()=>navigate(`/coins/${row.id}`)}
                                                    className={classes.row}
                                                    key = {row.name}
                                                >
                                                    
                                                    <TableCell
                                                        component="th"

                                                    >
                                                        <div style={{display:'flex',gap:15}}>
                                                            <img src={row?.image} alt={row.name} height="50" style={{marginBottom:10 }}/>
                                                            <div
                                                                style={{display:'flex', flexDirection:'column'}}
                                                            >
                                                                <span
                                                                    style={{
                                                                        textTransform:'uppercase',
                                                                        fontSize:22
                                                                    }}
                                                                >
                                                                {row.symbol}
                                                                </span>
                                                                <span style={{color:'darkgray'}}>{row.name}</span>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        
                                                            {row?.market_cap_rank}
                                                        
                                                        
                                                    </TableCell>
                                                    <TableCell align="right" >
                                                            {symbol}{" "}
                                                            {numberWithCommas(row?.current_price.toFixed(2))}
                                                    </TableCell>
                                                    <TableCell 
                                                        align="right"
                                                        style={{
                                                            color: profit ? 'rgb(14,203,129)' : 'red',
                                                            fontWeight:500
                                                        }}
                                                    >
                                                        {profit && "+"}{row?.price_change_percentage_24h?.toFixed(2)}%
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {symbol}{" "}
                                                        {numberWithCommas(
                                                            row.market_cap.toString().slice(0,-6)
                                                        )}M
                                                    </TableCell>

                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </>)
                    }
                </TableContainer>
                <Pagination
                    style={{
                        padding:20,
                        width: '100%',
                        display: 'flex',
                        justifyContent:'center'
                    }}
                    classes={{ul: classes.pagination}}
                    count={(handleSearch()?.length/10).toFixed(0)}
                    onChange={(e,value)=>{     
                        setPage(value);
                        window.scroll(0,450)
                    }}
                />
            </Container>
        </ThemeProvider>
    )
}

export default CoinsTable
