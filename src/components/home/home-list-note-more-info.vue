<script lang="ts" setup>
import { ref } from 'vue';

import { useApiService, useNotificationService } from '@/services';

import { useSystemStore } from '@/stores';

import { INote } from './home.types';

interface IHomeListMoreInfoProps {
	id: string;
}

const props = defineProps<IHomeListMoreInfoProps>();

const emit = defineEmits<{
	(event: 'close'): void;
}>();

const systemStore = useSystemStore();

const apiService = useApiService();
const notificationService = useNotificationService();

const note = ref<INote>();

async function onCreated(): Promise<void> {
	try {
		systemStore.startLoading();

		note.value = await apiService.note.read(props.id);
	} catch {
		notificationService.error('Failed to load note');
	} finally {
		systemStore.finishLoading();
	}
}

onCreated();
</script>

<template>
	<v-card
		v-if="note"
		class="w-50"
	>
		<v-card-title>
			<span>{{ note.date }}</span>
		</v-card-title>
		<v-card-text> {{ note.name }} </v-card-text>
		<v-card-text> {{ note.discription }} </v-card-text>
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
</template>
