export default interface ILayout {
	get container(): Element | undefined;
	set container(container: Element | undefined);
	
	get frame(): Element | undefined;
	set frame(frame: Element | undefined);
	
	get canvas(): Element | undefined;
	set canvas(canvas: Element | undefined);
	
	get overlay(): Element | undefined;
	set overlay(overlay: Element | undefined);

	toObject(): object;
}
