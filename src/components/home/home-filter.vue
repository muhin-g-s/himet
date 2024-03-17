<script lang="ts" setup>
import { INoteFilter } from './home.types';

const props = defineProps<INoteFilter>();

const emit = defineEmits<{
	(event: 'change', value: INoteFilter): void;
}>();
</script>

<template>
	<v-responsive
		class="mx-auto mt-4"
		max-width="344"
	>
		<v-text-field
			:model-value="props.date"
			hide-details="auto"
			label="Search by date"
			clearable
			type="date"
			@update:model-value="emit('change', { date: $event })"
		/>
	</v-responsive>
</template>
