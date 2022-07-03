import mongoose from 'mongoose';

const RecipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  imageUrl: String,
  ingredients: {
    type: [Object],
    required: true,
  },
  tags: [String],
  dateCreated: {
    type: Date,
    default: new Date()
  },
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

export default Recipe;