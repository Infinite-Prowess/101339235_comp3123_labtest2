import React, {useState, useEffect} from 'react';
import './App.css';
import {getData as fetchData} from './WeatherForecastAPI.js';
import {ScaleLoader} from 'react-spinners';

function App() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState('Toronto');
  const [buffer, setBuffer] = useState(false);

  const getData = async () => {
    try{
        setBuffer(true);
        const data = await fetchData(city);
        setData(data);
        setBuffer(false);
    }catch(error) {
      console.log(error.message);
      setBuffer(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      <div className="card">
        <h1>Weather <i className="fa fa-cloud-sun"></i> Forecast</h1>
        <div className="searchBox">
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter City Name"/>
          <button type="button" onClick={() => getData()}>Search</button>
        </div>
        {buffer ? (
            <ScaleLoader/>
        ) : (
          <>
          {data !== null ? (
          <div>
              <h3><i className="fa fa-street-view"></i> {data.name} | {data.sys.country}</h3>
              <h3><img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="imgicon"/>
            {data.weather[0].main}</h3>
              <h1>{parseFloat(data.main.temp - 273.15).toFixed(1)}&deg;C</h1>        
              <h4>Min: {parseFloat(data.main.temp_min - 273.15).toFixed(1)}&deg;C | Max: 
              {parseFloat(data.main.temp_max - 273.15).toFixed(1)}&deg;C | Humidity: 
              {data.main.humidity}%</h4>
        </div>
        ) : null}
          </>
        ) }       
      </div>
    </div>
  );
}

export default App;