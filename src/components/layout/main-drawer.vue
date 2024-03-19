<script lang="ts" setup>
import DrawerForm from '../drawer/drawer-form.vue';

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
		@update:model-value="emit('update:modelValue', $event)"
	>
		<drawer-form />
	</v-navigation-drawer>
</template>
