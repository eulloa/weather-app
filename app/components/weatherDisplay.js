import React from 'react';

const WeatherDisplay = (props) => {
	return (
		<div className="weatherDisplayer">
			{props.children}
		</div>
	);
}

export default WeatherDisplay;