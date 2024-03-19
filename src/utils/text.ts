// eslint-disable-next-line import/prefer-default-export
export function declOfNum(value: number, titles: string[]): string {
	const cases = [2, 0, 1, 1, 1, 2];
	return titles[value % 100 > 4 && value % 100 < 20 ? 2 : cases[value % 10 < 5 ? value % 10 : 5]];
}
