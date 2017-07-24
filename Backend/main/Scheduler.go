package main

import (
	//"path/filepath"
	"io/ioutil"
	"os"
	"encoding/json"
	"net/http"
	"path/filepath"
	"github.com/rs/cors"
)

var properties map[string]string

func main() {

	absPath, _ := filepath.Abs("main/config.json")
	file, e := ioutil.ReadFile(absPath)
	if e != nil {
		panic(e)
		os.Exit(1)
	}
	json.Unmarshal(file, &properties)
	//Testrequest: GET localhost:8080/beispiel
	//Header: Authorization=HIER TOKEN EINFÜGEN
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:8000"},
		AllowCredentials: true,
	})
	http.Handle("/beispiel", c.Handler(authMiddleware(CreateBeispielHandler())))
	db_factory :=Create_db_connector_factory()
	db_con:=db_factory.make(properties["database"])
	orderHander:=CreateOrderHandler(db_con)
	http.Handle("/order", c.Handler(authMiddleware(orderHander)))
	amountHandler:=CreateGetAmountHandler(db_con)
	http.Handle("/getamount", c.Handler(authMiddleware(amountHandler)))
	bottlesHandler:=CreateBottlesHandler(db_con)
	http.Handle("/getbottles", c.Handler(bottlesHandler))
	recipesHandler:=CreateRecipesHandler(db_con)
	http.Handle("/getrecipes", c.Handler(recipesHandler))
	http.ListenAndServe(":8080", nil)
}