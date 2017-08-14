package main

import (
	"net/http"
	"encoding/json"
	"fmt"
	"strconv"
)

type GetRecipesHandler struct {
	db db_connector
}

func CreateRecipesHandler(db_con db_connector) *GetRecipesHandler {
	return &GetRecipesHandler{db:db_con}
}

func (getRecipesHandler *GetRecipesHandler)ServeHTTP(w http.ResponseWriter, r *http.Request)  {
	idarr:=r.URL.Query()["id"]
	if(len(idarr) < 1){
		recipes:=getRecipesHandler.db.getRecipes(r.Host)
		recipesJSON,_:=json.Marshal(recipes)
		fmt.Fprintf(w, string(recipesJSON))
	}else{
		id, err:=strconv.Atoi(idarr[0])
		if(err == nil){
			ingredients:=getRecipesHandler.db.getIngredients(id)
			ingredientsJSON,_:=json.Marshal(ingredients)
			fmt.Fprintf(w, string(ingredientsJSON))
		}
	}
}

