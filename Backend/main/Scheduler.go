package main

import (
	"net/http"
)

func main() {
	//Testrequest: GET localhost:8080/beispiel
	//Header: Authorization=HIER TOKEN EINFÜGEN
	http.Handle("/beispiel", authMiddleware(CreateBeispielHandler()))
	db_factory :=Create_db_connector_factory()
	db_con:=db_factory.make("mock")
	orderHander:=CreateOrderHandler(db_con)
	http.Handle("/order", authMiddleware(orderHander))
	amountHandler:=CreateGetAmountHandler(db_con)
	http.Handle("/getamount", authMiddleware(amountHandler))
	http.ListenAndServe(":8080", nil)
}