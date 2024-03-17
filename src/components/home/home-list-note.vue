<script lang="ts" setup>
import { ref } from 'vue';
import { mdiDelete } from '@mdi/js';

import { ADD_NOTE } from '@/constants';

import { useApiService, useEventBus } from '@/services';

import HomeListMoreInfo from './home-list-more-info.vue';

import { useSystemStore } from '@/stores';

import { INote, INoteFilter } from './home.types';

const props = defineProps<INoteFilter>();

const systemStore = useSystemStore();

const apiService = useApiService();
const eventBus = useEventBus();

const notes = ref<INote[]>();
const isOpenMoreInfo = ref(true);
const currentNote = ref<INote | null>();

function onCreated(): void {
	loadNotes();
	eventBus.on(ADD_NOTE, () => loadNotes());
}

async function loadNotes(date?: string): Promise<void> {
	try {
		systemStore.startLoading();
		if (!date) {
			notes.value = await apiService.note.getAll();
		}
	} catch (e) {
		// TODO сделать обработку ошибок
	} finally {
		systemStore.finishLoading();
	}
}

async function deleteNote(noteId: string): Promise<void> {
	try {
		systemStore.startLoading();

		await apiService.note.delete(noteId);

		await loadNotes();
	} catch (e) {
		// TODO сделать обработку ошибок
	} finally {
		systemStore.finishLoading();
	}
}

function openMoreInfo(note: INote) {
	isOpenMoreInfo.value = true;
	currentNote.value = note;
}

function closeMoreInfo() {
	isOpenMoreInfo.value = false;
	currentNote.value = null;
}

onCreated();
</script>

<template>
	<div class="d-flex flex-column mb-6 w-100 mt-4 justify-center m-auto align-center">
		<v-sheet
			v-for="note in notes"
			:key="note.id"
			class="w-50"
		>
			<v-sheet
				class="d-flex mb-2 pa-2 bg-surface-variant"
				rounded
				@click="openMoreInfo(note)"
			>
				<b class="mr-4">{{ note.date }}</b>
				{{ note.name }}
				<v-icon
					class="ml-auto"
					:icon="mdiDelete"
					@click.stop="deleteNote(note.id)"
				/>
			</v-sheet>
		</v-sheet>
		<home-list-more-info
			v-if="currentNote"
			:is-open="isOpenMoreInfo"
			:note="currentNote"
			@close="closeMoreInfo"
		/>
	</div>
</template>
