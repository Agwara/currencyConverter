import React, {useState} from "react";
import CurrencyFlag from 'react-currency-flags';

import "./InputBox.css";
import cross from "../../assets/cross.svg";
import arrow from "../../assets/arrow.svg";

const InputBox = (props) => {
  const [filterText, setFilterText] = useState("");

  return (
    <div className="inputbox">
      {
        props.showInput ?
        <div className="input-container">
          <input
            type="text"
            placeholder="Type to search..."
            value={filterText}
            autoFocus={true}
            onChange={(e) => setFilterText(e.target.value)}
          />

          <img
            alt=""
            src={cross}
            height="20"
            width="20" 
            onClick={() => props.closeDropDown()}
          />
        </div>
          :
        <div className="inputbox__currency-details" onClick={() => {
          props.handleShowInput()
        }}>
          <CurrencyFlag currency={props.currency.length > 0 ? props.currency[0] : "EUR"} size="md" />
          <p>{props.currency[0]} - {props.newData[props.currency[0]] ? props.newData[props.currency[0]]["currencyName"] : "Unknown"}</p>
          <img
            alt=""
            src={arrow}
            height="15"
            width="15" 
          />
        </div>
      }

      {
        props.showInput ? 
        <div className="inputbox-dropdown">
          {
            props.allCurrencies.filter((item) => item[0].toLowerCase().includes(filterText.toLowerCase()))
              .map((value, key) => (
              <div 
                className="dropdown--items" 
                key={`${key}`} 
                onClick={() => {
                  props.setCurrency([value[0], value[1]])
                  setFilterText("")
                  props.closeDropDown()
                }}
              >
                <CurrencyFlag currency={value[0]} size="md" />
                <p>{value[0]} - {props.newData[value[0]] ? props.newData[value[0]]["currencyName"] : "Unknown"}</p>
              </div>
            ))
          }
        </div> : <div></div> 
      }

      {/* {
        !filteredItems.length > 0 ? <div className="no-results">No results avalaible</div>: <div></div>
      } */}
    </div>
  )
}

export default InputBox;