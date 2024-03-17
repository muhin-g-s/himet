<script lang="ts" setup>
interface IMainDrawerProps {
	modelValue: boolean;
}

const props = defineProps<IMainDrawerProps>();

const emit = defineEmits<{
	(event: 'update:modelValue', value: boolean): void;
}>();
</script>

<template>
	<v-navigation-drawer
		:model-value="props.modelValue"
		temporary
		width="content"
		@update:model-value="emit('update:modelValue', $event)"
	>
		test
	</v-navigation-drawer>
</template>
