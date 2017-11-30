const prefix = 'qmui';

module.exports = function namespace(ruleName) {
  return `${prefix}/${ruleName}`;
};
