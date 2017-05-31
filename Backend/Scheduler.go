package main

import (
	"fmt"
	"net/http"
	"sync"
)

type session struct {
	sync.RWMutex
}

var concreteBarMachine = BarMachine{Id:"01"}

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "BarMachine: " + concreteBarMachine.Id)
}

func main() {

	http.HandleFunc("/", handler)
	http.ListenAndServe(":8080", nil)
}