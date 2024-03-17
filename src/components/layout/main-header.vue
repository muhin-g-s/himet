<script lang="ts" setup>
import { mdiPlus } from '@mdi/js';

const emit = defineEmits<{
	(event: 'change'): void;
}>();
</script>

<template>
	<v-app-bar density="compact">
		<v-toolbar-title>Note</v-toolbar-title>

		<v-spacer />

		<v-btn icon>
			<v-icon
				:icon="mdiPlus"
				@click="emit('change')"
			/>
		</v-btn>
	</v-app-bar>
</template>
