var http = require("../services/httpservice");
var Reflux = require("reflux");
var Actions = require("./actions.jsx");

//Create our stores here. We can have multiple stores in the same file.
//However it is better to have eveyting in individual files.
var IngredientsStore = Reflux.createStore({
    //listenables is an actual reflux key word.
    //let the store know to wat actions to listen to.
    listenables: [Actions],
    //for functions use the EXACT name passed into Actions
    getIngredients(){
        http.get('/ingredients').then((data) => {
            console.log(data);
            //Our store is an object. Even though we didnt create an ingredients object anywhere we can still set it by using this.ingredients.
            this.ingredients = data;
            //This will notify listeners of a data change.
            this.fireUpdate();
        })
    },
    postIngredient(text){
        //If there is no ingredient list we create one. This is a simple check to avoid errors.
        if(!this.ingredients){
            this.ingredients = [];
        }
        var ingredient = {
            text: text,
            //We are creating unique id's to make React happy =)
            id: Math.floor(Date.now()/1000) + text
        };
        //To maintain good user experience we first push the ingredient locally.
        this.ingredients.push(ingredient);
        //After pushing it locally we call the refresh function
        this.fireUpdate();

        http.post('/ingredients', ingredient).then((res) => {
            //When the post was successful, aka the item was added, then go ahead and get the list of ingredients again, and when getIngredients is called the fireUpdate function runs which updates the data.
            this.getIngredients();
            console.log(res);
        })
    },
    //REFRESH FUNCTION
    fireUpdate(){
        //Whenever this function is called the "ingredients" will get updated.
        //this.trigger is a reflux method.
        //When this function is called use this.trigger() and change this.ingredients.
        this.trigger(this.ingredients);
    }
});

module.exports = IngredientsStore;