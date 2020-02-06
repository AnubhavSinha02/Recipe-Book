import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{
    
    recipesChanged =new Subject<Recipe[]>();

   private recipes: Recipe[] =[
        new Recipe('Burger',"Burgers cooked sous-vide are extremely juicy and evenly cooked.It's one of the simplest foods to make using traditional methods.",'https://www.seriouseats.com/recipes/images/2015/07/20150702-sous-vide-hamburger-anova-primary-1500x1125.jpg',[new Ingredient('Chicken',1),new Ingredient('Bun',2)]),
        new Recipe('Sizzling Brownie','Happy times or sad times, everyone needs one comfort dessert to brighten their day. This simply irresistible, mouth watering, delicious, addictive Sizzling Brownie recipe is all that you could ask for.','https://media-cdn.tripadvisor.com/media/photo-s/12/63/d1/b0/sizzling-brownie.jpg',[new Ingredient('Chocolate',10),new Ingredient('Ice Cream',2)])
      ];

      constructor(private slService: ShoppingListService){}

      setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

    getRecipies(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes[index];
    }
    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
        }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index]= newRecipe;
        this.recipesChanged.next(this.recipes.slice()); 
    }

    deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}