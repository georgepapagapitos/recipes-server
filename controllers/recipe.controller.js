import { Recipe } from '../models/Recipe.js';

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById({ _id: req.params.id });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
}

export const addRecipe = async (req, res) => {
  const recipe = req.body;
  const newRecipe = new Recipe(recipe);

  try {
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
}

export const deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete({ _id: req.params.id });
    res.status(200);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
}