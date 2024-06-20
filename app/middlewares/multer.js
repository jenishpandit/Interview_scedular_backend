import multer from 'multer';

// const upload = multer({
//     limits: {
//       fileSize: 5000000 // 5MB
//     },
//     fileFilter(req, file, cb) {
//       if (!file.originalname.match(/\.(jpg|jpeg|pdf|png)$/)) {
//         return cb(new Error('Only image files are allowed!!'));
//       }
//       cb(null, true);
//     },
//     storage: multer.diskStorage({
//       destination(req, res, cb) {
//         cb(null, '../fileUploads');
//       },
//       filename(req, file, cb) {
//         cb(null, Date.now() + file.originalname);
//       }
//     })
//   });

const upload = multer.diskStorage({
  destination : (req,res,cb) => {
      cb(null,'./uploads');
  },
  filename : (req,file,cb) => {
      cb(null,Date.now()+file.originalname);
  }

})
const imageupload = multer({storage : upload}).single('resume');

export default imageupload;