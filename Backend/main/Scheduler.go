package main

import (
	"net/http"
)

func main() {
	http.Handle("/order", authMiddleware(orderHandler()))
	http.ListenAndServe(":8080", nil)
}