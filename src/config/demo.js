export const demoOriginal = {
	name: 'demo',
	author: 'File Author',
	section1: {
		name: 'This is inside a nested key',
		'sub section': {
			title: 'This is a 2 level deep item',
		},
	},
	section2: {
		name: 'Another Section',
	},
	notifications: {
		success: {
			addItem: '{{item}} successfully added',
			updateItem: '{{item}} successfully added',
		},
		error: {
			addItem: "{{item}} couldn't be added due to an error",
			updateItem: "{{item}} couldn't be updated due to an error",
		},
	},
};


export const demoTarget = {
	name: 'démo',
	author: 'Auteur du fichier',
	section1: {
		name: '',
		'sub section': {
			title: 'niveau 2',
		},
	},
	section2: {
		name: '',
	},
	notifications: {
		success: {
			addItem: '{{item}} ajouté avec succès',
			updateItem: '',
		},
		error: {
			addItem: 'erreur est survenue',
			updateItem: '',
		},
	},
};

export const demoLanguage = 'fr';
