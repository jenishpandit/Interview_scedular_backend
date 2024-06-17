import AppError from './../../utils/AppError.js'

export const globalError = (err, req, res, next) => {

    if(err.code === 11000){
        const field = err.keyValue
        const message = "Dublicate"
        console.log( Object.keys(field)[0])
        res.status(err.statusCode || 400).json({
            status: err.status || 'error',
            message: message
        });
    }

    res.status(err.statusCode || 500).json({
        status: err.status || 'error',
        message: err.message
    });
}