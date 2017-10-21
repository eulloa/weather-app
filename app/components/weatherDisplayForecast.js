import React from 'react';
import PropTypes from 'prop-types';

import WeatherAuxiliary from '../util/weatherAuxiliary';

const WeatherDisplayForecast = props => {
    return (
        <div className="forecastContainer">
            {
                props.weather.map((data, i) => {
                    return (
                        <div className="weatherDisplayer" key={i} onClick={() => props.onClick(data)}>
                            <h1>{WeatherAuxiliary.getDayOfWeek(data.dt, false)}</h1>
                            <section>
                                <img src={WeatherAuxiliary.getWeatherIcon(data.weather[0].icon)} alt={data.weather[0].description} />
                                <span className={props.shouldHideF ? 'hidden' : ''}>
                                    {Math.round(WeatherAuxiliary.kelvinToF(data.temp.max)) + ' ' + Math.round(WeatherAuxiliary.kelvinToF(data.temp.min))}
                                </span>
                                <span className={props.shouldHideC ? 'hidden' : ''}>
                                    {Math.round(WeatherAuxiliary.kelvinToC(data.temp.max)) + ' ' + Math.round(WeatherAuxiliary.kelvinToC(data.temp.min))}
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