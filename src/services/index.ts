import { inject } from 'vue';
import mitt, { Emitter } from 'mitt';

import ApiService from './api-service';
import DatabaseService from './api/database-service';

type EventBus = Emitter<{
	message: string;
	[key: string]: unknown;
}>;

export const createServices = () => {
	// Тут возможен выбор какую имплементацию инжектить в ApiService
	const databaseService = new DatabaseService();

	const apiService = new ApiService(databaseService);
	const eventBus: EventBus = mitt();
	return { apiService, eventBus };
};

export const useApiService = () => inject('apiService') as ApiService;
export const useEventBus = () => inject('eventBus') as EventBus;
