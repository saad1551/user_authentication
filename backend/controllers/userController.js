const User = require("../models/userModel");

const registerUser = async(req, res) => {
    const { name, email, password, password2 } = req.body;

    if (!name || !email || !password || !password2) {
        return res.status(400).send("Please enter all the fields");
    }

    if (password.length < 6) {
        return res.status(400).send("Password must be a minimum of 6 characters");
    }

    if (password.length > 30) {
        return res.status(400).send("Password must be a maximum of 30 characters");
    }

    if (password !== password2) {
        return res.status(400).send("Passwords must match");
    }

    const existingUser = await User.findOne({email});

    if (existingUser) {
        return res.status(400).send("A user already exists with this email");
    }

    const user = await User.create({
        name, email, password
    });

    if (!user) {
        return res.status(400).send("Could not register user");
    } else {
        return res.status(201).json({name, email});
    }
};

module.exports = {
    registerUser
};