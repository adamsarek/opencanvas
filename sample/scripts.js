function onInput() {
	document.querySelector('#theme-output').value = openCanvas.options.theme;
	document.querySelector('#theme-output').title = openCanvas.options.theme;
}

document.addEventListener("DOMContentLoaded", () => {
	document.querySelector('#theme').value = openCanvas.options.theme;
	onInput();
});
