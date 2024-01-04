import React from 'react';
import PropTypes from 'prop-types';
import WeatherAuxiliary from '../util/weatherAuxiliary';

const WeatherDisplayMain = (props) => {
	const { city, onClick, shouldHideC, shouldHideF, shouldUpdateMainDisplay, weather } = props;

	return (
		<div className="mainSection">
			<div className="weatherDisplayer">
				<h1>{city}</h1>
				<h2>
					{
						props.shouldUpdateMainDisplay ?
						WeatherAuxiliary.getDayOfWeek(props.updateData.dt, true) :
						WeatherAuxiliary.getDayAndTime()
					}
				</h2>
				<h3>
					{
						shouldUpdateMainDisplay ? 
						props.updateData.weather[0].description :
						weather[0].weather[0].description
					}
				</h3>
				<section>
					<img src={shouldUpdateMainDisplay ? WeatherAuxiliary.getWeatherIcon(props.updateData.weather[0].icon) : WeatherAuxiliary.getWeatherIcon(weather[0].weather[0].icon)} alt={weather[0].weather[0].description} />
					<div>
						<span className={shouldHideF ? 'hidden' : ''}>
							{Math.round(WeatherAuxiliary.kelvinToF(weather[0].main.temp_max))}
						</span>
						<span className={shouldHideC ? 'hidden' : ''}>
							{Math.round(WeatherAuxiliary.kelvinToC(weather[0].main.temp_max))}
						</span>
						<button className={shouldHideF ? '' : 'inactive'} onClick={onClick}>F</button>
						<button className={shouldHideC ? '' : 'inactive'} onClick={onClick}>C</button>
					</div>
				</section>
			</div>
		</div>
	);
}

WeatherDisplayMain.propTypes = {
	city: 							PropTypes.string.isRequired,
	onClick: 						PropTypes.func.isRequired,
	shouldHideC: 					PropTypes.bool.isRequired,
	shouldHideF: 					PropTypes.bool.isRequired,
	shouldUpdateMainDisplay: 	PropTypes.bool.isRequired,
	updateData: 					PropTypes.object.isRequired,
	weather: 						PropTypes.array.isRequired
};

export default WeatherDisplayMain;