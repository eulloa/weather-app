import React from 'react';

//components
import WeatherDisplay from './WeatherDisplay';
import Input from './input';

//deps
import axios from 'axios';
import WeatherAuxiliary from '../weatherAuxiliary';

//animation
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const apiKey = '87ad902d24be999eed791156678a3ec7';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city: '',
			updateData: {},
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
			<section className="weatherWidget">
				<Input initialInputValue={this.state.submitValue} onClick={this.handleOnClick} onChange={this.handleOnChange} onKeyPress={this.handleKeyPress} />
				{
					this.state.weather.length > 0 && (
						<ReactCSSTransitionGroup transitionName="anim" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={false} transitionLeave={false}>
							<section className="forecast">
								<div className="mainSection">
									<WeatherDisplay>
										<h1>{this.state.city}</h1>
										<h2>
											{
												this.state.shouldUpdateMainDisplay ?
												WeatherAuxiliary.getDayOfWeek(this.state.updateData.dt, true) :
												WeatherAuxiliary.getDayAndTime()
											}
										</h2>
										<h3>
											{
												this.state.shouldUpdateMainDisplay ? 
												this.state.updateData.weather[0].description :
												this.state.weather[0].weather[0].description
											}
										</h3>
										<section>
											<img src={WeatherAuxiliary.getWeatherImage(this.state.weather[0].weather[0].icon)} alt={this.state.weather[0].weather[0].description} />
											<div>
												<span className={this.state.shouldHideF ? 'hidden' : ''}>
													{
														this.state.shouldUpdateMainDisplay ?
														Math.round(WeatherAuxiliary.kelvinToF(this.state.updateData.temp.max)) :
														Math.round(WeatherAuxiliary.kelvinToF(this.state.weather[0].temp.max))
													}
												</span>
												<span className={this.state.shouldHideC ? 'hidden' : ''}>
													{
														this.state.shouldUpdateMainDisplay ?
														Math.round(WeatherAuxiliary.kelvinToC(this.state.updateData.temp.max)) :
														Math.round(WeatherAuxiliary.kelvinToC(this.state.weather[0].temp.max))
													}
												</span>
												<button className={this.state.shouldHideF ? '' : 'inactive'} onClick={this.handleClickTemperature}>F</button>
												<button className={this.state.shouldHideC ? '' : 'inactive'} onClick={this.handleClickTemperature}>C</button>
											</div>
										</section>
									</WeatherDisplay>
								</div>
								<div className="forecastContainer">
									{this.state.weather.map((data, i) => {
										return <WeatherDisplay key={i}>
													<div onClick={() => {this.handleUpdateMainSection(data)}}>
														<h1>{WeatherAuxiliary.getDayOfWeek(data.dt, false)}</h1>
														<section>
															<img src={WeatherAuxiliary.getWeatherImage(data.weather[0].icon)} alt={data.weather[0].description} />
															<span className={this.state.shouldHideF ? 'hidden' : ''}>
																{Math.round(WeatherAuxiliary.kelvinToF(data.temp.max)) + ' ' + Math.round(WeatherAuxiliary.kelvinToF(data.temp.min))}
															</span>
															<span className={this.state.shouldHideC ? 'hidden' : ''}>
																{Math.round(WeatherAuxiliary.kelvinToC(data.temp.max)) + ' ' + Math.round(WeatherAuxiliary.kelvinToC(data.temp.min))}
															</span>
														</section>
													</div>
												</WeatherDisplay>
									})}
								</div>
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