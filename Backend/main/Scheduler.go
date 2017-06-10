package main

import (
	"net/http"
)

func main() {
	//Testrequest: GET localhost:8080/beispiel
	//Header: Authorization=HIER TOKEN EINFÜGEN
	http.Handle("/beispiel", authMiddleware(CreateBeispielHandler()))
	http.Handle("/order", authMiddleware(CreateOrderHandler()))
	http.ListenAndServe(":8080", nil)
}