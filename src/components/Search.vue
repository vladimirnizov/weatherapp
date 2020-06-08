<template lang="pug">
	.d-flex
		v-autocomplete(
			v-model="model" 
			:items="items" 
			:loading="isLoading" 
			:search-input.sync="search" 
			solo 
			placeholder="Start typing to Search"
			return-object
			)        
</template>

<script>
import { mapActions } from 'vuex'
const axios = require('axios');

export default {
	data: () => ({
		entries: [],
		isLoading: false,
		model: null,
		search: null,
    }),
	computed: {
		items () {
			return this.entries.map(entry => entry.LocalizedName)
		},
	},
	watch: {
		search (q) {
			if (this.isLoading) return

			this.isLoading = true
			
			if (q) {
				axios.get('http://dataservice.accuweather.com/locations/v1/cities/autocomplete', {
					mode: 'no-cors',
					params: {
						apikey: process.env.API_KEY,
						q,
						language: 'en'
					}
				})
				.then(res => this.entries = res.data )
				.catch(err => console.error(err) )
			}	

			this.isLoading = false
		},
		model (val) {
			if (val) {
				const cityKey = this.entries.filter(entry => entry.LocalizedName == val)[0].Key
				
				if ( cityKey ) {
					this.changeCity({
						key: cityKey,
						title: val
					})
				}
			}
		}
	},
	methods: {
		...mapActions(['changeCity']),
	}, 
}
</script>