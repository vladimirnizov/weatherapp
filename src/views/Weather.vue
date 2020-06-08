<template lang="pug">
	#weather
		v-container
			v-row(justify="center")
				v-col(cols='12' md='6')
					search
			v-row
				v-col
					city-view
			
</template>

<script>
import Search   from '@/components/Search';
import CityView from '@/components/CityView';

export default {
	components: {
		Search,
		CityView
	}
}
</script>
