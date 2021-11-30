import React, { Children, createContext, useContext, useEffect, useState } from 'react'

const Crypto = createContext()

function CryptoContext({children}) {
    const [currency , setCurrency] = useState("THB");
    const [symbol , setSymbol] = useState('฿');

    useEffect(()=>{
        if(currency === 'THB'){
            setSymbol('฿');
        }
        else{
            setSymbol('$');
        }
    },[currency])
    return (
        <Crypto.Provider value={{currency,symbol,setCurrency}}>
            {children}
        </Crypto.Provider>
    )
}

export default CryptoContext
export const CryptoState = () =>{
  return useContext(Crypto)
}