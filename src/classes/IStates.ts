export default interface IStates {
	get created(): boolean;
	set created(created: boolean | undefined);

	toObject(): object;
}
