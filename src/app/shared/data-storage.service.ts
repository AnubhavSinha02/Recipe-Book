import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
//import { map } from 'rxjs/Rx';
import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService{
    constructor(private http: HttpClient,private recipeService: RecipeService,private authService: AuthService){}

    storeRecipes()
    {
        const token=this.authService.getToken();
       return this.http.put('https://ng-recipe-book-d1acc.firebaseio.com/recipes.json?auth='+token,this.recipeService.getRecipies());
    }

    getRecipes(){
        const token=this.authService.getToken();

        this.http.get('https://ng-recipe-book-d1acc.firebaseio.com/recipes.json?auth='+token)
            .map(
                (response: Response) => {
                    const recipes: any = response;
                    for(let recipe of recipes){
                        if(!recipe['ingredients']){
                            console.log(recipe);
                            recipe['ingredients']= [];
                        }
                    } 
                    return recipes;
                }
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}