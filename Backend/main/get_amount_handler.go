package main

import (
	"net/http"
	"fmt"
	"strconv"
)

type get_amount_handler struct {
	TokenHolder
	db db_connector
}

func CreateGetAmountHandler(db_con db_connector) *get_amount_handler{
	return &get_amount_handler{db:db_con}
}

func (amount_handler *get_amount_handler)ServeHTTP(w http.ResponseWriter, r *http.Request)  {
	fmt.Fprintf(w, strconv.Itoa(amount_handler.db.getAmount(amount_handler.token_data["sub"])))
}
