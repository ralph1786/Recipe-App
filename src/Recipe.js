import React, { Component } from 'react'
import PropTypes from 'prop-types';
import "./Recipe.css";

export default class Recipe extends Component {
  // For the user to know what is required.
  static propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    instructions: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired
  }
  
  render() {
      const { title, img, instructions, id, onDelete } = this.props;
        //Since the ingredients is an array we use the map function.
      const ingredients = this.props.ingredients.map((ing, index) => (
        // this will create a li for each ingredients.
        <li key={index}>{ing}</li>
      ));
    return (
      <div className="recipe-card">
        <div className="recipe-card-image">
            <img src={img} alt={title} />
        </div>
        <div className="recipe-card-content">
            <h2 className="recipe-title">{title}</h2>
            <h5>Ingredients:</h5>
            <ul>
                {ingredients}
            </ul>
            <h5>Instructions:</h5>
            <p>{instructions}</p> 
            <button type="button" onClick={() => onDelete(id)}>
              Delete
            </button>
        </div>  
      </div>
    )
  }
}
