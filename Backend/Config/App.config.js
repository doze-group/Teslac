const Multer = require('multer');
const path = require('path');
const Cloudinary = require('cloudinary').v2;

//this enviroment variables
exports.Config = {
    Port: process.env.PORT || 3000,
    Db: process.env.MONGO || 'mongodb://localhost:27017/teslac',
    Token: process.env.Token ||'KJSFHUASIFHWFIHhnfiufghskffjasdfkasdfhakjfhw2w846284284LNDLKFDNSJKLN',
    Encrypt: process.env.Encrypt || 'FHFWIUFHEFUEFHNJDSFNDsknskfnwiwikwfwf.fror2-rp29o2292--<'
}

//Storage configuration multer
function disk(id) {
    return Multer.diskStorage({
        destination: path.join(__dirname, '../Uploads'),
        filename: (req, file, cb) => {
            cb(null, id + path.extname(file.originalname));
        }
    });
}

//Export Configuration multer
exports.Storage = (id) => {
    return Multer({
        storage: disk(id),
        limits: { fileSize: 5000000 }
    }).single('image');
}

//this enviroment variables
//Config Cloudinary
Cloudinary.config({
    cloud_name: 'dmenzuvrf',
    api_key: '183231141131464',
    api_secret: '3Lrdv-nGR3Io7hpuNPMGM9At7i4'
});

exports.Cloudinaryv2 = Cloudinary;