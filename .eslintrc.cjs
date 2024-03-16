const MAX_LINE_LENGTH = 120;

const pathGroupsImportOptions = { patternOptions: { dot: true, nocomment: true }, group: 'unknown', position: 'after' };

const config = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			impliedStrict: true,
			experimentalDecorators: true,
		},
	},
	plugins: ['prettier', '@typescript-eslint', 'filenames', 'node'],
	extends: ['airbnb-base', 'prettier', 'plugin:@typescript-eslint/recommended'],
	ignorePatterns: ['**/coverage/*', 'dist/', 'node_modules/'],
	root: true,
	globals: {
		document: true,
		navigator: true,
		window: true,
	},
	env: {
		browser: true,
		amd: true,
		node: true,
		es6: true,
	},
	rules: {
		'prettier/prettier': [
			2,
			{
				singleQuote: true,
				useTabs: true,
				tabWidth: 4,
				printWidth: MAX_LINE_LENGTH,
				trailingComma: 'all',
				arrowParens: 'avoid',
				singleAttributePerLine: true,
			},
		],

		'filenames/match-regex': [2, '^([a-z0-9]+[-.])*[a-z0-9]+$', true],

		'import/no-unresolved': 0,
		'import/no-extraneous-dependencies': 0,
		'import/extensions': 0,
		'import/no-anonymous-default-export': [
			2,
			{
				allowArray: true,
				allowLiteral: true,
				allowObject: true,
			},
		],
		'import/order': [
			'error',
			{
				'newlines-between': 'always',
				groups: ['builtin', 'external', ['internal', 'unknown', 'parent', 'sibling', 'index', 'object']],
				pathGroups: [
					{
						...pathGroupsImportOptions,
						group: 'external',
						pattern: '#*',
					},
					{
						...pathGroupsImportOptions,
						pattern: '{@,.,..,../..,../../..,../../../..,../../../../..}{/src,}/services{/**/*,}',
					},
					{
						...pathGroupsImportOptions,
						pattern: '*.vue',
						patternOptions: { ...pathGroupsImportOptions.patternOptions, matchBase: true },
					},
					{
						...pathGroupsImportOptions,
						pattern: '{@,.,..,../..,../../..,../../../..,../../../../..}{/src,}/stores{/**/*,}',
					},
					{
						...pathGroupsImportOptions,
						pattern: '*.types',
						patternOptions: { ...pathGroupsImportOptions.patternOptions, matchBase: true },
					},
				],
			},
		],
		indent: 0,
		'no-shadow': 0,
		'no-param-reassign': [2, { props: false }],
		'no-unused-expressions': 0,
		'no-use-before-define': 0,
		'node/no-process-env': 'error',
		'max-len': [2, { code: MAX_LINE_LENGTH, ignoreComments: true }],
		// 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 0,
		'prefer-destructuring': 1,
		curly: [2, 'all'],
		'class-methods-use-this': 0,
		'lines-between-class-members': [2, 'always', { exceptAfterSingleLine: true }],
		'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],

		'@typescript-eslint/no-shadow': 2,
		'@typescript-eslint/array-type': [2, { default: 'array' }],
		'@typescript-eslint/indent': 0,
		'@typescript-eslint/member-delimiter-style': [
			2,
			{
				multiline: {
					delimiter: 'semi',
					requireLast: true,
				},
				singleline: {
					delimiter: 'semi',
					requireLast: false,
				},
			},
		],
		'@typescript-eslint/naming-convention': [
			2,
			{
				selector: 'default',
				format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
			},
			{
				selector: 'property',
				format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
				leadingUnderscore: 'allow',
			},
			{
				selector: ['property', 'method'],
				format: null,
				modifiers: ['requiresQuotes'],
			},
			{
				selector: 'enum',
				format: ['PascalCase', 'UPPER_CASE'],
			},
			{
				selector: 'enumMember',
				format: ['PascalCase', 'UPPER_CASE'],
			},
			{
				selector: 'typeAlias',
				format: ['PascalCase'],
			},
			{
				selector: 'typeParameter',
				format: ['PascalCase'],
			},
			{
				selector: 'class',
				format: ['PascalCase'],
			},
			{
				selector: 'interface',
				format: ['PascalCase'],
				prefix: ['I'],
			},
		],
		'@typescript-eslint/no-array-constructor': 2,
		'@typescript-eslint/no-extraneous-class': 2,
		'@typescript-eslint/no-misused-new': 2,
		'@typescript-eslint/no-unused-vars': 2,
		'@typescript-eslint/no-use-before-define': [
			2,
			{
				functions: false,
				classes: true,
				variables: true,
				ignoreTypeReferences: true,
				typedefs: false,
			},
		],
		'@typescript-eslint/no-useless-constructor': 2,
		'@typescript-eslint/no-var-requires': 0,
		'@typescript-eslint/ban-ts-comment': 1,
	},
	overrides: [
		{
			files: ['*.ts'],
			rules: {
				'no-empty-function': 0,
				'no-useless-constructor': 0,
				'no-unused-vars': 0,
				quotes: [2, 'single'],
			},
		},
		{
			files: ['**/config.{j,t}s', '**/*.config.{j,t}s', '**/environment.{j,t}s'],
			rules: {
				'node/no-process-env': 0,
			},
		},
	],
};

Object.entries({
	vue(currentConfig) {
		currentConfig.plugins.push('vue');
		currentConfig.parserOptions.parser = currentConfig.parser;
		currentConfig.parser = 'vue-eslint-parser';

		// Vue-плагин должен находиться перед prettier.
		currentConfig.extends.splice(currentConfig.extends.indexOf('prettier'), 0, 'plugin:vue/vue3-recommended');

		Object.entries({
			'vue/component-name-in-template-casing': [1, 'kebab-case'],
			'vue/html-indent': 0, // Конфликт с prettier.
			'vue/no-export-in-script-setup': 'off',
			'vue/no-v-html': 'off',
			'vue/require-default-prop': 'off',
			'vue/max-attributes-per-line': [
				'error',
				{
					singleline: {
						max: 1,
					},
					multiline: {
						max: 1,
					},
				},
			],
			'vue/html-self-closing': [
				'error',
				{
					html: {
						void: 'always',
						normal: 'always',
						component: 'always',
					},
					svg: 'always',
					math: 'always',
				},
			],
			'vue/multiline-html-element-content-newline': [
				'error',
				{
					ignoreWhenEmpty: true,
					ignores: ['pre', 'textarea'],
					allowEmptyLines: true,
				},
			],
			'@typescript-eslint/no-unused-vars': 'off',
		}).forEach(([k, v]) => {
			currentConfig.rules[k] = v;
		});

		Object.entries({
			'vue/setup-compiler-macros': true,
		}).forEach(([k, v]) => {
			currentConfig.env[k] = v;
		});

		currentConfig.overrides.push({
			files: ['*.vue'],
			rules: {
				// Конфликт с prettier.
				indent: 0,
				'@typescript-eslint/indent': 0,
			},
		});
	},
});

module.exports = config;
