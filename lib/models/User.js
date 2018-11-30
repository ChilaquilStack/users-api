"use strict"

const db =  require('../db')
const auth = require('../auth')

let all = () => {
    
    let query = 'select id, name, email from users'
    
    return new Promise( (resolve, reject) => {

    	db.query(query, (err, results, fields) => {
        
	        if(err)
	        	reject(err)
	        else
	        	resolve(results)
	    })

    })

}

let save = (user) => {

	let query = 'insert into users set ?'

	return new Promise( (resolve, reject) => {

	    db.query(query, {name: user.name, email: user.email, password: auth.encrypt(user.password)}, (err, results, fields) => {
	        
	        if(err)
	        	reject(err)

	        let insertId = results.insertId

	        let query = 'select id, name, email from users where id = ?'

	        db.query(query, insertId, (err, results, filds) => {
	            
	            if(err)
	            	reject(err)
	            
	            let user = results[0]
	            
	            resolve(user)
	        })	
	    
	    })
	
	})

}

let show = (id) => {

	let query = 'select id, name, email from users where id = ?'

	return new Promise( (resolve, reject) => {
            
        db.query(query, id, (err, results, fields) => {

            if(err)
            	reject(err)

            let user = results[0]

            if(!user)

                reject(new Error("user doesn't exist"))
    
            else
            	resolve(user)
    
        })
	})

}

let drop = (id) => {

	let query = 'select id, name, email from users where id = ?'

	return new Promise( (resolve, reject) => {

		db.query(query, id, (err, results, fields) => {

            if(err)
            	reject(err)
            
            if(results.length === 0) {
                
                reject(new Error("User doesn't exist"))
            
            } else {
                
                let user = results[0],
                    query = 'delete from users where id = ?'

                db.query(query, user.id, (err, results, fields) => {

                    if(err)
                    	reject(err)
                    
                    resolve(user)

                })
                
            }
        })
    })
}

let update = (new_user, id) => {

	let query = 'select id, name, email from users where id = ?'

	return new Promise( (resolve, reject) => {

        db.query(query, id, (err, results, fields) => {

            if(err)
            	reject(err)

            var user = results[0]
            
            if(!user) {
                
                reject(new Error("User doesn't exist"))
            
            } else {

            	query = 'update users set name = ?, email = ? where id = ?'

                db.query(query, [new_user.name, new_user.email, user.id], (err, results, fields) => {

                    if(err)
                    	reject(err)

                    db.query('select id, name, email from users where id = ?', user.id, (err, results, fields) => {

                        if(err)
                        	reject(err)
                        
                        let user = results[0]

                        resolve(user)
                        
                    })
                    
                })
            }
        })
    })

}

module.exports = {

	all,
	save,
	show,
	drop,
	update

}