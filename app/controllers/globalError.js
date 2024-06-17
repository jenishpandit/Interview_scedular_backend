import AppError from './../../utils/AppError.js'

export const globalError = (err, req, res, next) => {

    if(err.code === 11000){
        const field = err.keyValue
        let message = "Dublicate"
        message = Object.keys(field)[0] + ' invalid or repeated'
        console.log(message);
        res.status(err.statusCode || 400).json({ 
            status: err.status || 'error',
            message: message
        });
    }

    // // 	{
	// 	"first_name" : "nikunj",
	// 	"last_name" : "italiya",
	// 	"email" : "abcd@gmail.com",
	// 	"phone_number" : "+919876543223",
	// 	"technology_id" : "666a9d73049faf8f82cc242f",
	// 	"type" : "WFH"
	// }

    res.status(err.statusCode || 500).json({
        status: err.status || 'error',
        message: err.message
    });
}