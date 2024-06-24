import multer from 'multer';
import { errorResponse } from "../utils/ResponseHandler.js";

const upload = multer({
    limits: {
        fileSize: 1024 * 1024 * 5
    },

    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|pdf|png)$/)) {
            return cb(new Error('Only image files are allowed!!'));
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
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            errorResponse(res, err.message, 400);
        } else if (err) {
            errorResponse(res, err.message, 400);
        }
        next();
    }).single('resume');
};

export default multerHandler;