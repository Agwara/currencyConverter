import React from "react";

import Converter from "../Converter/Converter";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-background"></div>

      <div className="hero__text-container">
        <h1 className="hero__header">Xe Currency Converter</h1>
        <p className="hero__header--description">Check live mid-market exchange rates</p>
      </div>

      <div className="hero-converter">
        <Converter />
      </div>
    </div>
  )
}

export default Hero;