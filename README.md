## Кратко о проекте
* UI framework - vuetifyjs
* Уведомления - vue-toastification
* Валидаци - vuelidate
* Роутинг - vue-router
* State manager - pinia
* EventBus - mitt

* Для персистентности используется indexedDB
* Для связи обновления данных между вкладками BroadcastChannel

## Глобальные зависимости

Для стабильной работы необходим [Node.js](https://nodejs.org/en/) 21 и выше.

- [Vue.js](https://v3.vuejs.org/);
- [TypeScript](https://www.typescriptlang.org/);
- [Scss](https://sass-scss.ru/).

## Команды

- `npm install` - установка зависимостей;
- `npm run dev` - запуск приложения в режиме development с hotreload;
- `npm run build` - сборка в режиме production;
- `npm run lint` - проверка проекта [ESLint](https://eslint.org/), [Vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/packages/vue-tsc) и [Stylelint](https://stylelint.io/);
- `npm run lint:js` - проверка проекта [ESLint](https://eslint.org/);
- `npm run lint:ts` - проверка проекта [Vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/packages/vue-tsc);
- `npm run lint:css` - проверка проекта [Stylelint](https://stylelint.io/);

## Структура проекта

- `src` - исходный код проекта;
  - `assets` - файлы, обрабатываемые сборщиком;
    - `fonts` - шрифты;
    - `images` - картинки;
    - `icons` - svg-иконки для спрайта.
  - `components` - vue-компоненты;
  - `constants` - константы;
  - `pages` - vue-компоненты, привязанные к маршрутам vue-роутера;
  - `router` - vue-роутер;
  - `services` - сервисы проекта;
  - `store` - pinia-модули;
	- `utils` - вспомогательные переиспользуемые функции;
  - `app.vue` - корневой компонент vue-приложения;
  - `main.ts` - скрипт инициализации vue-приложения;
- `.browserslistrc` - конфиг поддержки браузеров;
- `.editorconfig` - конфиг для редактора;
- `.eslintignore` - игнор-конфиг Eslint;
- `.eslintrc.js` - конфиг Eslint;
- `.gitignore` - игнор-конфиг Git;
- `.stylelintrc.js` - конфиг Stylelint;
- `vite.config.ts` - конфиг Vite;
