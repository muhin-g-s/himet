import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import MainLayot from '@/layouts/main-layot.vue';

export enum RouteNames {
	Home = 'HOME',
}

export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: MainLayot,
		children: [
			{
				path: '',
				name: RouteNames.Home,
				component: () => import('@/pages/home-page.vue'),
			},
		],
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: { name: RouteNames.Home },
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
