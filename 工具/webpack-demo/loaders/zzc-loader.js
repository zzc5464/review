"use strict";
const { getOptions } = require("loader-utils");

function splitZzc(source) {
  const options = getOptions(this)
  const {type = ''} = options
  return `export default (${JSON.stringify(source.split(type))})`;
}
module.exports = splitZzc