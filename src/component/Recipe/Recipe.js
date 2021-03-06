import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Recipe.css";

class Recipe extends Component {
  // For the user to know what is required.
  static propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    instructions: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired
  };

  render() {
    const { title, img, instructions, id, onDelete } = this.props;
    //Since the ingredients is an array we use the map function.
    const ingredients = this.props.ingredients.map((ing, index) => (
      // this will create a li for each ingredient.
      <li key={index}>
        <i className="fas fa-angle-right" style={{ marginRight: "10px" }} />
        {ing}
      </li>
    ));
    return (
      <div className="recipe-card">
        <div className="recipe-card-image">
          <img src={img} alt={title} />
        </div>
        <div className="recipe-card-content">
          <h2 className="recipe-title">{title}</h2>
          <h4>Ingredients:</h4>
          <ul>{ingredients}</ul>
          <h4>Instructions:</h4>
          <p>{instructions}</p>
          <div className="button-edit">
            <button type="button">Edit</button>
          </div>
          <div className="button-delete">
            <button type="button" onClick={() => onDelete(id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Recipe;
