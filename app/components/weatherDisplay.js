import React from 'react';

function MainWeatherDisplayer(props) {
	return (
		<div className="weatherDisplayer">
			{props.children}
		</div>
	);
}

export default MainWeatherDisplayer;