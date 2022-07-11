import express from 'express';
import { getRecipes, getRecipe, addRecipe, deleteRecipe } from '../controllers/recipe.controller.js';

const router = express.Router();

router.get('/', getRecipes);
router.get('/:id', getRecipe);
router.post('/', addRecipe);
router.delete('/:id', deleteRecipe);

export default router;
