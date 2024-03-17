<!-- eslint-disable filenames/match-regex -->
<script setup lang="ts">
import UiLoader from '@/components/ui/ui-loader.vue';

import { useSystemStore } from './stores';

const systemStore = useSystemStore();
</script>

<template>
	<v-app>
		<router-view />
		<ui-loader :loading="systemStore.isLoading" />
	</v-app>
</template>
