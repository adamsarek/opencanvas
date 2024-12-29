export default interface IStates {
	get created(): boolean;
	set created(created: boolean | undefined);

	get clearing(): boolean;
	set clearing(clearing: boolean | undefined);

	get drawing(): boolean;
	set drawing(drawing: boolean | undefined);

	toObject(): object;
}
