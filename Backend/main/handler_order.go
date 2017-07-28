package main

import (
	"net/http"
	"fmt"
	"encoding/json"
	"io/ioutil"
)

type OrderHandler struct {
	TokenHolder
	db db_connector
}

func CreateOrderHandler(db_con db_connector) *OrderHandler {
	return &OrderHandler{db:db_con}
}

func (orderHandler *OrderHandler)ServeHTTP(w http.ResponseWriter, r *http.Request)  {
	var ingredients []Ingredient
	bytes, _ := ioutil.ReadAll(r.Body)
	if err := json.Unmarshal(bytes, &ingredients); err != nil {
		panic(err)
	}
	//id:=orderHandler.token_data["sub"]
	//orderHandler.db.addToBill(id, 100) //Ein Euro zum Test
	//Automat ansprechen
	//Pins aktivieren mit http://192.168.137.105/mode/5/o
	resp, err := http.Get("http://192.168.137.105/digital/5/0")
	if(err!=nil){
		fmt.Println("scheiße")
	}
	data,_:=ioutil.ReadAll(resp.Body)
	fmt.Fprintf(w, string(data))
}




