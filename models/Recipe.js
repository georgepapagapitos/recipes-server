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

RecipeSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export const Recipe = mongoose.model('Recipe', RecipeSchema);
