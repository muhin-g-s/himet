<script lang="ts" setup>
import { INote } from './home.types';

interface IHomeListMoreInfoProps {
	isOpen: boolean;
	note: INote;
}

const props = defineProps<IHomeListMoreInfoProps>();

const emit = defineEmits<{
	(event: 'close'): void;
}>();
</script>

<template>
	<v-dialog
		:model-value="props.isOpen"
		max-width="500px"
		@update:model-value="emit('close')"
	>
		<v-card>
			<v-card-title>
				<span class="headline">{{ props.note.date }} {{ props.note.name }}</span>
			</v-card-title>
			<v-card-text> {{ props.note.discription }} </v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn
					color="primary"
					@click="emit('close')"
				>
					Закрыть
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
