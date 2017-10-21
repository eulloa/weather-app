import React from 'react';
import PropTypes from 'prop-types';
import WeatherAuxiliary from '../util/weatherAuxiliary';

const WeatherDisplayMain = (props) => {
	return (
		<div className="mainSection">
			<div className="weatherDisplayer">
				<h1>{props.city}</h1>
				<h2>
					{
						props.shouldUpdateMainDisplay ?
						WeatherAuxiliary.getDayOfWeek(props.updateData.dt, true) :
						WeatherAuxiliary.getDayAndTime()
					}
				</h2>
				<h3>
					{
						props.shouldUpdateMainDisplay ? 
						props.updateData.weather[0].description :
						props.weather[0].weather[0].description
					}
				</h3>
				<section>
					<img src={props.shouldUpdateMainDisplay ? WeatherAuxiliary.getWeatherIcon(props.updateData.weather[0].icon) : WeatherAuxiliary.getWeatherIcon(props.weather[0].weather[0].icon)} alt={props.weather[0].weather[0].description} />
					<div>
						<span className={props.shouldHideF ? 'hidden' : ''}>
							{
								props.shouldUpdateMainDisplay ?
								Math.round(WeatherAuxiliary.kelvinToF(props.updateData.temp.max)) :
								Math.round(WeatherAuxiliary.kelvinToF(props.weather[0].temp.max))
							}
						</span>
						<span className={props.shouldHideC ? 'hidden' : ''}>
							{
								props.shouldUpdateMainDisplay ?
								Math.round(WeatherAuxiliary.kelvinToC(props.updateData.temp.max)) :
								Math.round(WeatherAuxiliary.kelvinToC(props.weather[0].temp.max))
							}
						</span>
						<button className={props.shouldHideF ? '' : 'inactive'} onClick={props.onClick}>F</button>
						<button className={props.shouldHideC ? '' : 'inactive'} onClick={props.onClick}>C</button>
					</div>
				</section>
			</div>
		</div>
	);
}

WeatherDisplayMain.propTypes = {
	city: 						PropTypes.string.isRequired,
	onClick: 					PropTypes.func.isRequired,
	shouldHideC: 				PropTypes.bool.isRequired,
	shouldHideF: 				PropTypes.bool.isRequired,
	shouldUpdateMainDisplay: 	PropTypes.bool.isRequired,
	updateData: 				PropTypes.object.isRequired,
	weather: 					PropTypes.array.isRequired
};

export default WeatherDisplayMain;