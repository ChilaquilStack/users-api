"use script"

const crypto = 	require('crypto')
const algorithm = 'aes-128-cbc'
const password = 'Ap1_$R3Z7;'

let encrypt = ( text ) => {
	
	let key = crypto.createCipher(algorithm, password),
		str = key.update(text, 'utf8', 'hex')
	
	str += key.final('hex');
	
	return str;

}

let decrypt = ( hash )  => {

	let key = crypto.createDecipher(algorithm, password),
		str = key.update(hash, 'hex', 'utf8')
	
	str += mykey.final('utf8');
	
	return str 

}

module.exports = {

	encrypt,
	decrypt

}