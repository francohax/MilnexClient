var User = require('../models/user');

exports.uploadAvatar = function (req, res) {
    if (req.file) {
        User.findById(req.user._id, function (err, user) {
            if (err) {
                console.log(err);
            }

            var protocol = req.protocol;
            var host = req.get('host');
            console.log("HOST : " + host);
            var filePath = protocol + "://" + host + "/imgs/app/avatars/" + req.user._id + "/";
            user.avatar = filePath + req.file.filename;
            user.save(function (err) {
                if (err) {
                    return res.send(err);
                }
                console.log("Profile Picture saved!");
                return res.status(200).json(user.avatar);
                //res.end('good');
            });
        });
    }
};


