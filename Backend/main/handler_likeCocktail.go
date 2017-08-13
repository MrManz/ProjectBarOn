package main

import (
	"net/http"
	"strconv"
	"fmt"
)

type LikeHandler struct {
	TokenHolder
	db db_connector
}

func CreateLikeHandler(db_con db_connector) *LikeHandler {
	return &LikeHandler{db:db_con}
}

func (likeHandler *LikeHandler)ServeHTTP(w http.ResponseWriter, r *http.Request)  {
	idarr:=r.URL.Query()["id"]
	if(len(idarr) > 0){
		id, err:=strconv.Atoi(idarr[0])
		if(err!=nil){
			fmt.Fprintf(w, "ID nicht richtig angegeben")
		}
		go likeHandler.likeACocktail(id)
		fmt.Fprintf(w, "Cocktail wurde geliked")
	}else {
		fmt.Fprintf(w, "Keine ID angegeben")
	}
}

func (likeHandler *LikeHandler) likeACocktail(idRecipe int){
	idUser:=likeHandler.token_data["sub"]
	likeHandler.db.likeCocktail(idUser, idRecipe)
}


