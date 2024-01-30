require('./systems/database');

const PORT = process.env.PORT || 34015;
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');

const http = require('http').Server(app);

app.use(express.static('public'));
app.use(cors({ exposedHeaders: 'sec_token' }));
app.use(helmet());
app.use(compression());
app.use(bodyParser.json({ limit: '5000mb' }));
app.use(bodyParser.urlencoded({ limit: '5000mb', extended: false }));

app.set('trust proxy', true)



// var paymentSessionTimer = setInterval(function(){
// 	console.log(" paymentSessionTimer ");
// }, 2000);



// SOCKET IO
var io = require('socket.io')(http, {
	cors: {
		origin: ['http://localhost:3000', 'https://cms.multiverseexpert.io'],
		// methods: ["GET", "POST"]
		withCredentials: true,
	}
});

// emit = call client event by event name
io.on("connection", socket => {

	// console.log(" === Socket Connected ", socket.id);
	io.emit("connected", socket.id);

	socket.on('room-create', function(room) {
		socket.join(room);
		io.to(room).emit("room-created", room);
		console.log(" === room-create ", room);
	});

	socket.on('disconnect', function() {
		console.log('Socket disconnected', socket.id);
	});

})

app.set('socketio', io);
// SOCKET IO END



// SSE
const SSE = require('express-sse');
const sse = new SSE();

app.get('/sse', sse.init);
// app.post('/sse', async function (req, res) {
// 	sse.send("", 'event-name');
// 	res.json({ aa:"aa"})
// });
app.set('sse', sse);
// SSE END



// SSE CLIENTS
var sseClients = [];
app.set('sseClients', sseClients);

app.get('/sse/:inv', async function (req, res) {
	let key = req.params.inv

	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Connection': 'keep-alive',
		'Cache-Control': 'no-cache'
	});
	sseClients[key] = res;

	console.log(" SSE CLIENT : ", key)

	console.log(sseClients)

	req.on('close', () => {
		console.log(" SSE CLOSE :", key)
		sseClients = sseClients.filter((item, index) => { return index != key })
	});
});
app.post('/sse/callback', async function (req, res) { // FOR TEST

	console.log("req.body.invoice_no", req.body.invoice_no)

	let key = req.body.invoice_no;
	let client = sseClients[key];

	let response = {
		aaa: "ola"
	}

	client.write(`event: payment-qr-response\n`);
	client.write(`data: ${JSON.stringify(response)}\n\n`);
	client.end()

	res.json({  aaa: "sss" });

});
// SSE CLIENTS END


app.use('/1.0.0/', require('./api/api_1.0.0/beforeMiddlewareController'));
app.use('/cnbx/', require('./api/api_1.0.0/cnbxController'));

http.listen(PORT, function() {
    console.log('Server started on port ' + PORT + 'datetime: ' + new Date().toISOString());
});
