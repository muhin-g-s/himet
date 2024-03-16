# MUI Settings v2

## Глобальные зависимости

Для стабильной работы необходим [Node.js](https://nodejs.org/en/) 21 и выше.

## Расширения редактора

Рекомендуется установить для `Visual Studio Code` следующие расширения:

- [EditorConfig for VS Code](vscode:extension/editorconfig.editorconfig);
- [ESLint](vscode:extension/dbaeumer.vscode-eslint);
- [Formatter-pug](vscode:extension/alexbabichev.formatter-pug);
- [Vue Language Features (Volar)](vscode:extension/Vue.volar);
- [TypeScript Vue Plugin (Volar)](vscode:extension/Vue.vscode-typescript-vue-plugin).
- [Stylelint](vscode:extension/stylelint.vscode-stylelint).

Также для корректной работы необходимо удалить/отключить `Vetur` для избежания конфликтов с `Volar`.

## Конфигурация редактора

Рекомендуется установить для `Visual Studio Code` следующую конфигурацию:

```json
{
	/* Для автоматического исправления eslint-ошибок при сохранении файла с помощью ESLint. */
	"editor.formatOnSave": true,
	"eslint.format.enable": true,
	"editor.defaultFormatter": "dbaeumer.vscode-eslint",

	/* Для автоматического исправления stylelint-ошибок при сохранении файла. */
	"stylelint.validate": ["scss", "vue"],
	"editor.codeActionsOnSave": {
		"source.fixAll": true
	},

	/* Для корректного автокомплита Volar. */
	"volar.completion.preferredAttrNameCase": "kebab",
	"volar.completion.preferredTagNameCase": "kebab"
}
```

## Используемые технологии

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

## GitHooks

- `pre-commit` - запускает ESLint, Vue-tsc и Stylelint.

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
  - `styles` - глобальные стили проекта;
  - `app.vue` - корневой компонент vue-приложения;
  - `main.ts` - скрипт инициализации vue-приложения;
- `.browserslistrc` - конфиг поддержки браузеров;
- `.editorconfig` - конфиг для редактора;
- `.eslintignore` - игнор-конфиг Eslint;
- `.eslintrc.js` - конфиг Eslint;
- `.gitignore` - игнор-конфиг Git;
- `.stylelintrc.js` - конфиг Stylelint;
- `vite.config.ts` - конфиг Vite;
