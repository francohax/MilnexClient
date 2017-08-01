import User from '../models/user';

exports.me = function (req, res) {
    var promise = User.findById(req.user._id).exec();
    promise.then(user => {
        return res.status(200).json(user);
    }).catch(err => {
        return res.status(500).json({error: "Could not get user"});
    });
};
