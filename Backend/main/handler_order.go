package main

import (
	"net/http"
	"fmt"
	"encoding/json"
	"io/ioutil"
	"time"
	"strconv"
)

type OrderHandler struct {
	TokenHolder
	db db_connector
	busy bool
	millisecondOneMilliliterNeeds int
}

func CreateOrderHandler(db_con db_connector) *OrderHandler {
	derWertDerAllesEntscheidetUndWahrscheinlichNieFunktionierenWird,_:=strconv.Atoi(properties["millisecondOneMilliliterNeeds"])
	return &OrderHandler{db:db_con, busy:false, millisecondOneMilliliterNeeds:derWertDerAllesEntscheidetUndWahrscheinlichNieFunktionierenWird}
}

func (orderHandler *OrderHandler)ServeHTTP(w http.ResponseWriter, r *http.Request)  {
	var ingredients []Ingredient
	bytes, _ := ioutil.ReadAll(r.Body)
	if err := json.Unmarshal(bytes, &ingredients); err != nil {
		panic(err)
	}
	//Automat ansprechen
	//Pins aktivieren mit http://192.168.137.105/mode/5/o
	if(!orderHandler.busy){
		orderHandler.busy = true
		go orderHandler.makeACocktail(ingredients)
		fmt.Fprintf(w, "Bestellung aufgegeben!")
		var name = "Unbekannt"
		if orderHandler.token_data["name"] != ""{
			name = orderHandler.token_data["name"]
		}
		go sendNotification(name+" hat gerade einen Cocktail bestellt.")
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
				if properties["hardware"]!="false"{
					resp, err := http.Get("http://"+properties["baronIP"]+"/digital/"+pin+"/1")
					if(err!=nil&&resp!=nil){
						fmt.Println("Fehler bei Request an Pin "+pin)
					}
				}
				fmt.Println("Request an http://"+properties["baronIP"]+"/digital/"+pin+"/1")
				zeit := time.Duration(ingredient.Volume) * time.Duration(orderHandler.millisecondOneMilliliterNeeds) * time.Millisecond
				time.Sleep(zeit)
				if properties["hardware"]!="false"{
					resp, err := http.Get("Request an http://"+properties["baronIP"]+"/digital/"+pin+"/0")
					if(err!=nil&&resp!=nil){
						fmt.Println("Fehler bei Request an Pin "+pin)
					}
				}
				fmt.Println("Request an http://"+properties["baronIP"]+"/digital/"+pin+"/0")
				id:=orderHandler.token_data["sub"]
				orderHandler.db.addToBill(id, bottle.Id, ingredient.Volume) //Speichern des Konsumierten Betrags
				var name = "Unbekannt"
				if orderHandler.token_data["name"] != ""{
					name = orderHandler.token_data["name"]
				}
				go sendNotification("Cocktail von "+name+" ist fertig.")
			}
		}
	}
	orderHandler.busy = false
}


