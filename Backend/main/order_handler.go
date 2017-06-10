package main

import (
	"net/http"
)

type OrderHandler struct {
	TokenHolder
}

func CreateOrderHandler() *OrderHandler {
	return &OrderHandler{}
}

func (orderHandler OrderHandler)ServeHTTP(w http.ResponseWriter, r *http.Request)  {
	//sickes Coding bitte hier einfügen
}




