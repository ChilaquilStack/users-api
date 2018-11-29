"use strict"

const jwt = require('jsonwebtoken')
const password = 'S3Cr3T'

const auth = (req, res, next) => {
	
	const token = req.body.token || req.query.token || req.headers['x-access-token']
	
	if(token){

		jwt.verify(token, password, (error, decode) => {
			if(error) {

				res.status(403).json({'error': true, 'message': error}).end()
			
			} else {

				req.decode = decode
				
				next()

			}
		})

	} else {

		res.status(403).json({'message': "You're not authenticated"}).end()

	}

}

module.exports = auth