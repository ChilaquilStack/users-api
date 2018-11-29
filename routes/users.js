"use strict"

const express = require('express');

const router = express.Router();

const _ = require('lodash')

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


})

.post('/', (req, res, next) => {
	
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

})

.get('/:id', (req, res, next) => {

	if(!req.params.id) {

		res.status(403).json({'error': true, 'message': 'No ID parameter'}).end();
	
	}

	else {

		let id = Number(req.params.id)

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
	}

})

.delete('/:id', (req, res, next) => {

	if(!req.params.id) {

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
	}

})

.post('/:id', (req, res, next) => {

	if(!req.params.id) {

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
	}	

})

module.exports = router;
