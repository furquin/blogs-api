const { emailExists } = require('../services/user');

const validDisplayName = (req, res, next) => {
    const { displayName } = req.body;

    try {
        if (displayName.length < 8) {
            return res
                .status(400)
                .json({ message: '\'displayName\'  length must be ate least 8 characters long' });
        }
        next();
    } catch (e) {
        next(e);
    }
};

const validEmail = (req, res, next) => {
    const { email } = req.body;

    try {
        const validateEmail = /^([a-zA-z0-9]+)@([a-zA-Z]+)\.([a-zA-Z]){2,8}$/;

        if (!email) {
            return res.status(400).json({ message: '\'email\'is required' });
        }
        
        if (validateEmail.test(email) === false) {
            return res.status(400).json({ message: '\'email\' must be a valid email' });
        }

        next();
    } catch (e) {
        next(e);
    }
};

const checkEmailExists = async (req, res, next) => {
    const { email } = req.body;
    try {
    const exists = await emailExists(email);

    if (exists) {
         return res.status(409).json({ message: 'User already registered' });
    }
        next();
    } catch (e) {
        next(e);
    }
};

const validPassword = (req, res, next) => {
    const { password } = req.body;

    try {
    if (password.length < 6) {
        return res.status(400).json({ message: '\'password\' length must be 6 characters long' });
    }
    if (!password) {
        return res.status(400).json({ message: '\'password\' is required' });
    }
         
        next();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    validDisplayName,
    validEmail,
    checkEmailExists,
    validPassword,
};