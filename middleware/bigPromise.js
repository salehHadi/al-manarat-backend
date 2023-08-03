module.exports = (func) => (req, res, next) =>
  Promise.resolve(func(req, res, next)).catch(next);

// I need to know why it been written in this way and wat all this mean
