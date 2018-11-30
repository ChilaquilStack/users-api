"use strict"

const   _ = require('lodash'),
        app = require('../app'),
        db = require('../lib/db'),
        request = require('supertest'),
        expect = require('chai').expect,
        user1 = { name: 'Edgar Villegas', email: 'edgar.villegas@jalisco.gob.mx', password: '123456' }

describe('API', () => {

    after('Truncar la base de datos', () => {
        
        db.query('truncate table users', (err, resuls, fields) => {
            if(err) throw err
        })
    
    })

    describe('GET /users', () => {

        it('Should return all users', (done) => {

            let url = '/users', u1 = {}, u2 = {}

            request(app)
                .post(url)
                .send(user1)
                .expect(201)
                .expect('Content-Type', /json/)
                .set('Accept', 'application/json')
                .then( (res) => {
                    expect(res.body).to.have.property('user')
                    u1 = res.body.user
                    return request(app)
                        .post(url)
                        .send(user1)
                        .expect(201)
                        .expect('Content-Type', /json/)
                        .set('Accept', 'application/json')
                })
                .then((res) => {
                    expect(res.body).to.have.property('user')
                    u2 = res.body.user
                    return request(app)
                        .get('/users')
                        .set('Accept', 'application/json')
                        .expect(200)
                        .expect('Content-Type', /json/)
                })
                .then((res) => {
                    
                    let body = res.body
                    expect(body).to.have.property('users')
                    let users = body.users
                    expect(users).to.be.an('array')
                    let usr1 = _.find(users, {id: u1.id})
                    let usr2 = _.find(users, {id: u2.id})
                    expect(usr1).to.have.property('id', u1.id)
                    expect(usr1).to.have.property('name', u1.name)
                    expect(usr1).to.have.property('email', u1.email)
                    done()
                
                })
        })

    })

    describe('POST /users 201', () => {

        it('Should Send A User', (done) => {

            let url = '/users'

            request(app)
                .post(url)
                .send(user1)
                .expect(201)
                .expect('Content-Type', /json/)
                .set('Accept', 'application/json')
                .end((err, res) => {
                    if(err) throw err
                    expect(res.body).to.have.property('user')
                    let user = res.body.user
                    expect(user).to.have.property('name','Edgar Villegas')
                    expect(user).to.have.property('email','edgar.villegas@jalisco.gob.mx')
                    expect(user).to.have.property('id')
                    done()
                })

        })

    })

    describe('GET /users/:id', () => {

        it('Should return one movie', (done) => {

            //Primero agregarmos un nuevo usuario
            var usuario = {}

            request(app)
                .post('/users')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .send(user1)
                .then((res) => {

                    expect(res.body).to.have.property('user')

                    usuario = res.body.user

                    return request(app)
                    .get(`/users/${usuario.id}`)
                    .set('Accept', 'application/json')
                    .expect(200)
                    .expect('Content-Type', /json/)

                })
                .then((res) => {

                    expect(res.body).to.have.property('user')
                    let user = res.body.user
                    expect(user).to.have.property('id', usuario.id)
                    expect(user).to.have.property('name', usuario.name)
                    expect(user).to.have.property('email', usuario.email)
                    done()
                
                }, done)

        })

    })

    describe('DELETE /users/:id 200', () => {
        it('Delete User', (done) => {

            //Primero creamos un usario para despues eliminarlo
            
           let url = '/users'

            request(app)
                .post(url)
                .send(user1)
                .expect(201)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .then(res => {

                    expect(res.body).to.have.property('user')
                    let user = res.body.user
                    let url  = `/users/${user.id}`
                    return request(app)
                    .delete(url)
                    .set('Accept', 'application/json')
                    .expect(200)
                    .expect('Content-Type', /json/)
                })
                .then( res => {

                    expect(res.body).to.have.property('user')
                    let user = res.body.user
                    expect(user).to.have.property('id')
                    expect(user).to.have.property('name')
                    expect(user).to.have.property('email')
                    done()
                
                })      
        })
    
    })

    describe('PUT /:id 200', () => {

        it('UPDATE User', (done) => {

            request(app)
            .post('/users')
            .send(user1)
            .expect(201)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.have.property('user')
                let user = res.body.user
                let new_user = { name: 'Manuel Hernandez', email: 'manuel.hernandez@gmail.com'}
                return request(app)
                .post(`/users/${user.id}`)
                .send(new_user)
                .expect(200)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
            })
            .then(res => {
                expect(res.body).to.have.property('user')
                let user = res.body.user
                expect(user).to.have.property('id')
                expect(user).to.have.property('name')
                expect(user).to.have.property('email')
                done()
            })
        })
    })

    describe('POST /auth 200', () => {
        
        it('Auth user', (done) => {

            let url = '/users'

            request(app).post(url).expect(201).set('Accept','application-json').expect('Content-Type', /json/).send(user1)
            .then(res => {
                let url = '/auth/login'
                expect(res.body).to.have.property('user')
                return request(app).post(url).expect(201).set('Accept', 'application-json').expect('Content-Type', /json/).send(user1)
            }).then(res => {
                expect(res.body).to.have.property('token')
                done()
            })

        })
    })

})