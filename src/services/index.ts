import { inject } from 'vue';

import ApiService from './api-service';
import DatabaseService from './api/database-service';

export const createServices = () => {
	// Тут возможен выбор какую имплементацию инжектить в ApiService
	const databaseService = new DatabaseService();

	const apiService = new ApiService(databaseService);

	return { apiService };
};

export const useApiService = () => inject('apiService') as ApiService;
