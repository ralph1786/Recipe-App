import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Navbar from "./Navbar";
import RecipeInput from "./RecipeInput";
import RecipeList from './RecipeList';
import Dialog from 'material-ui/Dialog';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipes: [
        {
          id: 0,
          title: "Ravioli",
          instructions: "Stuff raviolis with beef, then close ravioli. Boil for 20 mins then add tomatoes sauce.",
          ingredients: ["ravioli", 'ground-beef', 'tomatoes sauce', 'cheese'],
          img: 'https://cdn.pixabay.com/photo/2015/01/17/10/49/ravioli-602087_1280.jpg'
        },
        {
          id: 1,
          title: "Paella",
          instructions: "Cook rice, then add Goya seasoning. After cooking for 20 mins add seafood ingredients.",
          ingredients: ["rice", 'shrimp', 'Goya seasoning', 'mussels', 'squid'],
          img: 'https://cdn.pixabay.com/photo/2014/07/21/23/04/paella-398968_1280.jpg'
        },
        {
          id: 2,
          title: "Flan",
          instructions: "Add flan mixture to pot. Then add sugar and condensed milk as well as regular milk. Then add caramel.",
          ingredients: ["Boxed-Flan", 'condensed milk', 'caramel', 'sugar'],
          img: 'https://cdn.pixabay.com/photo/2014/08/08/11/22/flan-413219_1280.jpg'
        }
      ],
      nextRecipeId: 3,
      showForm: false //This hides the form when app first loads.
    }
    this.handleSave = this.handleSave.bind(this);
    this.onDelete= this.onDelete.bind(this);
  }
  handleSave(recipe){
    this.setState((prevState, props) => {
      const newRecipe = {...recipe, id: this.state.nextRecipeId};
      return {
        nextRecipeId: prevState.nextRecipeId + 1,
        recipes: [...this.state.recipes, newRecipe],
        // This hides form when saved.
        showForm: false
      }
    });
  }

  onDelete(id){
    const recipes = this.state.recipes.filter(r => r.id !== id); //filter method will create a new array of recipes without including the recipe that was deleted.
    this.setState({recipes});
  }

  render() {
    const {showForm} = this.state;
    return (
      <MuiThemeProvider>
        <div className="App">
          {/* The prop on the Navbar component makes form appear when new recipe is clicked. */}
          <Navbar onNewRecipe = {() => this.setState({showForm: true})}/>
          <Dialog
              title= "New Recipe"
              actions= {<RecipeInput
                onSave={this.handleSave}
                // this closes form when X is clicked. 
                onClose={() => this.setState({ showForm: false })} />}
              modal={false}
              open={showForm}
              onRequestClose = {this.onClose}>  
          </Dialog>
          <RecipeList onDelete={this.onDelete} recipes={this.state.recipes} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
