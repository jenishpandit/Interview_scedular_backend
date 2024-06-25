export const successResponse = (res, data, message = "Success", code = 200) => {
    res.status(code).json({
        code,
        message,
        data
    });
};

export const errorResponse = (res, message = "An error occurred", code = 500) => {
    res.status(code).json({
        code,
        message
    });
};

// export const errorResponse = ( err, req, res, next) => {
//     console.log('error : ',err);
//     let statusCode = err.statusCode || 500; // 200
//     const status = err.status || 'error';
//     let message = err.message || 'an unknown error occurred';
//     const errCode = err.code;
//     let index = err.index;
//     console.log('statusCode : ',statusCode);
//     console.log('status : ',err.status);
//     console.log('message : ',message);
//     // let kind = err.errors.technology_name.kind;
//     let kind = err.errors ? Object.values(err.errors).map(x => ({ ...x })) : [];
//     let k = kind ? kind[0].kind : [];
//     console.log("=============kind :", kind, "real kind : ", k);
//     console.log("==============err.kind :", err.kind);
//     // handelling duplicate key error
//     if(err.code === 11000)
//     {
//         console.log("in the error repeatation field validation");
//         const field = err.keyValue;
//         message = Object.keys(field)[index] + ' : invalid or repeated';
//         statusCode = 409;
//         console.log(message);
//     }
//
//     // handelling required field error
//     if(k === 'required')
//     {
//         console.log("in the error required field validation");
//         message = kind[0].path + ' is required';
//         console.log('error message : ', message);
//     }
//
//     // sending error response
//     res.status(statusCode).json(
//         {
//             status : status ,
//             message : message
//         })
// }
