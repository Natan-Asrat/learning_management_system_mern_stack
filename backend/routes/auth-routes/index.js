const express = require('express')
const authenticate = require('../../middleware/auth-middleware')
const {registerUser, loginUser} = require('../../controllers/auth-controller/index')
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/check-auth', authenticate, (request, response)=>{
    const user = request.user;
    response.status(200).json({
        success: true,
        message: 'User is authenticated',
        data: {
            user
        }
    })
})
module.exports = router;