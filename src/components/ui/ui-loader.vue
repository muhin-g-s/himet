<script lang="ts" setup>
interface IUiLoaderProps {
	loading: boolean;
}

const props = defineProps<IUiLoaderProps>();
</script>

<template>
	<v-overlay
		:model-value="props.loading"
		close-on-back
		opacity="0"
		persistent
		class="align-center justify-center"
	>
		<v-progress-circular
			color="primary"
			size="64"
			indeterminate
		/>
	</v-overlay>
</template>
