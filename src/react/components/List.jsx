var React = require("react");
var ListItem = require("./ListItem.jsx");
var Reflux = require("reflux");
var Actions = require("../reflux/actions.jsx");
var IngredientsStore = require("../reflux/ingredientsStore.jsx");


var List = React.createClass({
    //We are listening to the IngredientStore. The onChange function is created by the user. It can be named anything.
    //listenTo takes two arguments. the store and a callback function.
    mixins: [Reflux.listenTo(IngredientsStore, 'onChange')],
    getInitialState(){
        return {
            ingredients: [],
            newText: ''
        }
    },
    //Always make data requests in componentWillMount
    componentWillMount(){
        //Reflux maps a string into a function. Just before the component is mounted an http request will be fired to get the ingredients. See ingredientsStore.jsx.
        Actions.getIngredients();
    },
    onChange(ingredients){
        this.setState({
            ingredients: ingredients
        })
    },
    handleInputChange(e){
        this.setState({
            newText: e.target.value
        })
    },
    onClick(e){
        //When the button is clicked we will let the store know that data has to be updated.
        if(this.state.newText){
            Actions.postIngredient(this.state.newText);
        }
        this.setState({
            newText: ""
        })
    },
    render: function () {
        var listItems = this.state.ingredients.map((ingredient) => {
            //At this point we are passing the ingredient text to our ListItem component.
           return <ListItem key={ingredient.id} ingredient={ingredient.text} />
        });
        return (
            <div>
                <input type="text" placeholder="add item" value={this.state.newText} onChange={this.handleInputChange}/>
                <button onClick={this.onClick}>Add item</button>
                <ul>{listItems}</ul>
            </div>
        )
    }
});

module.exports = List;