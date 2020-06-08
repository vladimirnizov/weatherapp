<template lang="pug">
	#navbar
		v-navigation-drawer(v-model="drawer" app)
			v-list
				v-list-item(v-for="(item, i) in items" :key="i" :to="item.to")
					v-list-item-action
						v-icon {{ item.icon }}
					v-list-item-content
						v-list-item-title(v-text="item.title")
		v-app-bar(app)
			v-app-bar-nav-icon(@click="drawer = !drawer")
			v-toolbar-title {{ title }}
			v-spacer
			v-switch(label="Dark Theme" v-model="$vuetify.theme.dark" style="height: 25px")
</template>

<script>
export default {
	data: () => ({
		drawer: false,
		items: [
			{
				icon: 'mdi-weather-partly-cloudy',
				title: 'Weather',
				to: '/'
			},
			{
				icon: 'mdi-star',
				title: 'Favorites',
				to: '/favorites'
			}
		],
		title: 'Herolo weather'
	})
};
</script>