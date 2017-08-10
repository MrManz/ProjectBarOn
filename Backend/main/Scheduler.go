package main

import (
	//"path/filepath"
	"io/ioutil"
	"os"
	"encoding/json"
	"net/http"
	"path/filepath"
	"github.com/rs/cors"
	"flag"
	"fmt"
)

var properties map[string]string

func main() {

	absPath, _ := filepath.Abs("config.json")
	file, e := ioutil.ReadFile(absPath)
	if e != nil {
		panic(e)
		os.Exit(1)
	}
	json.Unmarshal(file, &properties)
	//Testrequest: GET localhost:8080/beispiel
	//Header: Authorization=HIER TOKEN EINFÜGEN
	c := cors.AllowAll()
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
	directory := flag.String("d", ".", "the directory of static file to host")
	flag.Parse()
	fs := http.FileServer(http.Dir(*directory))
	fmt.Println(directory)
	http.Handle("/", c.Handler(fs))
	http.ListenAndServe(":8080", nil)
}