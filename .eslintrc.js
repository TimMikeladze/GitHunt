module.exports = {
   "parser": "babel-eslint",
   "parserOptions": {
     "ecmaVersion": 6,
     "sourceType": "module"
   },
   "rules": {
     "graphql/template-strings": ['error', {
       schemaJson: require('./schema.json')
     }]
   },
   "extends": "airbnb",
   plugins: [
     'react',
     'graphql'
   ]
 }
