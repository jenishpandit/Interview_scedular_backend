// // import AppError from './../../utils/AppError.js'

// const globalError = (err, req, res, next) => {

//     if(err.code === 11000){
//         const field = err.keyValue
//         let message = "Dublicate"
//         message = Object.keys(field)[0] + ' invalid or repeated'
//         console.log(message);
//         res.status(err.statusCode || 400).json({ 
//             status: err.status || 'error',
//             message: message
//         });
//     }

//     res.status(err.statusCode || 500).json({
//         status: err.status || 'error',
//         message: err.message
//     });
// }

const globalError = ( err, req, res, next) => {
    console.log('error : ',err);
    let statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    let message = err.message || 'an unknown error occurred';
    const errCode = err.code;
    let index = err.index;
    // let kind = err.errors.email.kind;
    // console.log(kind);
    // handelling duplicate key error
    if(err.code === 11000)
        {
            const field = err.keyValue;
            message = Object.keys(field)[index] + ' : invalid or repeated';
            statusCode = 409;
            console.log(message);
        }
    // handelling required field error
    // if(kind === 'required')
    //     {
    //         console.log('H E L L L   Y  E A   H');
    //     }
    // sending error response
    res.status(statusCode).json(
    {
        status : status ,
        message : message
    })
}

export default globalError;