import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    {
      id: 'r1',
      title: 'Schnitzel',
      imageUrl: 'https://www.thespruceeats.com/thmb/VYxi1MPOLh3W286dhp270ozcjrY=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/wiener-schnitzel-recipe-1447089-Hero-5b587d6c46e0fb0071b0059d.jpg',
      ingrediends: ['French Frie', 'Pork Meat', 'Salad']
    },
    {
      id: 'r2',
      title: 'Spaghetti',
      imageUrl: 'https://www.inspiredtaste.net/wp-content/uploads/2019/03/Spaghetti-with-Meat-Sauce-Recipe-1-1200.jpg',
      ingrediends: ['Spaghetti', 'Tomatoe Sauce', 'Chesse']
    }
  ];

  constructor() {}

  getAllRecipes() {
    return [...this.recipes];
  }

  getRecipe(id: string) {
    return {...this.recipes.find(recipe => recipe.id === id)};
  }

  deleteRecipe(id: string) {
    this.recipes = this.recipes.filter(recipe => {
      return recipe.id !== id;
    });
  }
}
