module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); // The same as err => next(err)
  };
};
