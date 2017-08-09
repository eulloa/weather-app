import React from 'react';

//components
import WeatherDiplay from './WeatherDisplay';
import Input from './input';

//deps
import axios from 'axios';

//transitions
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const apiKey = '87ad902d24be999eed791156678a3ec7';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city: '',
			childData: {},
			isQuerySubmitted: false,
			submitValue: '',
			shouldHideF: false,
			shouldHideC: true,
			shouldUpdateMainDisplay: false,
			weather: []
		};

		this.handleUpdateMainSection = this.handleUpdateMainSection.bind(this)
		this.handleOnClick = this.handleOnClick.bind(this)
		this.handleOnChange = this.handleOnChange.bind(this)
		this.handleGoBack = this.handleGoBack.bind(this)
		this.handleClickTemperature = this.handleClickTemperature.bind(this)
		this.handleKeyPress = this.handleKeyPress.bind(this)
		this.downloadWeather = this.downloadWeather.bind(this)
	}
	
	render() {
        return (
			<section>
				<Input initialInputValue={this.state.submitValue} onClick={this.handleOnClick} onChange={this.handleOnChange} onKeyPress={this.handleKeyPress} />
				<section className="weatherWidget">
					<div className="mainSection">
						<WeatherDiplay>
							<h3>Weather Display!</h3>
						</WeatherDiplay>
						{/* <div className="forecastContainer">
							{props.weather.map((data, i) => {
								return <WeatherDisplay
									key={i}
									onClick={props.handleUpdateMainSection}
									onClickTemperature={props.handleClickTemperature}
									imgSrc={WeatherAuxiliary.getWeatherImage(data.weather[0].icon)}
									weatherDescription={data.weather[0].description}
									dayOfWeek={WeatherAuxiliary.getDayOfWeek(data.dt, false)}
									fullDayOfWeek={WeatherAuxiliary.getDayOfWeek(data.dt, true)}
									city={props.city}
									timeInfo={WeatherAuxiliary.getDayAndTime()}
									tempFahrenheit={Math.round(WeatherAuxiliary.kelvinToF(data.temp.max))}
									tempCelcius={Math.round(WeatherAuxiliary.kelvinToC(data.temp.max))}
									shouldHideF={props.shouldHideF}
									shouldHideC={props.shouldHideC}
									tempFahrenheightHigh={Math.round(WeatherAuxiliary.kelvinToF(data.temp.max))}
									tempFahrenheightLow={Math.round(WeatherAuxiliary.kelvinToF(data.temp.min))}
									tempCelciusHigh={Math.round(WeatherAuxiliary.kelvinToC(data.temp.max))}
									tempCelciusLow={Math.round(WeatherAuxiliary.kelvinToC(data.temp.max))} />
							})}
						</div> */}
					</div>
				</section>
			</section>
        )
    }
	
	handleUpdateMainSection = (data) => {
		this.setState({
			shouldUpdateMainDisplay: true,
			childData: data
		});
	}
	
	handleOnClick = () => {
		if (this.state.submitValue) {
			this.downloadWeather(this.state.submitValue, apiKey);
		} else {
			alert('empty!');
			return;
		}
		
		this.setState({
			submitValue: '',
			isQuerySubmitted: true
		});
	}
	
	handleOnChange = (e) => {
		this.setState({
			submitValue: e.target.value
		});
	}
	
	handleGoBack = () => {
		this.setState({
			isQuerySubmitted: false,
			submitValue: ''
		});
	}
	
	handleClickTemperature = () => {
		this.setState({
			shouldHideF: !this.state.shouldHideF,
			shouldHideC: !this.state.shouldHideC
		});
	}
	
	handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			this.handleOnClick();
		}
	}
		
	downloadWeather(city, apiKey) {
		axios.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&APPID=' + apiKey)
			.then((res) => {
				console.log(res)
				this.setState({
					city: res.data.city.name,
					weather: res.data.list.slice(0, 5)
				})
			}).catch((e) => {
				console.log(e)
			})
	}
}

export default App;