import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { RecipesService } from './../recipes.service';
import { Recipe } from '.././recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss']
})
export class RecipeDetailPage implements OnInit {
  recipe: Recipe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('recipeId')) {
        // redirect to begin
        return;
      }

      const recipeId = paramMap.get('recipeId');

      this.recipe = this.recipesService.getRecipe(recipeId);
    });
  }

  onDeleteRecipe(id: string) {
    this.alertController.create({
      header: 'Are you sure?',
      message: 'Do you really wanna to delete the recipe?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.recipesService.deleteRecipe(this.recipe.id);
            this.router.navigate(['/recipes']);
          }
        }
      ]
    }).then(alertElement => {
      alertElement.present();
    });
  }
}
