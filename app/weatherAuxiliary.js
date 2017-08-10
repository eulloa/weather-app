const WeatherAuxiliary = {

	getWeatherIcon(icon) {
		return "http://openweathermap.org/img/w/" + icon + ".png";
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