const request = require("supertest")
const app = require('./index')
const mongoose = require('mongoose')

describe('Backend Test', () => {

    beforeAll(async () => {

        await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }).then(() => console.log('connected')).catch(err => console.log("error", err))
    })

    test('Main route', () => {
        return request(app).get('/')
            .then(res => {
                expect(res.statusCode).toBe(200)
            })
    })



    test('Register route', () => {
        const payload = {
            firstName: 'dera',
            lastName: 'kiisi',
            email: 'kiisi@gmail.com',
            officeAddress: 'abcdefgh',
            typeOfBusiness: 'codes',
            password: '1234567890',
            password2: '1234567890'
        }
        return request(app).post('/users/register')
            .type('form')
            .set('Accept', 'application/json')
            .send(payload)
            .then(res => {
                console.log(res)
                expect(res.statusCode).toBe(201)
            })
    })

})