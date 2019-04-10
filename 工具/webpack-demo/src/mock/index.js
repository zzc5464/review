const fs = require('fs')
const path = require('path')
function resolve(pathName) {
  return path.resolve(__dirname,pathName);
}

module.exports = function mock(app) {
  app.get('/user', (req, res) => {
    const data = fs.readFileSync(resolve('./data/user.json'))
    res.json(JSON.parse(data));
  })
}