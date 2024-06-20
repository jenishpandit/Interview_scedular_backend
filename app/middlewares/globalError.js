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
    // let kind = err.errors.technology_name.kind;
    let kind = err.errors ? Object.values(err.errors).map(x => ({ ...x })) : [];
    let k = kind ? kind[0].kind : [];
    console.log("kind :", kind, "real kind : ", k);
    console.log("fgh", err.kind);
    // handelling duplicate key error
    if(err.code === 11000)
        {
            console.log("in the error repeatation field validation");
            const field = err.keyValue;
            message = Object.keys(field)[index] + ' : invalid or repeated';
            statusCode = 409;
            console.log(message);
        }

    // handelling required field error
    if(k === 'required')
        {
            console.log("in the error required field validation");
            message = kind[0].path + ' is required';
            console.log('error message : ', message);
        }

    // sending error response
    res.status(statusCode).json(
    {
        status : status ,
        message : message
    })
}

export default globalError;