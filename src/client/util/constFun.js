export function setTheme() {
	let theme = localStorage.getItem('selectedTheme')
	if(!theme){
		theme = 'theme-light'
		localStorage.setItem('selectedTheme',theme)
	}
	document.documentElement.className = theme;
}