//Libraries
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const njwt = require('njwt');

//Configs
const mongoconfig = require('./config/mongodb');
const secretKeys = require('./config/secretKeys');

//MongoDB Models
const User = require('./models/user');

//App initialization
const app = express()

//App port
const port = 3000;

//Establishment of connection to MongoDB
mongoose.connect('mongodb://' + mongoconfig.username + ':' + mongoconfig.password + '@' + mongoconfig.hostname + ':' + mongoconfig.port + '/' + mongoconfig.database, (err) => {
    if(err){
        console.log(err)
    }else{
        console.log('Successfully connected to mongoDB!')
    }
})

//Config of App
app.use(express.json())
app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
    next();
  
});

//Authentication
app.post('/auth/local/signup', (req, res) => {
    if(req.body){
        let { 
            email, 
            password, 
            first_name, 
            last_name 
            } = req.body
        User.findOne({email}, (err, docs) => {
            if(err){
                res.status(500).send(err)
            }else{
                if(docs){
                    res.status(226).json({msg: 'There is another user with same email.'})
                }else{
                    bcrypt.hash(password, 10, (err, hash) => {
                        let newUser = new User({
                            email,
                            password: hash,
                            first_name,
                            last_name
                        })
    
                        newUser.save((err) => {
                            if(err){
                                res.send(500).send(err)
                            }else{
                                res.status(201).json({msg: 'User created successfully!'})
                            }
                        })
                    })
                }
            }
        })
    }else{
        console.log("There is no body in request.")
        res.send(406).json({msg: 'There are is no body in request.'})
    }
})

app.post('/auth/local', (req, res) => {
    if(req.body){
        let {
            email,
            password
        } = req.body

        User.findOne({email}, (err, user) => {
            if(err){
                res.status(500).send(err)
            }else{
                if(user){
                    bcrypt.compare(password, user.password, (err, res2) => {
                        if(err){
                            console.log(err)
                            res.status(500).send(err)
                        }else{
                            if(res2){
                                let claims = {
                                    exp: (Date.now() + (10*60000)),
                                    iat: Date.now(),
                                }

                                let jwt = njwt.create(claims, secretKeys.jwtKey).compact()
                                var response = {jwt: jwt, user: user}

                                res.status(200).send(response);
                            }
                        }
                    })
                }else{
                    res.status(204).json({msg: 'There is no account with this email.'})
                }
            }
        })
    }else{
        console.log("There is no body in request.")
        res.send(406).json({msg: 'There are is no body in request.'})
    }
})

//User operations
app.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if(err){
            console.log(err)
            res.status(500).send(err)
        }else{
            res.status(200).send(users)
        }
    })
})

app.put('/users/:_id', (req, res) => {
    njwt.verify(req.headers.authorization, secretKeys.jwtKey, (err,verifiedJwt) => {
        if(err){
            res.status(500).json({
                msg: 'Token has expired!'
            })
        }else{
            if(req.params._id){
                Object.keys(req.body).map((bodyKey) => {
                    let value = req.body[bodyKey]

                    User.findOneAndUpdate({_id: req.params._id}, {$set: {[bodyKey]: value}}, (err, docs) => {
                        if(err){
                            console.log(err)
                            res.status(500).send(err)
                        }else{
                            res.status(200).send(docs)
                        }
                    })
                })
                
            }else{
                res.status(500).json({msg: "You haven't specified ID."})
            }
            
        }
    });
})

//App start
app.listen(port, () => {
    console.log('App has successfully started. Now you can do magic!')
})