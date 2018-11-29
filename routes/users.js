"use strict"

const express = require('express');

const router = express.Router();

const _ = require('lodash')

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

})

.post('/', (req, res, next) => {
	
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
	

})

.get('/:id', (req, res, next) => {

	if(!req.params.id) {
		res.status(403).json({'error': true, 'message': 'No ID parameter'}).end();
	}
	else {

		let id = Number(req.params.id)

		let user = _.find(users, {'id': id} )

		if(!user)
			res.status(403).json({'error': true, 'message': "User doesn't exist"}).end();
		else
			res.status(200).json({user}).end();
	}

})

.delete('/:id', (req, res, next) => {

	if(!req.params.id) {
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
	}

})

.post('/:id', (req, res, next) => {

	if(!req.params.id) {
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
	}	

})

module.exports = router;
