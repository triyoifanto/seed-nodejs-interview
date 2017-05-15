
const throwIfMissing = (param) => {
  throw new Error(`Missing parameter: ${param}`);
};

module.exports = {
  throwIfMissing
};
