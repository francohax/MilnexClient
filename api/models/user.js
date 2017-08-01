import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import uniqueValidator from 'mongoose-unique-validator';

var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    username: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date
    },
    emailVerificationCode: {
        type: String
    },
    passwordReset: {
        expirationDate: Date,
        passwordResetCode: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    roles: {
        type: [{ type: String, enum: ['user'] }],
        default: ['user']
    },
    image: {
        name: String,
        path: String
    }
});

userSchema.plugin(uniqueValidator, {
    caseInsensitive: true
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.isValidPassword = function (password) {
    var user = this;

    return bcrypt.compareSync(password, user.password);
};

userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.password;
        return ret;
    }
});

module.exports = mongoose.model('User', userSchema);