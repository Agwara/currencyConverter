import React, {useEffect, useState} from "react";
import axios from "axios";
import ConvertNav from "./ConverterNav";
import InputBox from "../InputBox/InputBox";
import "./Converter.css";

import toggle from "../../assets/toggle.svg";
import info from "../../assets/info.svg"
import { apiKey } from "../../keys/keys";
import {data} from "../../data";  //This is the sample mock data

const Converter = () => {
  const [fromCurrency, setFromCurrency] = useState({});
  const [toCurrency, setToCurrency] = useState({});
  const [amount, setAmount] = useState(1.00);
  const [amountError, setAmountError] = useState("");

  const [showFromInput, setShowFromInput] = useState(false);
  const [showToInput, setShowToInput] = useState(false);
  const [pairDiff, setPairDiff] = useState(1);

  const [allCurrencies, setAllCurrencies] = useState([])

  const convertCurrencies = (fromID, toID) => {
    let querytext = `${fromID}_${toID}`
    axios.get(`https://free.currconv.com/api/v7/convert?q=${querytext}&compact=ultra&apiKey=${apiKey}`)
      .then((res) => {
        let tempDiff = res.data[querytext];
        setPairDiff(tempDiff);       
      })
      .catch((e) => console.log(e))
  }

  useEffect (() => {
    setFromCurrency({
      currencyName: "British Pound",
      currencySymbol: "£",
      id: "GBP"
    })
    setToCurrency(    {
      currencyName: "British Pound",
      currencySymbol: "£",
      id: "GBP"
    })
  }, [])

  /*
    I used the mock data sometimes because I have limited number of free API request to make
    to Xe Currency Converter API
    You can use it by uncommenting it and commenting out the useEffect() below. 
  */

  
  useEffect(() => {
    let temp = []
    Object.entries(data).map(value => {
      return temp.push(value)
    })
    setAllCurrencies([...temp])
  }, [])
  

  /* 
    This useEffect() is used to get all the currencies
    You can use it by uncommenting it and commenting the out the useEffect handler above
  */  

  // useEffect(() => {
  //   axios.get(`https://free.currconv.com/api/v7/currencies?apiKey=${apiKey}`)
  //   .then((res) => {
  //     let temp = []
  //     Object.entries(res.data.results).map(value => {
  //       return temp.push(value)
  //     })
  //     setAllCurrencies([...temp]) 
  //   })
  //   .catch((e) => console.log(e)) 
  // }, [])

  const onSetShowFromInput = () => {
    setShowFromInput(true)
    setShowToInput(false)
  }

  const onSetShowToInput = () => {
    setShowFromInput(false);
    setShowToInput(true);
  }

  const onclickToggle = () => {
    convertCurrencies(toCurrency.id, fromCurrency.id);
    let fromData = fromCurrency;
    let toData = toCurrency;

    setFromCurrency({...toData});
    setToCurrency({...fromData});
    setShowToInput(false);
    setShowFromInput(false);
  }

  const onSetAmount = (value) => {
    setAmount(value)
    if (!Number(value)) {
      setAmountError("Please enter a valid amount")
    } else  {
      setAmountError("")
    }
  }

  return (
    <div className="converter">
      <ConvertNav />

      <div className="converter__action">
        <div className="converter__amount">
          <h3 className="amount__header">Amount</h3>
          <p>{fromCurrency.currencySymbol}</p>

          <input
            type="text"
            value={amount}
            onChange={(e) => onSetAmount(e.target.value)} 
          />
          <span className="amount-error">{amountError}</span>
        </div>
        
        <InputBox 
          type="From" 
          currency={fromCurrency} 
          setCurrency={setFromCurrency}
          showInput={showFromInput}
          handleShowInput={onSetShowFromInput}
          setShowInput={setShowFromInput}
          allCurrencies={allCurrencies}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          convertCurrencies={convertCurrencies}
        />
        
        <div className="converter__toggle" onClick={onclickToggle}>
          <img
            alt=""
            src={toggle} 
            height="20"
            width="20"
          />
        </div>

        <InputBox 
          type="To" 
          currency={toCurrency} 
          setCurrency={setToCurrency}
          showInput={showToInput}
          handleShowInput={onSetShowToInput}
          setShowInput={setShowToInput}
          allCurrencies={allCurrencies}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          convertCurrencies={convertCurrencies}
        />
      </div>

      <div className="converter__pair-details">
        <p className="pair-details--from">{amount} {fromCurrency.currencyName} =</p>
        <p className="pair-details--to">{(pairDiff*amount).toFixed(5)} {toCurrency.currencyName}</p>

        <p className="pair-details--other">1 {fromCurrency.id} = {pairDiff} {toCurrency.id}</p>
        <p className="pair-details--other">1 {toCurrency.id} = {(1/pairDiff).toFixed(5)} {fromCurrency.id}</p>
      </div>

      <div className="converter__other">
        <div className="converter__info">
          <p>We use midmarket rates</p>
          <img
            alt=""
            src={info} 
            width="17"
            height="17"
          />
        </div>
        <button onClick={() => convertCurrencies(fromCurrency.id, toCurrency.id)}>Convert</button>
      </div>
    </div>
  )
}

export default Converter;