import jwt from 'jsonwebtoken';


export const generateToken = (userId, res) => {
	const token  = jwt.sign({ userId}, process.env.JWT_SECRET, {
		expiresIn: '90d',

	});

	res.cookie('jwt', token, {
		maxAge: 90 * 24 * 60 * 60 * 1000, //90 days
		httpOnly: true, // prevents XSS attacks 
		secure: process.env.NODE_ENV === 'production' ? true : false,  //
		sameSite: 'strict', // prevents cross-site request forgery attacks
	})

	return token;
}