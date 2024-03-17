import { defineStore } from 'pinia';

export interface ISystemState {
	loadingCount: number;
}

export const useSystemStore = defineStore({
	id: 'system',

	state: (): ISystemState => ({
		loadingCount: 0,
	}),

	getters: {
		isLoading: (state): boolean => !!state.loadingCount,
	},

	actions: {
		startLoading(): void {
			this.loadingCount += 1;
		},
		finishLoading(): void {
			if (this.loadingCount > 0) {
				this.loadingCount -= 1;
			}
		},
	},
});
