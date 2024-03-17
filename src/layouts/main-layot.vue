<script setup lang="ts">
import { ref } from 'vue';

import MainHeader from '@/components/layout/main-header.vue';
import MainDrawer from '@/components/layout/main-drawer.vue';

const isOpenDrawer = ref(false);

function changeStateDrawer() {
	isOpenDrawer.value = !isOpenDrawer.value;
}
</script>
<template>
	<v-layout>
		<main-header @change="changeStateDrawer" />
		<main-drawer v-model="isOpenDrawer" />
		<v-main class="h-100">
			<router-view />
		</v-main>
	</v-layout>
</template>
