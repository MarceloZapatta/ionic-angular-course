import { RecipesService } from './recipes.service';
import { Recipe } from './recipe.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(private recipesService: RecipesService) { }

  ionViewWillEnter() {
    this.recipes = this.recipesService.getAllRecipes();
  }
}
