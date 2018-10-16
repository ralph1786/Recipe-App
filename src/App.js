import React, { Component } from "react";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Navbar from "./component/Navbar/Navbar";
import RecipeInput from "./component/RecipeInput/RecipeInput";
import RecipeList from "./component/RecipeList/RecipeList";
import Dialog from "material-ui/Dialog";

class App extends Component {
  state = {
    recipes: [
      {
        id: 0,
        title: "Ravioli",
        instructions:
          "Stuffed raviolis with beef, then close ravioli. Boil for 20 mins then add tomatoes sauce.",
        ingredients: ["ravioli", "ground-beef", "tomatoes sauce", "cheese"],
        img:
          "https://cdn.pixabay.com/photo/2017/05/18/06/31/italian-2322684_1280.jpg"
      },
      {
        id: 1,
        title: "Paella",
        instructions:
          "Cook rice, then add Goya seasoning. After cooking for 20 mins add seafood ingredients.",
        ingredients: ["rice", "shrimp", "Goya seasoning", "mussels", "squid"],
        img:
          "https://cdn.pixabay.com/photo/2014/07/21/23/04/paella-398968_1280.jpg"
      },
      {
        id: 2,
        title: "Flan",
        instructions:
          "Add flan mixture to pot. Then add sugar and condensed milk as well as regular milk. Then add caramel.",
        ingredients: ["Boxed-Flan", "condensed milk", "caramel", "sugar"],
        img:
          "https://cdn.pixabay.com/photo/2017/01/06/17/27/caramel-1958386__480.jpg"
      }
    ],
    nextRecipeId: 3,
    showForm: false
  };

  //This hides the form when app first loads.
  handleSave = recipe => {
    this.setState(prevState => {
      const newRecipe = { ...recipe, id: this.state.nextRecipeId };
      return {
        nextRecipeId: prevState.nextRecipeId + 1,
        recipes: [...this.state.recipes, newRecipe],
        // This hides form when saved.
        showForm: false
      };
    });
  };

  onDelete = id => {
    const recipes = this.state.recipes.filter(r => r.id !== id); //filter method will create a new array of recipes without including the recipe that was deleted.
    this.setState({ recipes });
  };

  render() {
    const { showForm } = this.state;
    return (
      <MuiThemeProvider>
        <div className="App">
          {/* The prop on the Navbar component makes form appear when new recipe is clicked. */}
          <Navbar onNewRecipe={() => this.setState({ showForm: true })} />
          <Dialog
            title="New Recipe"
            titleStyle={{ textAlign: "center", color: "#f58f29" }}
            actions={
              <RecipeInput
                onSave={this.handleSave}
                onClose={() =>
                  this.setState(
                    // this closes form when X is clicked.
                    { showForm: false }
                  )
                }
              />
            }
            modal={false}
            open={showForm}
            // onClose={this.onClose}
          />
          <RecipeList onDelete={this.onDelete} recipes={this.state.recipes} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
