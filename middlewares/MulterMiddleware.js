import multer from 'multer';
import { errorResponse } from "../utils/ResponseHandler.js";

const upload = multer({
    limits: {
        fileSize: 1024 * 1024 * 5
    },

    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|pdf|png|docx)$/)) {
            return cb(new Error('Allowed only this type of file [jpg|jpeg|pdf|png|docx]!'));
        }
        cb(null, true);
    },

    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './uploads');
        },
        filename(req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    })
})

const multerHandler = (req, res, next) => {
    upload.single('resume')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            errorResponse(res, err.message, 400);
            console.log("multerHandler");
        } else if (err) {
            errorResponse(res, err.message, 400);
            console.log("multerHandlesdewqeqwer");
        } else {
            next(); // Proceed to the next middleware if no errors
        }
    });
};
export default multerHandler;