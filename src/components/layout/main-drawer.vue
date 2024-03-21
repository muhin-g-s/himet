<script lang="ts" setup>
import DrawerForm from '../drawer/drawer-form.vue';

interface IMainDrawerProps {
	modelValue: boolean;
}

const props = defineProps<IMainDrawerProps>();

const emit = defineEmits<{
	(event: 'update:modelValue', value: boolean): void;
}>();

function changeStateDrawer(newValue: boolean) {
	emit('update:modelValue', newValue);
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
			@close="changeStateDrawer(false)"
		/>
	</v-navigation-drawer>
</template>
