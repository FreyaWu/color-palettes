module.exports = (req, res, next) =>
    req.user ? next() : res.status(404).send({ error: `You're not logged in` });