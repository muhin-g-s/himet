<script lang="ts" setup>
import DrawerForm from '../drawer/drawer-form.vue';

interface IMainDrawerProps {
	modelValue: boolean;
}

const props = defineProps<IMainDrawerProps>();

const emit = defineEmits<{
	(event: 'update:modelValue', value: boolean): void;
}>();

function changeStateDrawer() {
	emit('update:modelValue', !props.modelValue);
}
</script>

<template>
	<v-navigation-drawer
		:model-value="props.modelValue"
		temporary
		@update:model-value="changeStateDrawer"
	>
		<drawer-form
			:is-open="props.modelValue"
			@close="changeStateDrawer"
		/>
	</v-navigation-drawer>
</template>
