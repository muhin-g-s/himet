<script lang="ts" setup>
import { reactive, ref, unref, watchEffect } from 'vue';
import useVuelidate from '@vuelidate/core';
import { helpers } from '@vuelidate/validators';

import { useGetValidationErrorText } from '@/composables';

import { useApiService, useEventBus, useValidationService, useNotificationService } from '@/services';
import { EventEnum } from '@/services/event-bus-service';

import { useSystemStore } from '@/stores';

const MIN_DISCRIPTION = 3;
const MIN_NAME = 5;

interface IDrawerForm {
	isOpen: boolean | null;
}

const props = defineProps<IDrawerForm>();

const emit = defineEmits<{
	(event: 'close'): void;
}>();

const systemStore = useSystemStore();

const apiService = useApiService();
const eventBus = useEventBus();
const validationService = useValidationService();
const notificationService = useNotificationService();

const dateInputRef = ref<HTMLInputElement | null>(null);
const nameInputRef = ref<HTMLInputElement | null>(null);
const discriptionInputRef = ref<HTMLInputElement | null>(null);

const rules = {
	date: {
		required: helpers.withParams({ el: nameInputRef }, validationService.rules.required),
		dateInFuture: helpers.withParams({ el: dateInputRef }, validationService.rules.dateInFuture),
	},
	name: {
		required: helpers.withParams({ el: nameInputRef }, validationService.rules.required),
		minLength: helpers.withParams({ el: discriptionInputRef }, validationService.rules.minLength(MIN_NAME)),
	},
	discription: {
		required: helpers.withParams({ el: discriptionInputRef }, validationService.rules.minLength(MIN_DISCRIPTION)),
	},
};

const noteForm = reactive({
	date: '',
	name: '',
	discription: '',
});

const v$ = useVuelidate(rules, noteForm);

const getValidationErrorText = useGetValidationErrorText(v$);

watchEffect(() => {
	if (!props.isOpen && v$.value) {
		v$.value.$reset();
	}
});

async function createNote(): Promise<void> {
	try {
		systemStore.startLoading();

		await apiService.note.create(unref(noteForm));
		eventBus.emit(EventEnum.CHANGE_NOTE);

		notificationService.success('Note created');
	} finally {
		systemStore.finishLoading();
	}
}

async function validateNoteForm(): Promise<boolean> {
	const isFormValid = await v$.value.$validate();

	if (isFormValid) {
		const error = v$.value.$errors[0];
		const errorParams =
			(error?.$params as {
				el: { focus: () => void };
				isShowMessageFromError?: boolean;
			}) || {};

		const { el } = errorParams;

		if (el && el.focus) {
			el.focus();
		}
	}
	return isFormValid;
}

function clearForm() {
	noteForm.date = '';
	noteForm.name = '';
	noteForm.discription = '';
	v$.value.$reset();
}

async function handleSubmitButtonClick(): Promise<void> {
	const isFormValid = await validateNoteForm();

	if (!isFormValid) {
		notificationService.warning('Failed to save note');
		return;
	}

	try {
		await createNote();

		clearForm();

		emit('close');
	} catch {
		notificationService.error('Failed to create note');
	}
}
</script>

<template>
	<v-form @submit.prevent="handleSubmitButtonClick">
		<v-container width="200">
			<v-row>
				<v-col cols="12">
					<v-text-field
						ref="dateInputRef"
						v-model="noteForm.date"
						label="Date"
						outlined
						required
						clearable
						:error-messages="getValidationErrorText('date')"
						type="date"
					/>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-text-field
						ref="nameInputRef"
						v-model="noteForm.name"
						label="Title"
						outlined
						:error-messages="getValidationErrorText('name')"
						required
					/>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12">
					<v-textarea
						ref="discriptionInputRef"
						v-model="noteForm.discription"
						label="Discription"
						:error-messages="getValidationErrorText('discription')"
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
