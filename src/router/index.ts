import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

export enum RouteNames {
	Home = 'HOME',
}

export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: RouteNames.Home,
		component: () => import(/* webpackChunkName: "home" */ '@/pages/home-page.vue'),
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
