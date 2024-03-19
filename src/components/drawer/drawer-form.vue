<script lang="ts" setup>
import { ref, unref } from 'vue';

import { useApiService, useEventBus } from '@/services';
import { EventEnum } from '@/services/event-bus-service';

import { useSystemStore } from '@/stores';

const systemStore = useSystemStore();

const apiService = useApiService();
const eventBus = useEventBus();

const formData = ref({
	date: '',
	name: '',
	discription: '',
});

async function createNote(): Promise<void> {
	try {
		systemStore.startLoading();

		await apiService.note.create(unref(formData));
		eventBus.emit(EventEnum.CHANGE_NOTE);
	} catch (e) {
		// TODO сделать обработку ошибок
	} finally {
		systemStore.finishLoading();
	}
}
</script>

<template>
	<v-form @submit.prevent="createNote">
		<v-container width="200">
			<v-row>
				<v-col cols="12">
					<v-text-field
						v-model="formData.date"
						label="Date"
						outlined
						required
						clearable
						type="date"
					/>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-text-field
						v-model="formData.name"
						label="Title"
						outlined
						required
					/>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-textarea
						v-model="formData.discription"
						label="Discription"
						outlined
						required
					/>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-btn
						type="submit"
						color="primary"
					>
						Добавить
					</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>
