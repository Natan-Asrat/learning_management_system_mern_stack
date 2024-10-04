require('dotenv').config();

const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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
        return response.status(400).json({ success: false, message: 'User already exists'});
    } 

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        userName, userEmail, role, password: hashPassword
    })
    await newUser.save()
    return response.status(201).json({
        success: true,
        message: 'User registered successfully!'
    })
}

const loginUser = async (request, response) => {
    const {userEmail, password} = request.body;
    const checkUser = await User.findOne({userEmail})
    if(!checkUser || !(await bcrypt.compare(password, checkUser.password))){
        return response.status(401).json({success: false, message: 'Invalid credentials'})
    }
    const accessToken = jwt.sign(
        {
            _id: checkUser._id,
            userName: checkUser.userName,
            userEmail: checkUser.userEmail,
            
            role: checkUser.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '1h'}
    )
    return response.status(200).json({
        success: true,
        message: 'User logged in successfully!',
        data: {
            accessToken,
            user: {
                _id: checkUser._id,
                userName: checkUser.userName,
                userEmail: checkUser.userEmail,
                role: checkUser.role
            }
        }
    })
}

module.exports = {registerUser, loginUser};