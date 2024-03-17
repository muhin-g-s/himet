<script setup lang="ts">
import { ref } from 'vue';

import homeFilter from '@/components/home/home-filter.vue';

import { INoteFilter } from '@/components/home/home.types';

const filter = ref<INoteFilter>({ date: null });

function onFilterChanged(newFilter: INoteFilter): void {
	filter.value = newFilter;
}
</script>

<template>
	<home-filter
		:date="filter.date"
		@change="onFilterChanged"
	/>
</template>
