import React, {useState, useEffect} from "react";
import CurrencyFlag from 'react-currency-flags';

import "./InputBox.css";
import cross from "../../assets/cross.svg";
import arrow from "../../assets/arrow.svg";

const InputBox = (props) => {
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    setFilteredItems([...props.allCurrencies])
  }, [props.allCurrencies])


  const filterCurrency = (text) => {
    let temp = props.allCurrencies.filter((item) => item[0].toLowerCase().includes(text.toLowerCase()) || 
      item[1].currencyName.toLowerCase().includes(text.toLowerCase())
    )
    setFilteredItems([...temp])
  }

  const onItemClick = (value) => {
    props.setShowInput(false)
    props.setCurrency(value)

    if (props.type === "From") {
      console.log(value.id);
      props.convertCurrencies(value.id, props.toCurrency.id);
    } else {
      props.convertCurrencies(props.fromCurrency.id, value.id);
    }
  }

  return (
    <div className="inputbox">
      {
        props.showInput === true ?
        <div className="input-container">
          <input
            type="text"
            placeholder="Type to search..."
            onChange={(e) => filterCurrency(e.target.value)}
            autoFocus={true}
          />

          <img
            alt=""
            src={cross}
            height="20"
            width="20" 
            onClick={() => props.setShowInput(false)}
          />
        </div>
          :
        <div className="inputbox__currency-details" onClick={() => {
          props.handleShowInput()
          filterCurrency("")
        }}>
          <CurrencyFlag currency={props.currency.id ? props.currency.id : "GBP"} size="md" />
          <p>{props.currency.id} - {props.currency.currencyName}</p>
          <img
            alt=""
            src={arrow}
            height="15"
            width="15" 
            onClick={() => props.setShowInput(false)}
          />
        </div>
      }

      {
        props.showInput === true ? 
        <div className="inputbox-dropdown">
          {
            filteredItems.length > 0 ? 
              filteredItems.map((value, key) => (
                <div 
                  className="dropdown--items" 
                  key={`${key}`} 
                  // onClick={() => {
                  //   props.setShowInput(false)
                  //   props.setCurrency({...value[1]})}
                  // }
                  onClick={() => onItemClick({...value[1]})}
                >
                  <CurrencyFlag currency={value[1].id} size="md" />
                <p>{value[0]} - {value[1].currencyName}</p>
                </div>
              )) : <div></div>
          }
        </div> : <div></div> 
      }

      {
        !filteredItems.length > 0 ? <div className="no-results">No results avalaible</div>: <div></div>
      }
    </div>
  )
}

export default InputBox;