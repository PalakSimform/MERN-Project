import jwt from 'jsonwebtoken';

const sign = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let decodedData;
        if (token) {
            decodedData = jwt.verify(token, 'auth');
            req.userId = decodedData?.id;
        }
        next();
    } catch (error) {
        console.log('error');
        // You might want to send a response indicating an authentication error
        res.status(401).json({ message: 'Authentication failed' });
    }
};

export default sign;
