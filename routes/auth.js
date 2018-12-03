"use strict"

const 	jwt = require('jsonwebtoken'),
		express = require('express'),
		router = express.Router(),
		db = require('../lib/db'),
		auth = require('../lib/auth')

router.post('/login', (req, res, next) => {

	if(!req.body) {

		res.status(403).json({'error': true, 'message': "Request doesn't have body"}).end()
	
	} else {

		let send_user = req.body,
			query = 'select id, name, email, password from users where email = ?'
		
		db.query(query, send_user.email, (err, results, fields) => {

			if(err) throw err

			if(results.length > 0){

				let system_user = results[0]

				if(auth.encrypt(send_user.password) === system_user.password) {


					let token = jwt.sign({"id": system_user.id, "email": system_user.email, "name": system_user.name}, 'S3Cr3T', {
						expiresIn: '24hr'
					})

					res.status(201).json({token}).end()

				} else {

					res.status(403).json({"error": true, message: "Fail Authentication"}).end()

				}

			} else{

				res.status(403).json({"error": true, message: "User Doesn't exist"}).end()
			
			}

		})

		
	}

})

router.get('/logout', (req,res,next) => {
	
})

module.exports = router