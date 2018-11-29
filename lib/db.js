const mysql = require('mysql')
const connection = mysql.createConnection({

	host: 'localhost',
	database: 'api',
	user: 'root',
	password: ''

})

connection.connect(err => {
	if(err) throw err
})

module.exports = connection