const mongoose = require('mongoose')
const User = mongoose.model("User")

const bcrypt = require('bcryptjs');

exports.signUp = (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        return res.status(422).json({ error: "Please add all the fields" })
    }

    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(400).json({ error: "User already exist with that email" })
            }
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email,
                        password: hashedPassword,
                        name,
                        pic
                    })

                    user.save()
                })
        })
        .catch(err => {
            console.log(err)
        })
};


exports.signIn = (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ error: "Please provide email and passowrd" })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(400).json({ error: "Invalid email or password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // res.json({ message: "Successfully Signed In" })
                        const token = jwt.sign({_id: savedUser._id}, process.env.JWT_SECRET)
                        const {_id, name, email} = savedUser
                        res.json({token, user:{_id, name, email}})
                    } else {
                        res.status(400).json({ error: "Invalid email or password" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
}
