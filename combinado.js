const app = require('./config/server')
const ClientNotification = require('./config/ClientNotification');

if (process.env.USER == 'adriano') {
	app.listen(8001, () => {
		console.log("Server running on port 8001");
	})
} else {

	const https = require('https')
	const fs = require('fs')

	const credentials = {
		key: fs.readFileSync('/etc/letsencrypt/live/w3software.net.br/privkey.pem', 'utf8'),
		cert: fs.readFileSync('/etc/letsencrypt/live/w3software.net.br/fullchain.pem', 'utf8')
	}

	const httpsServer = https.createServer(credentials, app)
	httpsServer.listen(81, () => {
		console.log('HTTPS Server running on port 81');
	})

	const http = require('http')
	http.createServer(app)    

}