import { inject } from 'vue';

import ApiService from './api-service';
import DatabaseService from './api/database-service';
import EventBusService from './event-bus-service';
import ValidationService from './validation-service';

export const createServices = () => {
	// Тут возможен выбор какую имплементацию инжектить в ApiService
	const databaseService = new DatabaseService();

	const apiService = new ApiService(databaseService);
	const eventBus = new EventBusService();
	const validationService = new ValidationService();

	return {
		apiService,
		eventBus,
		validationService,
	};
};

export const useApiService = () => inject('apiService') as ApiService;
export const useEventBus = () => inject('eventBus') as EventBusService;
export const useValidationService = () => inject('validationService') as ValidationService;
