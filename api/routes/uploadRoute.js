import multer from 'multer';
import passport from 'passport';
var fs = require('fs');

module.exports = (app, express) => {
    var uploadCtrl = require('../controllers/upload');
    var uploadRouter = express.Router();

    uploadRouter.all('*', function (req, res, next) {
        passport.authenticate('bearer', function (err, user, info) {
            if (err) return next(err);
            if (user) {
                req.user = user;
                return next();
            } else {
                console.log("Entered in passport, unauthorized");
                return res.status(403).json({status: 'error', code: 'unauthorized'});
            }
        })(req, res, next);
    });

    app.use('/upload', uploadRouter);

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            console.log("MULTER " + req.originalUrl);
            if (req.originalUrl == "/upload/avatar") {
                var avatarsFolder = './public/imgs/app/avatars';
                var dest = './public/imgs/app/avatars/' + req.user._id;
                if (!fs.existsSync(avatarsFolder)) {
                    fs.mkdirSync(avatarsFolder);
                }
                if (!fs.existsSync(dest)) {
                    fs.mkdirSync(dest);
                }
                cb(null, dest)
            } else if (req.originalUrl == "/upload/postDocuments") {
                var docsFolder = './public/documents';
                var dest = './public/documents/' + req.user._id;
                if (!fs.existsSync(docsFolder)) {
                    fs.mkdirSync(docsFolder);
                }
                if (!fs.existsSync(dest)) {
                    fs.mkdirSync(dest);
                }
                cb(null, dest)
            }
        },
        filename: function (req, file, cb) {
            console.log("Multer reached : " + file.originalname);
            if (req.originalUrl == "/upload/avatar") {
                // var user = JSON.parse(JSON.stringify(req.user));
                cb(null, file.originalname);
            }
            else if (req.originalUrl == "/upload/postDocuments") {
                // var user = JSON.parse(JSON.stringify(req.user));
                cb(null, file.originalname);
            }
            else {
                var name = req.body.imageId;
                cb(null, name);
            }
        }
    });

    uploadRouter.use(multer({storage: storage}).single('file'));

    uploadRouter.route('/avatar').post(uploadCtrl.uploadAvatar);
};