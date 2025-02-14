import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
      
        
        if (!token) {
            return res.status(401).json( // 401 is unauthorised
                {
                    message: 'User is unauthorised Kindly Login First',
                    success: false
                }
            );
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Token is invalid",
                success:false
            } )
        }
         
        // Flow of this 
        // so when the user logs in, they get a special code (token) that contains their uder ID
        // When they make requests, they send this token. The code checks that the code is valid or not 
        // if it is valid then it extracts the user ID from the token 
        //It then attaches this user ID to the request object (req) as req.id and then it uses that user ID to find the user in the database

        // =>> It is useful because
        //Now any code that handles this request can access the user's ID using req.id
        //It helps identify which user is making the request
        //This is commonly used to check if a user has permission to access certain data or perform certain actions

        req.id = decode.userId // req.id is the user id that extracted from the token

        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({ // Handle server errors
            message: 'Internal Server Error',
            success: false
        })
    }
}
export default isAuthenticated;





