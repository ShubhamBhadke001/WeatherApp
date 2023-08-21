import axios from "axios";
import React, { useState } from "react";

const Home = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=811f6e90b09e04dd7d891add3d20f665`;

  const fetchData = (event) => {
    if (event.key === "Enter") {
      axios
        .get(url)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
      setLocation("");
    }
  };

  return (
    <div className="container">
      <h2>Weather App</h2>
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location"
          onKeyPress={fetchData}
        />
      </div>
      {typeof data.main !== "undefined" ? (
        <div className="card">
          <div className="country">{data.sys.country}</div>
          <div className="name">{data.name}</div>
          <div className="img"></div>
          <div className="temp">
            {data.main.temp} &deg; c
            <img
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
              alt="icon"
            />
          </div>
          <div className="main">{data.weather[0].main}</div>
          <div className="desc">{data.weather[0].description}</div>
          <div className="details">
            <div className="in">
              <span>{data.visibility} m</span>
              <label>Visibility</label>
            </div>
            <div className="in">
              <span>{data.main.humidity}%</span>
              <label>Hummidity</label>
            </div>
            <div className="in">
              <span>{data.wind.speed} k/h</span>
              <label>Wind speed</label>
            </div>
          </div>
        </div>
      ) : (
        <div className="err">Data Not Found!</div>
      )}
    </div>
  );
};

export default Home;
