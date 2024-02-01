var jwt = require('jsonwebtoken');

   const auth = async(req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
        try {
            if(!token){
                res.status(400).send({ "msg": "token is not provided" })
            }
                const decoded =jwt.verify(token, 'gullu');
                  req.userId = decoded.userId;
                  req.role = decoded.role;
                     next()

        } catch (error) {
            res.status(400).send({ "err": error.measaage })
        }
   }
   const roleMiddleware = (role) => {
    return (req, res, next) => {
        if (req.role === role) {
            next();
        } else {
            return res.status(403).json({ message: 'You are not authorized to access this resource' });
        }
    };
};

   module.exports = {auth,roleMiddleware};