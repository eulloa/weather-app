import React from 'react';

//components
import WeatherDisplayMain from './weatherDisplayMain';
import WeatherDisplayForecast from './weatherDisplayForecast'
import Input from './input';
import Spinner from './spinner';
import Error from './error';

//deps
import axios from 'axios';

//animation
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const apiKey = APP_CONFIG.apiKey;

class App extends React.Component {
	state = {
		city: '',
		hasError: false,
		errorText: '',
		isQuerySubmitted: false,
		loading: false,
		shouldHideF: false,
		shouldHideC: true,
		shouldUpdateMainDisplay: false,
		submitValue: '',
		updateData: {},
		weather: []
	};
	
	render() {
        return (
			<section className="weatherWidget">
				<Input initialInputValue={this.state.submitValue} onClick={this.handleOnClick} onChange={this.handleOnChange} onKeyPress={this.handleKeyPress} />
				{ this.state.loading && <Spinner /> }
				{ this.state.hasError && <Error text={this.state.errorText} /> }
				{
					this.state.weather.length > 0 && (
						<ReactCSSTransitionGroup transitionName="anim" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={false} transitionLeave={false}>
							<section className="forecast">
								<WeatherDisplayMain
									city={this.state.city}
									onClick={this.handleClickTemperature}
									shouldHideC={this.state.shouldHideC}
									shouldHideF={this.state.shouldHideF}
									shouldUpdateMainDisplay={this.state.shouldUpdateMainDisplay}
									updateData={this.state.updateData}
									weather={this.state.weather}
								/>
								<WeatherDisplayForecast
									onClick={this.handleUpdateMainSection}
									shouldHideC={this.state.shouldHideC}
									shouldHideF={this.state.shouldHideF}
									weather={this.state.weather}
								/>
							</section>
						</ReactCSSTransitionGroup>
					)
				}
			</section>
        )
	}
	
	handleUpdateMainSection = (data) => {
		this.setState({
			shouldUpdateMainDisplay: true,
			updateData: data
		});
	}
	
	handleOnClick = () => {
		if (this.state.submitValue) {
			this.downloadWeather(this.state.submitValue, apiKey);
		} else {
			this.setState({
				hasError: true,
				errorText: 'Please enter a city name, zip code, state or country!',
				weather: []
			})
			return;
		}
		
		this.setState({
			submitValue: '',
			isQuerySubmitted: true,
			loading: true
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
		axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&APPID=${apiKey}`)
			.then((res) => {
				this.setState({
					city: res.data.city.name,
					errorText: '',
					hasError: false,
					loading: false,
					weather: res.data.list.slice(0, 5),
				})
			})
			.catch((e) => {
				this.setState({
					errorText: 'Error retrieving data, please try again!',
					hasError: true,
					loading: false,
					weather: []
				})
			});
	}
}

export default App;