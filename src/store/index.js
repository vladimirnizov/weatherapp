import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const axios = require('axios');

export default new Vuex.Store({
	state: () => ({
		favorites : [],
		cityKey: '215854',
		cityTitle: 'Tel Aviv',
		fahrenheit: false,
		forecasts: [],
		city: {},
		weatherIcon: '01'
    }),
	mutations: {
		currentCity( state, value ) {
			state.weatherIcon = value.WeatherIcon > 9 ? value.WeatherIcon : `0${value.WeatherIcon}`;
            state.city = value;			
		},
		setCity ( state, value ) {
			state.cityKey = value.key
			state.cityTitle = value.title
		},
		setForecasts ( state, value ) {
			state.forecasts = value			
		},
		addFavorite ( state, value ) {
			state.favorites.push(value)			
		},
		removeFavorite ( state, value ) {
			state.favorites = state.favorites.filter(city => city.id !== value)			
		},
		setFahrenheit ( state, value ) {
			state.fahrenheit = value			
		},
	},
	actions: {
		async fetch ({ commit, state, dispatch }) {
			const { data } = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${state.cityKey}`, {
				params: {
					apikey: process.env.API_KEY,
				}
			})

			dispatch('forecasts')			
			commit('currentCity', data[0])			
		},
		async forecasts ({ commit, state }) {
			const forecasts = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${state.cityKey}`, {
				params: {
					apikey: process.env.API_KEY,
					metric: ! state.fahrenheit
				}
			})

			commit('setForecasts', forecasts.data.DailyForecasts)

		},
		changeCity ({ dispatch, commit }, payload) {
			commit('setCity', payload)
			dispatch('fetch')
		}
	}
})
