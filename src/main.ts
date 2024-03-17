import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
import { createApp } from 'vue';
import type { App as IApp } from 'vue';
import { createPinia } from 'pinia';

import router from '@/router';

import { createServices } from './services';

import App from './App.vue';

const configureApp = (app: IApp): void => {
	const services = createServices();
	Object.entries(services).forEach(([key, value]) => app.provide(key, value));

	const vuetify = createVuetify({
		components,
		directives,
		icons: {
			defaultSet: 'mdi',
			aliases,
			sets: {
				mdi,
			},
		},
		theme: {
			defaultTheme: 'dark',
		},
	});

	app.use(router).use(createPinia()).use(vuetify);
};

const app = createApp(App);
configureApp(app);

app.mount('#app');
