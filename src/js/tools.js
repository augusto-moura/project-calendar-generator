let generateRandomId = () => {
	let length = 8;
	let randomString = '';
	const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return `e${randomString}`;
};

let etapasProjetoForTesting = [
	{
		id: generateRandomId(),
		nome: 'Entrega 1',
		dataInicio: '2023-02-01',
		dataFim: '2023-02-02',
		color: null,
		legendColor: null,
	},
	{
		id: generateRandomId(),
		nome: 'Entrega 2',
		dataInicio: '2023-02-03',
		dataFim: '2023-02-04',
		color: null,
		legendColor: null,
	},
	{
		id: generateRandomId(),
		nome: 'Entrega 3',
		dataInicio: '2023-02-05',
		dataFim: '2023-02-06',
		color: null,
		legendColor: null,
	},
	{
		id: generateRandomId(),
		nome: 'Entrega 4',
		dataInicio: '2023-02-07',
		dataFim: '2023-02-08',
		color: null,
		legendColor: null,
	},
	{
		id: generateRandomId(),
		nome: 'Entrega 5',
		dataInicio: '2023-02-09',
		dataFim: '2023-02-10',
		color: null,
		legendColor: null,
	},
	{
		id: generateRandomId(),
		nome: 'Entrega 6',
		dataInicio: '2023-02-11',
		dataFim: '2023-02-12',
		color: null,
		legendColor: null,
	},
	{
		id: generateRandomId(),
		nome: 'Entrega 7',
		dataInicio: '2023-02-13',
		dataFim: '2023-02-14',
		color: null,
		legendColor: null,
	},
	{
		id: generateRandomId(),
		nome: 'Entrega 8',
		dataInicio: '2023-02-15',
		dataFim: '2023-02-16',
		color: null,
		legendColor: null,
	},
];

let convertMySqlDateToDateObject = (mySqlDate) => {
	let date = mySqlDate.replace( /[-]/g, '/' );
	date = Date.parse( date );
	return new Date( date );
}

export {generateRandomId, etapasProjetoForTesting, convertMySqlDateToDateObject};