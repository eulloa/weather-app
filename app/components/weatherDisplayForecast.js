import React from 'react';
import PropTypes from 'prop-types';

import WeatherAuxiliary from '../util/weatherAuxiliary';

const WeatherDisplayForecast = props => {
    const { onClick, shouldHideC, shouldHideF, weather } = props;

    return (
        <div className="forecastContainer">
            {
                weather.map((data, i) => {
                    return (
                        <div className="weatherDisplayer" key={i} onClick={() => onClick(data)}>
                            <h1>{WeatherAuxiliary.getDayOfWeek(data.dt, false)}</h1>
                            <section>
                                <img src={WeatherAuxiliary.getWeatherIcon(data.weather[0].icon)} alt={data.weather[0].description} />
                                <span className={shouldHideF ? 'hidden' : ''}>
                                    {Math.round(WeatherAuxiliary.kelvinToF(data.main.temp_max)) + ' ' + Math.round(WeatherAuxiliary.kelvinToF(data.main.temp_min))}
                                </span>
                                <span className={shouldHideC ? 'hidden' : ''}>
                                    {Math.round(WeatherAuxiliary.kelvinToC(data.main.temp_max)) + ' ' + Math.round(WeatherAuxiliary.kelvinToC(data.main.temp_min))}
                                </span>
                            </section>
                        </div>
                    );
                })
            }
        </div>
    );
}

WeatherDisplayForecast.propTypes = {
    onClick: PropTypes.func.isRequired,
    shouldHideC: PropTypes.bool.isRequired,
    shouldHideF: PropTypes.bool.isRequired,
    weather: PropTypes.array.isRequired
}

export default WeatherDisplayForecast;