const express = require("express")
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt =  require('jsonwebtoken')
const config = require('config')
const validate = require('../../middleware/validate')
const authValidation = require('../../validations/auth.validation')
const catchAsync = require('../../utils/catchAsync')
const User = require('../../models/User')
//@route Post api/users
router.post('/', validate(authValidation.register), catchAsync( async (req,res)=> {

    const userBody = req.body;
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
      }
      const address = await getAddress(userBody.latitude, userBody.longitude);
      const userbody = {
        ...userBody,
        city: address.city,
        address: address.address,
      };
    const salt = await bcrypt.genSalt(10)
    userbody.password = await bcrypt.hash(password, salt)
    await User.create(userbody);

   
    //return jsonwebtoken
    const payload = {
        user: {
            id: user.id
        }
    }

    jwt.sign(payload, 
        config.get('jwtSecret'),
        { expiresIn: 360000},
        (err,token) =>{
            if(err)
                throw err
            res.json({token})
        } )

    
   
    //res.send('user route')
}))

module.exports = router