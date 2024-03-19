import { helpers, required, minLength } from '@vuelidate/validators';
import { Ref } from 'vue';
import { Validation } from '@vuelidate/core';

import { declOfNum } from '@/utils';

const isDateInFuture = (dateString: string): boolean => {
	const currentDate = new Date();
	const inputDate = new Date(dateString);

	if (inputDate < currentDate) {
		return false;
	}

	return true;
};

export default class ValidationService {
	get rules() {
		return {
			required: helpers.withMessage(this.messages.required, required),
			minLength: (min: number) => helpers.withMessage(this.messages.minLength(min), minLength(min)),
			dateInFuture: helpers.withMessage(this.messages.dateInFuture, isDateInFuture),
		};
	}

	get messages() {
		return {
			required: 'Заполните поле',
			minLength: (count: number) => `Не менее ${count} ${declOfNum(count, ['символа', 'символов', 'символов'])}`,
			dateInFuture: 'Дата должна быть в будующем',
		};
	}

	getErrorMessage(validation: Validation): string | Ref<string> {
		if (!validation.$error) {
			return '';
		}

		return validation.$errors[0].$message;
	}
}
