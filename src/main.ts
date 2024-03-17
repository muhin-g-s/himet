import '@/styles/index.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import type { App as IApp } from 'vue';

import router from '@/router';

import { createServices } from './services';

import App from './App.vue';

const configureApp = (app: IApp): void => {
	const services = createServices();
	Object.entries(services).forEach(([key, value]) => app.provide(key, value));

	app.use(router).use(createPinia());
};

const app = createApp(App);
configureApp(app);

app.mount('#app');
