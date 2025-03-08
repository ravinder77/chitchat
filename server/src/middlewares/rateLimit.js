import rateLimit from 'express-rate-limit';

export const resetPasswordLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // limit each IP to 100 requests per windowMs
	message: 'Too many requests. Please try again later.',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
});
