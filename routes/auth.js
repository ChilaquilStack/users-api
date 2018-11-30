"use strict"

<<<<<<< HEAD
<<<<<<< HEAD
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.post('/login', (req, res, next) => {

=======
=======
>>>>>>> MVC
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const db = require('../lib/db')
const auth = require('../lib/auth')

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

					let token = jwt.sign({"id": system_user.id, "email": system_user.email}, 'S3Cr3T', {
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

<<<<<<< HEAD
>>>>>>> mysql
=======
>>>>>>> MVC
})

router.get('/logout', (req,res,next) => {
	
})

module.exports = router