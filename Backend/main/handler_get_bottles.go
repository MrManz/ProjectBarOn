package main

import (
	"net/http"
	"fmt"
	"encoding/json"
)

type GetBottlesHandler struct {
	db db_connector
}

func CreateBottlesHandler(db_con db_connector) *GetBottlesHandler {
	return &GetBottlesHandler{db:db_con}
}

func (getBottlesHandler *GetBottlesHandler)ServeHTTP(w http.ResponseWriter, r *http.Request)  {
	bottles:=getBottlesHandler.db.getBottles()
	bottlesJSON,_:=json.Marshal(bottles)
	fmt.Fprintf(w, string(bottlesJSON))
}
