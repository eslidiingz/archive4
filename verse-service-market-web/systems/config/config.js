let config
config = {
	"DB": {
		// "URL": 'mongodb+srv://mip_admin:Mip12345!@cluster0.4krms.mongodb.net/walletdb?retryWrites=true&w=majority',
		// "URL": 'mongodb+srv://magajeud:1q2w3e@magadb.ohtiu.mongodb.net/testdb',
		// "URL": 'mongodb+srv://doadmin:rk23C4m165S0Nds9@db-mongodb-chat-bad04563.mongo.ondigitalocean.com/admin', //<-- kk db (****ยังไม่มี domain) http://188.166.241.231:4015/1.0.0/postTest
		// "URL": 'mongodb+srv://doadmin:a38wdc4R10ETA692@multipay-db-test-9763bfba.mongo.ondigitalocean.com/admin', //<-- mip db https://wallet.multipay.finance/1.0.0/postTest
		// "URL": 'mongodb://mexpay:BVRNaMZMXqQM@128.199.133.65:37017/mexpay', // MEXPAY DATABASE
		"URL": 'mongodb://mutiuser:dev1Mip@134.209.108.190:27017/mutipayment', // MULTIPAY DATABASE
		"NAME": '',
		"USER": '',
		"PASS": '',
		"TYPE": 'MONGO_SERVER'
	}
}

module.exports = config