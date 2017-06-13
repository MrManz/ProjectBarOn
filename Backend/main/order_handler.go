package main

import (
	"net/http"
	"fmt"
)

type OrderHandler struct {
	TokenHolder
	db db_connector
}

func CreateOrderHandler(db_con db_connector) *OrderHandler {
	return &OrderHandler{db:db_con}
}

func (orderHandler *OrderHandler)ServeHTTP(w http.ResponseWriter, r *http.Request)  {
	id:=orderHandler.token_data["sub"]
	orderHandler.db.addToBill(id, 100) //Ein Euro zum Test
	//Automat ansprechen
	fmt.Fprintf(w, "Bestellt")
}




