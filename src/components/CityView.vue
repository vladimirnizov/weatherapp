<template lang="pug">
	v-card.mx-auto.mt-5
		.d-flex
			v-img.mt-2(v-if="weatherIcon" :src="`https://developer.accuweather.com/sites/default/files/${weatherIcon}-s.png`" alt='image' width="200px")
			v-list-item
				v-list-item-content
					v-list-item-title.headline(v-if="city") {{ city.WeatherText }}
					v-list-item-subtitle {{ new Date() | moment("dddd, h:mm a") }}
					h2.mt-2 {{ temperature }}
					v-switch.ml-3(label="fahrenheit" v-model="fahrenheit" style="height: 25px")

			v-card-actions
				v-btn(@click="favoriteToogle" :class="{ favorite }" text)
					span
						v-icon mdi-heart
		v-card-text
			v-row(align='center')
				v-col.display-2.text-center.mb-5(cols='12') {{ cityTitle }}
		v-divider
		.grid.mx-2.my-2(justify='center')
			div(v-for="item in forecasts")
				v-card.mx-1.my-2(style='min-height: 175px;')
					v-list-item
						v-list-item-content
							v-list-item-title.headline {{ item.Date | moment("dddd") }}
							v-list-item-subtitle {{ item.Day.IconPhrase }}
					v-card-text
						v-row(align='center')
							v-col 
								h2 {{ item.Temperature.Minimum.Value }} - {{ item.Temperature.Maximum.Value }}° {{ item.Temperature.Minimum.Unit }} 
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
	data: () => ({
		fahrenheit: false,
		icons: ['Sunny','Mostly Sunny','Partly Sunny','Intermittent Clouds',]
	}),
	computed: {
		...mapState(['city', 'cityTitle', 'forecasts', 'favorites', 'cityKey', 'weatherIcon']),

		temperature() {
			if ( ! this._.isEmpty(this.city) ) {
				const temperature = this.city.Temperature

				if ( this.fahrenheit ) {
					return `${temperature.Imperial.Value}° ${temperature.Imperial.Unit}`
				}

				return `${temperature.Metric.Value}° ${temperature.Metric.Unit}`;
			}

			return ''
		},
		favorite() {
			return this._.findIndex(this.favorites, ['id', this.cityKey]) !== -1
		}
	},
	watch: {
		fahrenheit (val) {
			this.setFahrenheit(val)
			this.updateForecast()
		}
	},
	beforeMount() {
		if (this._.isEmpty(this.city)) {
			this.getCity()
		}
	},
	methods: {
		...mapActions({ getCity: 'fetch', updateForecast: 'forecasts' }),
		...mapMutations(['addFavorite', 'removeFavorite', 'setFahrenheit']),

		favoriteToogle() {
			if (this.favorite) {
				this.removeFavorite(this.cityKey)
			}
			else {
				this.addFavorite({
					id: this.cityKey,
					cityTitle: this.cityTitle,
					temperature: this.temperature,
					weatherText: this.city.WeatherText
				})
			}
		}
	},

}
</script>

<style lang="scss">
	.favorite span {
		color: rgb(29, 111, 204)
	}
	.grid {
		display: grid;
		grid-template-columns: 20% 20% 20% 20% 20%;

		@include md-down {
			grid-template-columns: 50% 50%;
			row-gap: 10px;
		}

		@include sm-down {
            grid-template-columns: 100%;
			row-gap: 10px;
        }
	}
</style>