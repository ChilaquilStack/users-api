"use strict"
const   express = require('express'),
        router = express.Router(),
        usersCtrl = require('../lib/controllers/UsersController')

router

.get('/', usersCtrl.index)

.post('/', usersCtrl.store)

.get('/:id', usersCtrl.show)

.delete('/:id', usersCtrl.destroy) 

.post('/:id', usersCtrl.update)

module.exports = router;