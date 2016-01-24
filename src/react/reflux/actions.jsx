var Reflux = require("reflux");

//Actions that will be manipulating data
var Actions = Reflux.createActions([
    'getIngredients',
    'postIngredient'
]);

module.exports = Actions;