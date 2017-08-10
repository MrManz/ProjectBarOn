package main

import (
	"net/http"
	"fmt"
	"encoding/json"
	"io/ioutil"
	"time"
)

type OrderHandler struct {
	TokenHolder
	db db_connector
	busy bool
	millisecondOneMilliliterNeeds int
}

func CreateOrderHandler(db_con db_connector) *OrderHandler {
	return &OrderHandler{db:db_con, busy:false, millisecondOneMilliliterNeeds:60}
}

func (orderHandler *OrderHandler)ServeHTTP(w http.ResponseWriter, r *http.Request)  {
	var ingredients []Ingredient
	bytes, _ := ioutil.ReadAll(r.Body)
	if err := json.Unmarshal(bytes, &ingredients); err != nil {
		panic(err)
	}
	id:=orderHandler.token_data["sub"]
	orderHandler.db.addToBill(id, 100) //Ein Euro zum Test
	//Automat ansprechen
	//Pins aktivieren mit http://192.168.137.105/mode/5/o
	if(!orderHandler.busy){
		orderHandler.busy = true
		go orderHandler.makeACocktail(ingredients)
		fmt.Fprintf(w, "Bestellung aufgegeben!")
	}else {
		fmt.Fprintf(w, "BarOn ist gerade beschäftigt")
	}
}

func (orderHandler *OrderHandler)makeACocktail(ingredients []Ingredient)  {
	bottles:=orderHandler.db.getBottles("")
	for _, ingredient := range ingredients{
		for _, bottle := range bottles {
			if(bottle.Id == ingredient.Id){
				pin:=bottle.Pin
				fmt.Println("Request an http://192.168.137.105/digital/"+pin+"/1")
				zeit := time.Duration(ingredient.Volume) * time.Duration(orderHandler.millisecondOneMilliliterNeeds) * time.Millisecond
				time.Sleep(zeit)
				fmt.Println("Request an http://192.168.137.105/digital/"+pin+"/0")
				//resp, err := http.Get("http://192.168.137.105/digital/"+pin+"/0")
				//if(err!=nil&&resp!=nil){
				//	fmt.Println("Fehler bei Request an Pin "+pin)
				//}
			}
		}
	}
	orderHandler.busy = false
}


