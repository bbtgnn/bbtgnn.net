import { getAbaPerugiaSheet } from './aba-perugia/data';
import { getConceptsUniSheet } from './concepts-uni/data';
import { getRestorSheet } from './restor/data';
import { getWorkshopsSheet } from './workshops/data';

export function getContentSheets() {
	return {
		abaPerugia: getAbaPerugiaSheet(),
		conceptsUni: getConceptsUniSheet(),
		restor: getRestorSheet(),
		workshops: getWorkshopsSheet()
	};
}

export {
	getAbaPerugiaSheet,
	getConceptsUniSheet,
	getRestorSheet,
	getWorkshopsSheet
};
