package main

import (
	"net/http"
	"os"
	"io/ioutil"
	"fmt"
	"encoding/json"
	"path/filepath"
)

func main() {
	absPath, _ := filepath.Abs("main/config.json")
	file, e := ioutil.ReadFile(absPath)
	if e != nil {
		fmt.Printf("Cant read properties!")
		os.Exit(1)
	}
	var properties map[string]string
	json.Unmarshal(file, &properties)
	//Testrequest: GET localhost:8080/beispiel
	//Header: Authorization=HIER TOKEN EINFÜGEN
	http.Handle("/beispiel", authMiddleware(CreateBeispielHandler()))
	db_factory :=Create_db_connector_factory()
	db_con:=db_factory.make(properties["database"])
	orderHander:=CreateOrderHandler(db_con)
	http.Handle("/order", authMiddleware(orderHander))
	amountHandler:=CreateGetAmountHandler(db_con)
	http.Handle("/getamount", authMiddleware(amountHandler))
	bottlesHandler:=CreateBottlesHandler(db_con)
	http.Handle("/getbottles", bottlesHandler)
	http.ListenAndServe(":8080", nil)
}