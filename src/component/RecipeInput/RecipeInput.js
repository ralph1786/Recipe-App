import React, { Component } from "react";
import "./RecipeInput.css";

class RecipeInput extends Component {
  static defaultProps = {
    onClose() {},
    onSave() {}
  };

  state = {
    title: "",
    instructions: "",
    ingredients: [""],
    img: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  //This provides a new input box to add new ingredients when + button is clicked.
  handleNewIngredient = e => {
    const { ingredients } = this.state;
    this.setState({ ingredients: [...ingredients, ""] });
  };
  //this adds new ingredients to the recipe.
  handleChangeIng = e => {
    const index = Number(e.target.name.split("-")[1]);
    const ingredients = this.state.ingredients.map(
      (ing, i) => (i === index ? e.target.value : ing)
    );
    this.setState({ ingredients });
  };
  //This handles event when save button is clicked, it adds new recipe to the recipe array.
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSave({ ...this.state });
    this.setState({
      //this will clear form after submitting.
      title: "",
      instructions: "",
      ingredients: [""],
      img: ""
    });
  };

  render() {
    const { title, instructions, ingredients, img } = this.state;
    const { onClose } = this.props;
    let inputs = ingredients.map((ing, i) => (
      <div className="recipe-form-line" key={`ingredients ${i}`}>
        <label>
          {i + 1}.
          <input
            type="text"
            name={`ingredients-${i}`}
            value={ing}
            autoComplete="off"
            placeholder="Ingredients"
            onChange={this.handleChangeIng}
          />
        </label>
      </div>
    ));
    return (
      <div className="recipe-form-container">
        <form className="recipe-form" onSubmit={this.handleSubmit}>
          {/* This button is to close the form. */}
          <button type="button" className="close-button" onClick={onClose}>
            X
          </button>
          {/* Input for title of recipe. */}
          <div className="recipe-form-line">
            <label htmlFor="recipe-title-input">Title</label>
            <input
              id="recipe-title-input"
              key="title"
              name="title"
              type="text"
              value={title}
              size={42}
              autoCorrect="off"
              onChange={this.handleChange}
            />
          </div>
          {/* This is the textarea to input the instructions of recipe. */}
          <label
            htmlFor="recipe-instructions-input"
            style={{ marginTop: "4px" }}
          >
            Instructions
          </label>
          <textarea
            key="instructions"
            id="recipe-instructions-input"
            type="Instructions"
            name="instructions"
            rows="8"
            cols="45"
            autoComplete="off"
            value={instructions}
            onChange={this.handleChange}
          />
          {inputs}{" "}
          {/*this renders a list of ingredients from constant above. */}
          {/* The button below adds a new input field to add a new ingredient. */}
          <button
            type="button"
            onClick={this.handleNewIngredient}
            className="buttons"
          >
            +
          </button>
          <div className="recipe-form-line">
            <label htmlFor="recipe-img-input">Image Url</label>
            {/* Below is an input field for the image url. */}
            <input
              id="recipe-img-input"
              type="text"
              placeholder=""
              name="img"
              value={img}
              size={36}
              autoComplete="off"
              onChange={this.handleChange}
            />
          </div>
          {/* Below button is to submit form. */}
          <button
            type="submit"
            className="buttons"
            style={{ alignSelf: "flex-end", marginRight: 0 }}
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default RecipeInput;
