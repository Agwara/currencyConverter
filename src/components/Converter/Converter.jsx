import React, {useEffect, useState} from "react";
import axios from "axios";
import getSymbolFromCurrency from 'currency-symbol-map'

import ConvertNav from "./ConverterNav";
import InputBox from "../InputBox/InputBox";
import "./Converter.css";

import toggle from "../../assets/toggle.svg";
import info from "../../assets/info.svg";

// import {mockData} from "../../mockData";
import {newData} from "../../newData";


const Converter = () => {
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState(["EUR", 1]);
  const [toCurrency, setToCurrency] = useState(["EUR", 1]);

  const [amount, setAmount] = useState(0);
  const [amountError, setAmountError] = useState("");

  const [showFromInput, setShowFromInput] = useState(false);
  const [showToInput, setShowToInput] = useState(false);


  useEffect(() => {
    axios.get("https://api.exchangerate.host/latest")
      .then((res) => {
        let tempData = []
        Object.entries(res.data.rates).map(value => tempData.push(value));
        setAllCurrencies([...tempData]);
      })
      .catch(e => console.log(e))
  }, [])


  // useEffect(() => {
  //   setAllCurrencies([...mockData])
  // }, [])

  const onToggleClick = () => {
    let toTemp = [...toCurrency]
    let fromTemp = [...fromCurrency]

    setFromCurrency([...toTemp]);
    setToCurrency([...fromTemp])

    convertCurrency(toTemp, fromTemp)
  }

  const convertCurrency = (fromCurrency, toCurrency) => {
    return true;
  }

  const onSetAmount = (value) => {
    setAmount(value)
    if (!Number(value)) {
      setAmountError("Please enter a valid amount")
    } else  {
      setAmountError("")
    }
  }

  const onSetShowFromInput = () => {
    setShowFromInput(true)
    setShowToInput(false)
  }

  const onSetShowToInput = () => {
    setShowFromInput(false)
    setShowToInput(true)
  }

  const closeFromDropDown = () => {
    setShowFromInput(false)
  }

  const closeToDropDown = () => {
    setShowToInput(false)
  }

  return (
    <div className="converter">
      <ConvertNav />

      <div className="converter__action">
        <div className="converter__amount">
          <h3 className="amount__header">Amount</h3>
          <p>{getSymbolFromCurrency(fromCurrency[0])}</p>

          <input
            type="number"
            value={amount}
            onChange={(e) => onSetAmount(e.target.value)} 
          />
          <span className="amount-error">{amountError}</span>
        </div>
        
        <InputBox 
          type="From"
          allCurrencies={allCurrencies}
          currency={fromCurrency}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          showInput={showFromInput}
          newData={newData}
          setCurrency={setFromCurrency}
          handleShowInput={onSetShowFromInput}
          closeDropDown={closeFromDropDown}
        />
        
        <div className="converter__toggle" onClick={onToggleClick}>
          <img
            alt=""
            src={toggle} 
            height="20"
            width="20"
          />
        </div>

        <InputBox 
          type="To" 
          allCurrencies={allCurrencies}
          currency={toCurrency}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          showInput={showToInput}
          newData={newData}
          setCurrency={setToCurrency}
          handleShowInput={onSetShowToInput}
          closeDropDown={closeToDropDown}
        />
      </div>

      <div className="converter__pair-details">
        <p className="pair-details--from">
          {amount} {newData[fromCurrency[0]] ? newData[fromCurrency[0]]["currencyName"] : fromCurrency[0]}=
        </p>
        <p className="pair-details--to">
          {(amount*(toCurrency[1]/fromCurrency[1])).toFixed(5)} 
          &#160; {newData[toCurrency[0]] ? newData[toCurrency[0]]["currencyName"] : toCurrency[0]}
        </p>

        <p className="pair-details--other">
          1 {fromCurrency[0]} = {(toCurrency[1]/fromCurrency[1]).toFixed(5)} {toCurrency[0]}
        </p>
        <p className="pair-details--other">
          1 {toCurrency[0]} = {(fromCurrency[1]/toCurrency[1]).toFixed(5)} {fromCurrency[0]}
        </p>
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
        <button>Convert</button>
      </div>
    </div>
  )
}

export default Converter;