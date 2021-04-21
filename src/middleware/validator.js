'use strict'

const validator = (req, res, next) => {
    if (req.query.name) {
        res.send(req.query);
    } else {
        res.status(500).json({ msg: 'not found' });
    }
    next();
}

module.exports = validator;