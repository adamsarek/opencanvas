export default interface IOptions {
	get selector(): string;
	set selector(selector: string | string[]);

	get theme(): string;
	set theme(theme: string | string[]);
}
