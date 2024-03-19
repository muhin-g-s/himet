import { unref } from 'vue';
import useVuelidate from '@vuelidate/core';

export default function useGetValidationErrorText(v$: ReturnType<typeof useVuelidate>) {
	// eslint-disable-next-line func-names
	return function (attributeName: string) {
		if (!v$.value[attributeName]?.$error) {
			return '';
		}
		return unref(v$.value[attributeName].$errors[0].$message);
	};
}
