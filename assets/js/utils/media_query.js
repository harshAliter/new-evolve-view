export function smallMax () {
	if(import.meta.client) {
		return window.matchMedia('(max-width: 959px)').matches
	} else {
		return null;
	}
}
export function mediumMin () {
	if(import.meta.client) {
		return window.matchMedia('(min-width: 960px)').matches
	} else {
		return null;
	}
}
export function mediumMax () {
	if(import.meta.client) {
		return window.matchMedia('(max-width: 1199px)').matches
	} else {
		return null;
	}
}
export function largeMin () {
	if(import.meta.client) {
		return window.matchMedia('(min-width: 1200px)').matches
	} else {
		return null;
	}
}
export function largeMax () {
	if(import.meta.client) {
		return window.matchMedia('(max-width: 1599px)').matches
	} else {
		return null;
	}
}
export function xlargeMin () {
	if(import.meta.client) {
		return window.matchMedia('(min-width: 1600px)').matches
	} else {
		return null;
	}
}

export default {
	smallMax,
	mediumMin,
	mediumMax,
	largeMin,
	largeMax,
	xlargeMin
}
