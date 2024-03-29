<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { mdiArrowLeft } from '@mdi/js';

import { useApiService, useEventBus, useNotificationService } from '@/services';
import { EventEnum } from '@/services/event-bus-service';

import HomeListNoteMoreInfo from './home-list-note-more-info.vue';
import HomeListNoteItem from './home-list-note-item.vue';

import { useSystemStore } from '@/stores';

import { INote, INoteFilter } from './home.types';

const props = defineProps<INoteFilter>();

const systemStore = useSystemStore();

const apiService = useApiService();
const eventBus = useEventBus();
const notificationService = useNotificationService();

const isDataLoaded = ref(false);

const notes = ref<INote[]>();

const isOpenNoteMoreInfo = ref(false);
const currentNoteId = ref<string>('');

const noResultText = computed((): string =>
	props.date ? 'There are no notes for this date' : 'Create a note and it will appear here',
);

watch(
	() => props.date,
	async () => {
		if (props.date) {
			await loadNotesByDate(props.date);
		} else {
			await loadNotes();
		}
	},
);

async function onCreated(): Promise<void> {
	await loadNotes();
	eventBus.on(EventEnum.CHANGE_NOTE, () => loadNotes());
}

async function loadNotes(): Promise<void> {
	isDataLoaded.value = false;

	try {
		systemStore.startLoading();

		notes.value = await apiService.note.getAll();

		isDataLoaded.value = true;
	} catch {
		notificationService.error('Failed to load notes');
	} finally {
		systemStore.finishLoading();
	}
}

async function loadNotesByDate(date: string): Promise<void> {
	isDataLoaded.value = false;

	try {
		systemStore.startLoading();

		notes.value = await apiService.note.sortByDate(date);

		isDataLoaded.value = true;
	} catch {
		notificationService.error('Failed to load notes');
	} finally {
		systemStore.finishLoading();
	}
}

async function deleteNote(noteId: string): Promise<void> {
	try {
		systemStore.startLoading();

		await apiService.note.delete(noteId);
		eventBus.emit(EventEnum.CHANGE_NOTE);

		notificationService.success('Note deleted');

		await loadNotes();
	} catch {
		notificationService.error('Failed to delete notes');
	} finally {
		systemStore.finishLoading();
	}
}

function openMoreInfo(noteId: string) {
	isOpenNoteMoreInfo.value = true;
	currentNoteId.value = noteId;
}

function closeMoreInfo() {
	isOpenNoteMoreInfo.value = false;
	currentNoteId.value = '';
}

onCreated();
</script>

<template>
	<div
		v-if="isDataLoaded"
		class="d-flex flex-column mb-6 w-100 mt-4 justify-center m-auto align-center"
	>
		<template v-if="isOpenNoteMoreInfo">
			<div class="d-flex flex-column align-center w-100">
				<div class="d-flex align-center justify-start mb-5 w-50">
					<v-icon
						:icon="mdiArrowLeft"
						@click="closeMoreInfo"
					/>
					<span>Back</span>
				</div>
				<home-list-note-more-info
					:id="currentNoteId"
					@close="closeMoreInfo"
				/>
			</div>
		</template>
		<template v-else>
			<p
				v-if="!notes?.length"
				class="mt-10"
			>
				{{ noResultText }}
			</p>
			<v-sheet
				v-for="note in notes"
				:key="note.id"
				class="w-50 mb-3"
			>
				<home-list-note-item
					:id="note.id"
					:name="note.name"
					:date="note.date"
					@delete="deleteNote"
					@show-more="openMoreInfo"
				/>
			</v-sheet>
		</template>
	</div>
</template>
