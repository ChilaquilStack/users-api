"use strict"

const _ = require('lodash')

const db =  require('../db')

const auth = require('../auth')

const User = require('../models/User')

let index = async (req, res, next )  => {

    try {

        const users = await User.all()

        res.status(200).json({users}).end()

    } catch (error) {
        
        res.status(500).json({error}).end()
    
    }


}

let store = async (req, res, next) => {

    if(!req.body)

        res.status(403).json({error: true, message: 'request is empty'})

    let newUser = req.body;

    try {

        const user = await User.save(newUser)

        res.status(201).json({user}).end()
    
    } catch(error) {
        res.status(500).json({error}).end()
    }

}

let show = async (req, res, next) => {
        
    if(!req.params.id) {

        res.status(403).json({'error': true, 'message': 'No ID parameter'}).end();
    
    }

    else {

        let id = Number(req.params.id)

        try {

            const user = await User.show(id)
            
            res.status(200).json({user}).end()
       
        } catch(error) {
            
            res.status(500).json({error}).end()
        
        }

    }
}

let destroy = async (req, res, next) => {

    if(!req.params.id) {

        res.status(403).json({'error': true, 'message': 'No ID parameter'}).end();
    
    } else {

        let id = Number(req.params.id)
        
        try {
            
            const user = await User.drop(id)
            
            if(user)
                res.status(200).json({user}).end()
            else
                res.status(400).json({message:"User Doesn't Exist"}).end()

        } catch(error) {

            res.status(500).json({error}).end()

        }

    }
}

let update = async (req, res, next) => {

    if(!req.params.id) {

        res.status(403).json({'error': true, 'message': 'No ID parameter'}).end()
    
    } else if(!req.body) {
        
        res.status(403).json({'error': true, 'message': 'No request body'}).end()
    
    } else {

        let id = Number(req.params.id), newUser = req.body

        try {

            const user = await User.update(newUser, id)
            
            if(user){
                
                res.status(200).json({user}).end()
                
            } else {

                res.status(400).json({message: "User doesn't exist"}).end()
                
            }
            
        
        } catch (error) {

            res.status(500).json({error}).end()

        } 
                
    }
}

module.exports = {
    index,
    update,
    destroy,
    show,
    store
}