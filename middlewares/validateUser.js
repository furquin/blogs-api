const { emailExists, login, getUserById } = require('../services/user');

const validDisplayName = (req, res, next) => {
    const { displayName } = req.body;

    try {
        if (displayName.length < 8) {
            return res
                .status(400)
                .json({ message: '"displayName" length must be at least 8 characters long' });
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

        if (email === '') {
            return res.status(400).json({ message: '"email" is not allowed to be empty' });
        }

        if (!email) {
            return res.status(400).json({ message: '"email" is required' });
        }
        
        if (validateEmail.test(email) === false) {
            return res.status(400).json({ message: '"email" must be a valid email' });
        }

        next();
    } catch (e) {
        next(e);
    }
};

const checkEmailExists = async (req, res, next) => {
    const { email } = req.body;
    try {
        const exist = await emailExists(email);

    if (exist !== null) {
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
    if (password === '') {
            return res.status(400).json({ message: '"password" is not allowed to be empty' });
        }    
        
    if (!password) {
            return res.status(400).json({ message: '"password" is required' });
    }
        
    if (password.length < 6) {
        return res.status(400).json({ message: '"password" length must be 6 characters long' });
    }
         
        next();
    } catch (e) {
        next(e);
    }
};

const validLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const userLogin = await login(email, password);

        if (!userLogin) {
            return res.status(400).json({ message: 'Invalid fields' });
        }
        next();
    } catch (e) {
        next(e);
    }
};

const userIdExists = async (req, res, next) => {
    const { id } = req.params;
    try {  
        const userById = await getUserById(id);

        if (!userById) {
            return res.status(404).json({ message: 'User does not exist' });
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
    validLogin,
    userIdExists,
};