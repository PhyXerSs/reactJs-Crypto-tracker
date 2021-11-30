import { makeStyles } from '@material-ui/core'
import zIndex from '@material-ui/core/styles/zIndex';
import React from 'react'

function SelectButton({children ,selected , onClick}) {

    const useStyles = makeStyles(()=>({
        selectButton:{
            border: "1px solid gold",
            borderRadius: 5,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily: "Montserrat",
            cursor: "pointer",
            backgroundColor: selected ? "gold" : "",
            color: selected ? "black" : "",
            fontWeight: selected ? 700 : 500,
            transition: '0.5s all',
            "&:hover": {
              backgroundColor: "gold",
              color: "black",
              transform: 'scale(1.1)',
              zIndex:10,
              fontWeight:700,
            },
            width: "22%",
            margin: 5,
          },
    }));
    const classes = useStyles();
    return (
        <span 
            className={classes.selectButton}
            onClick={onClick}
        >
            {children}
        </span>
    )
}

export default SelectButton
