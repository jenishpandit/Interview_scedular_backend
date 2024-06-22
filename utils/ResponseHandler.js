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
