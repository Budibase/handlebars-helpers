'use strict';

module.exports = function(obj, prop) {
  return prop.split('.').reduce((acc, key) => acc && acc[key], obj);
};
