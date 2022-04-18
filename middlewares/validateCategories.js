const nameExists = (req, res, next) => {
    const { name } = req.body;
    try {
        if (!name) {
            return res.status(400).json({ message: '\'name\' is required' });
        }
        next();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    nameExists,
};