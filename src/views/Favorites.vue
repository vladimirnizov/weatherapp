<template lang="pug">
	v-container
		v-row
			v-col
				h1.text-center(v-if="! favorites.length") No locations added.
				h2.text-center(v-else) Favorites
				.favorites.mx-2.my-2(justify='center')
					div(v-for="item in favorites")
						v-card.mx-1.my-2(@click="chooseCity(item)" click style='min-height: 175px; cursor: pointer;')
							v-list-item
								v-list-item-content
									v-list-item-title.headline {{ item.cityTitle }}
									v-list-item-subtitle {{ item.temperature }}
							v-card-text
								v-row(align='center')
									v-col 
										h2 {{ item.weatherText }}
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	computed: {
		...mapState(['favorites'])
	},
	methods: {
		...mapActions(['changeCity']),

		chooseCity(item) {
			this.changeCity({
				key: item.id,
				title: item.cityTitle
			})

			this.$router.push({ name: "Weather" })
		}
	},
}
</script>

<style lang="scss">
	.favorites {
		display: grid;
		grid-template-columns: 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%;

		@include xl-down {
			grid-template-columns: 20% 20% 20% 20% 20%;
			row-gap: 10px;
		}
		@include md-down {
			grid-template-columns: 25% 25% 25% 25%;
			row-gap: 10px;
		}

		@include sm-down {
            grid-template-columns: 50% 50%;
			row-gap: 10px;
        }
	}
</style>