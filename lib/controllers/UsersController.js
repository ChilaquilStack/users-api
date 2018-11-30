"use strict"

const _ = require('lodash')

const db =  require('../db')

const auth = require('../auth')

const User = require('../models/User')

let index = (req, res, next )  => {

    User
    .all()
    .then(users => res.status(200).json({users}).end())
    .catch(error => res.status(500).json({error}).end())

}

let store = (req, res, next) => {

    if(!req.body)

        res.status(403).json({error: true, message: 'request is empty'})

    let user = req.body;

    User.save(user).then(user => res.status(201).json({user}).end())

}

let show = (req, res, next) => {
        
    if(!req.params.id) {

        res.status(403).json({'error': true, 'message': 'No ID parameter'}).end();
    
    }

    else {

        let id = Number(req.params.id)

        User
        .show(id)
        .then(user => res.status(200).json({user}).end())
        .catch(error => res.status(500).json({message: error}).end())

    }
}

let destroy = (req, res, next) => {

    if(!req.params.id) {

        res.status(403).json({'error': true, 'message': 'No ID parameter'}).end();
    
    } else {

        let id = Number(req.params.id)

        User
        .drop(id)
        .then(user => res.status(200).json({user}).end())
        .catch(error => res.status(500).json({message: error}).end())
    }
}

let update = (req, res, next) => {

    let id, user;

    if(!req.params.id) {

        res.status(403).json({'error': true, 'message': 'No ID parameter'}).end()
    
    } else if(!req.body) {
        
        res.status(403).json({'error': true, 'message': 'No request body'}).end()
    
    } else {

        id = Number(req.params.id), 
        user = req.body

        User
        .update(user, id)
        .then(user => res.status(200).json({user}).end())
        .catch(err => res.status(500).json({message: err}).end())            
    }
}

module.exports = {
    index,
    update,
    destroy,
    show,
    store
}