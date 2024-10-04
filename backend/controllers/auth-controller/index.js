
const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const registerUser = async (request, response) => {
    const {userName, userEmail, password, role} = request.body;
    const existingUser = await User.findOne(
        {
            $or: [
                {userName: userName}, 
                {userEmail: userEmail}
            ]
        });
    if(existingUser){
        return response.status(400).json({message: 'User already exists'});
    } 

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        userName, userEmail, role, hashPassword
    })
    await newUser.save()
    return response.status(201).json({
        message: 'User registered successfully!'
    })
}

module.exports = {registerUser};