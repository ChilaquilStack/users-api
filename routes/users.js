"use strict"

const express = require('express');

const router = express.Router();

const _ = require('lodash')

<<<<<<< HEAD
const crypto = 	require('crypto')

const algorithm = 'aes-128-cbc'

const password = 'Ap1_$R3Z7;'

var users = []


let encrypt = ( text ) => {
	
	let key = crypto.createCipher(algorithm, password),
		str = key.update(text, 'utf8', 'hex')
	
	str += key.final('hex');
	
	return str;

}

let decrypt = ( hash )  => {

	let key = crypto.createDecipher(algorithm, password),
		str = mykey.update(hast, 'hex', 'utf8')
	
	str += mykey.final('utf8');
	
	return str 

}


/* GET users listing. */
router

.get('/', (req, res, next) => {

	res.status(200).json({users}).end();

=======
const db =  require('../lib/db')

const auth = require('../lib/auth')

/* GET users listing. */
router

.get('/', (req, res, next) => {

	let query = 'select id, name, email from users'

	db.query(query, (err, results, fields) => {
		
		if(err) throw err

		let users =  results
		
		res.status(200).json({users}).end();
	
	})


>>>>>>> mysql
})

.post('/', (req, res, next) => {
	
<<<<<<< HEAD
	if(!req.body) {

		res
		.status(403)
		.json({error: true, message: 'request is empty'})
	
	}

	let user = req.body;
	
	user.id = Date.now()

	user.password = encrypt(user.password)

	users.push(user);
	
	res.status(201).json({user}).end();
	
=======
	if(!req.body)

		res.status(403).json({error: true, message: 'request is empty'})

	let user = req.body;

	let query = 'insert into users set ?'
	
	db.query(query, {name: user.name, email: user.email, password: auth.encrypt(user.password)}, (err, results,fields) => {
		
		if(err) throw err

		let insertId = results.insertId

		let query = 'select id, name, email from users where id = ?'

		db.query(query, insertId, (err, results, filds) => {
			
			if(err) throw err

			let user = results[0]
			
			res.status(201).json({user}).end();
		
		})	
	
	})
>>>>>>> mysql

})

.get('/:id', (req, res, next) => {

	if(!req.params.id) {
<<<<<<< HEAD
		res.status(403).json({'error': true, 'message': 'No ID parameter'}).end();
	}
=======

		res.status(403).json({'error': true, 'message': 'No ID parameter'}).end();
	
	}

>>>>>>> mysql
	else {

		let id = Number(req.params.id)

<<<<<<< HEAD
		let user = _.find(users, {'id': id} )

		if(!user)
			res.status(403).json({'error': true, 'message': "User doesn't exist"}).end();
		else
			res.status(200).json({user}).end();
=======
		let query = 'select id, name, email from users where id = ?'
			
		db.query(query, id, (err, results, fields) => {

			if(err) throw err

			let user = results[0]

			if(!user) {

				res.status(403).json({'error': true, 'message': "User doesn't exist"}).end();
	
			}
	
			else {
		
				res.status(200).json({user}).end()
	
			}
			
		})
>>>>>>> mysql
	}

})

.delete('/:id', (req, res, next) => {

	if(!req.params.id) {
<<<<<<< HEAD
		res.status(403).json({'error': true, 'message': 'No ID parameter'}).end();
	}
	else {

		var id = Number(req.params.id),
			userIndex = _.findIndex(users, {'id': id} )

		if(userIndex == -1) {
			res.status(403).json({'error': true, 'message': "User doesn't exist"}).end();
		}
		else{
			let user = users[userIndex]
			users.splice(userIndex, 1)
			res.status(200).json({user}).end();
		}
=======

		res.status(403).json({'error': true, 'message': 'No ID parameter'}).end();
	
	} else {

		let id = Number(req.params.id), query = 'select id, name, email from users where id = ?'

		db.query(query, id, (err, results, fields) => {

			if(err) throw err
			
			if(results.length === 0) {
				
				res.status(403).json({'error': true, 'message': "User doesn't exist"}).end();
			
			} else {
				
				let user = results[0],
					query = 'delete from users where id = ?'

				db.query(query, user.id, (err, results, fields) => {

					if(err) throw err
					
					res.status(200).json({user}).end();

				})
				
			}
		})
>>>>>>> mysql
	}

})

.post('/:id', (req, res, next) => {

	if(!req.params.id) {
<<<<<<< HEAD
		res.status(403).json({'error': true, 'message': 'No ID parameter'}).end();
	}
	else {

		var id = Number(req.params.id),
			user = _.find(users, {'id': id} )

		if(!user) {
			res.status(403).json({'error': true, 'message': "User doesn't exist"}).end();
		}
		else {
			if(req.body) {
				let new_user = req.body
				Object.keys(new_user).forEach(key => user[key] = new_user[key])
				res.status(200).json({user}).end();
			} else {
				res.status(404).json({'message': 'No request body', 'error': true})
			}
		}
=======

		res.status(403).json({'error': true, 'message': 'No ID parameter'}).end();
	
	} else {

		let id = Number(req.params.id),
			query = 'select id, name, email from users where id = ?'

		db.query(query, id, (err, results, fields) => {

			if(err) throw err

			var user = results[0]
			
			if(!user) {
				
				res.status(403).json({'error': true, 'message': "User doesn't exist"}).end();
			
			} else {
				
				if(req.body) {

					let new_user = req.body, 
						query = 'update users set name = ?, email = ? where id = ?'

					db.query(query, [new_user.name, new_user.email, user.id], (err, results, fields) => {

						if(err) throw err

						db.query('select id, name, email from users where id = ?', user.id, (err, results, fields) => {

							if(err) throw err

							let user = results[0]

							res.status(200).json({user}).end();
							
						})
						
					})
				
				} else {
					
					res.status(404).json({'message': 'No request body', 'error': true})
				
				}
			}
		})
>>>>>>> mysql
	}	

})

module.exports = router;
