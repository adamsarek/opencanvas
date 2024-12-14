export default interface IOptions {
	get selector(): string;
	set selector(selector: string | string[] | undefined);

	get theme(): string;
	set theme(theme: string | undefined);

	toObject(): object;
}
