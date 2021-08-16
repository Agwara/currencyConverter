import React from "react";

import "./Converter.css";
import bell from "../../assets/bell.svg";
import chart from "../../assets/chart.svg";
import coin from "../../assets/coin.svg";
import send from "../../assets/send.svg";

const ConverterNav = () => {
  return (
    <ul className="converter__nav">
      <li>
        <img 
          alt=""
          src={coin}
          height="35"
          width="35"
        />
        <p className="convert__nav--active">Convert</p>
      </li>
      <li className="notActiveNav">
        <img 
          alt=""
          src={send}
          height="35"
          width="35"
        />
        <p className="convert__nav--notActive">Send</p>
      </li>
      <li className="notActiveNav">
        <img 
          alt=""
          src={chart}
          height="35"
          width="35"
        />
        <p className="convert__nav--notActive">Charts</p>
      </li>
      <li className="notActiveNav">
        <img 
          alt=""
          src={bell}
          height="35"
          width="35"
        />
        <p className="convert__nav--notActive">Alerts</p>
      </li>
    </ul>
  )
}

export default ConverterNav;