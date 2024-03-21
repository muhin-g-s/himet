<script lang="ts" setup>
import { mdiDelete } from '@mdi/js';
import { ref } from 'vue';

interface IHomeListNoteItemProps {
	id: string;
	date: string;
	name: string;
}

const props = defineProps<IHomeListNoteItemProps>();

const emit = defineEmits<{
	(event: 'delete', value: string): void;
}>();

const isShowIconDelete = ref(false);

function showIconDelete() {
	isShowIconDelete.value = true;
}
function hideIconDelete() {
	isShowIconDelete.value = false;
}
</script>

<template>
	<v-sheet
		class="d-flex justify-space-between pa-2 bg-surface-variant"
		rounded
	>
		<div>
			<b class="mr-4">{{ props.date }}</b>
			{{ props.name }}
		</div>

		<div
			class="w-25 d-flex justify-end align-center"
			@mouseover="showIconDelete()"
			@mouseleave="hideIconDelete()"
		>
			<v-expand-transition mode="out-in">
				<v-icon
					v-show="isShowIconDelete"
					:icon="mdiDelete"
					size="20"
					@click.stop="emit('delete', props.id)"
				/>
			</v-expand-transition>
		</div>
	</v-sheet>
</template>
