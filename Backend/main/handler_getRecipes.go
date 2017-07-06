package main

import (
	"net/http"
	"encoding/json"
	"fmt"
)

type GetRecipesHandler struct {
	db db_connector
}

func CreateRecipesHandler(db_con db_connector) *GetRecipesHandler {
	return &GetRecipesHandler{db:db_con}
}

func (getRecipesHandler *GetRecipesHandler)ServeHTTP(w http.ResponseWriter, r *http.Request)  {
	recipes:=getRecipesHandler.db.getRecipes()
	recipesJSON,_:=json.Marshal(recipes)
	fmt.Fprintf(w, string(recipesJSON))
}

