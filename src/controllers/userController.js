const bcrypt = require('bcrypt');
const auth = require('../auth');
const User = require('../models/userSchema');

//register user

module.exports.register = (req, res) => {
    const input = req.body;

    User.findOne({email: input.email})
    .then(result => {
        if(result !== null){
            return res.send(false)
        }else{
            let newUser = new User({
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
                password: bcrypt.hashSync(input.password, 10),
                friends: input.friends,
                location: input.location,
                occupation: input.occupation
            })
            newUser.save()
            .then(save => {
                return res.send(true)
            })
            .catch(err => {
                return res.send(err)
            })
        }
    })
    .catch(err => {
        return res.send(err)
    })

}

//LOGIN USER AND USER AUTHENTICATION

module.exports.login = (req,res) => {
    let input = req.body;

    User.findOne({email:input.email})
    .then(result => {
        if(result === null){
            //if the email is not yet registered
            return res.send(false)
        }else {
            const isPasswordCorrect = bcrypt.compareSync(input.password, result.password)
            if(isPasswordCorrect){
                return res.send({auth:auth.createAccessToken(result)})
            }else {
                //if password is incorrect
                return res.send(false)
            }
        }
    })
    .catch(error => {
        console.log(error)
    })
}

//Retreive All user

module.exports.retreive = (req,res) => {
    const userData = auth.decode(req.headers.authorization)
    if(!userData) {
        return res.send(false)
    } else {
        User.find({})
        .then(result => {
            res.send(result)
        })
        .catch(error => {
            console.log(error)
        })
    }
}

//This controller will get the details of the user

module.exports.userDetails = (req,res) => {
    let _id = req.params._id;

    User.findById(_id)
    .then(result => {
        res.send(result)
    })
    .catch(error => {
        return res.send(false);
    })
}