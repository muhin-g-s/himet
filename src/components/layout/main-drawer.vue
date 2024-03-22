<script lang="ts" setup>
import DrawerForm from '../drawer/drawer-form.vue';

interface IMainDrawerProps {
	modelValue: boolean;
}

const props = defineProps<IMainDrawerProps>();

const emit = defineEmits<{
	(event: 'update:modelValue'): void;
}>();
</script>

<template>
	<v-navigation-drawer
		:model-value="props.modelValue"
		temporary
		@update:model-value="emit('update:modelValue')"
	>
		<drawer-form
			:is-open="props.modelValue"
			@close="emit('update:modelValue')"
		/>
	</v-navigation-drawer>
</template>
