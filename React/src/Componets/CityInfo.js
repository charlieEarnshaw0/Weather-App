const CityInfo = ({ weather }) => {
  return (
    <div>
      <h2>
        Weather in {weather.location.name}, {weather.location.country}
      </h2>
      <p>
        Temperature: {weather.current.temp_c}°C ({weather.current.temp_f}
        °F)
      </p>
      <p>Condition: {weather.current.condition.text}</p>
      <img
        src={weather.current.condition.icon}
        alt={weather.current.condition.text}
      />
      <p>
        Wind: {weather.current.wind_kph} kph ({weather.current.wind_mph} mph){" "}
        {weather.current.wind_dir}
      </p>
      <p>Humidity: {weather.current.humidity}%</p>
      <p>
        Pressure: {weather.current.pressure_mb} mb (
        {weather.current.pressure_in} in)
      </p>
      <p>
        Visibility: {weather.current.vis_km} km ({weather.current.vis_miles}{" "}
        miles)
      </p>
      <p>Time: {weather.current.last_updated} </p>
    </div>
  );
};

export default CityInfo;
