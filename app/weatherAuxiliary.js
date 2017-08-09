const WeatherAuxiliary = {
	
	getWeatherImage(conditions) {
		switch(conditions) {
			case '01d':
				return '/assets/img/sunny.png';
			case '01n':
				return '/assets/img/clear.png';
			case '02d':
				return '/assets/img/partly-cloudy.png';
			case '03d':
				return '/assets/img/cloudy.png';
			case '09d':
				return '/assets/img/rain.png';
			case '10d':
				return '/assets/img/drizzle.png';
			case '11d':
				return '/assets/img/thunderstorms.png';
			case '50d':
				return '/assets/img/smoke.png';	
			default:
				return '/assets/img/sunny.png';
		}
	},
	
	getDayAndTime() {
		let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		let d = new Date(),
		    dayOfWeek = daysOfWeek[d.getDay()],
		    hours = d.getHours(),
		    mins  = d.getMinutes(),
		    amOrPm = 'AM';
		
		if (hours > 12) {
			hours = hours - 12;
			amOrPm = "PM";
		} else if (hours === 0) {
			hours = 12;
		}
		
		if (mins < 10) {
			mins = "0" + mins;
		}
		 
		return dayOfWeek + " " + hours + ":" + mins + " " + amOrPm;
	},
	
	kelvinToF(temp) {
		return parseFloat(9/5 * (temp - 273) + 32).toFixed(2);
	},
	
	kelvinToC(temp) {
		return parseFloat(temp - 273).toFixed(2);
	},
	
	getDayOfWeek(ts, shouldGetFullDayOfWeek) {
		let date = new Date(ts * 1000);
		let daysOfWeek = shouldGetFullDayOfWeek ? 
			['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] : 
			['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		return daysOfWeek[date.getDay()];
	}
}

export default WeatherAuxiliary;