const jsonConfig = {

	API_URL: "https://ecom-api.multiverseexpert.io",
	WEBSITE_URL: "https://ecom.multiverseexpert.io",
	IMG_URL: "https://ecom-api.multiverseexpert.io",

	maillerConfig: {
		host: "mail.loiplus.com",
		port: 465,
		auth: {
			user: "info@loiplus.com",
			pass: "p*6DX]@c$h2F"
		}
	},

	languageData: [
		{
			languageId: 'english',
			locale: 'en',
			name: 'English',
			icon: 'us'
		},
		{
			languageId: 'turkish',
			locale: 'tr',
			name: 'Türkçe',
			icon: 'tr'
		},

	],

	defaultLanguage: {
		languageId: 'english',
		locale: 'en',
		name: 'English',
		icon: 'us'
	}
}

if (process.env.NODE_ENV == 'development') {
	jsonConfig.API_URL = "http://localhost:17000"
	jsonConfig.WEBSITE_URL = "http://localhost:13000"
	jsonConfig.IMG_URL = "http://localhost:17000"
}

module.exports = jsonConfig