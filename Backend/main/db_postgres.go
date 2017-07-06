package main

import (
	"database/sql"
	_ "github.com/lib/pq"
	"os"
	"strconv"
	"log"
)

type db_postgres struct {
	account map[string]int
	amt int
	db *sql.DB
	bottles []Bottle
}

func createPostgresDB() *db_postgres {
	db, err := sql.Open("postgres", "user="+properties["db_user"]+" dbname="+properties["db_name"]+" password="+properties["db_password"]+" sslmode=disable")
	if err != nil {
		panic(err)
		os.Exit(1)
	}
	db_pg:=db_postgres{db:db}
	return &db_pg
}

func (postgres *db_postgres)addToBill(id string, amount int)  {
	var flag int
	var finalamount int
	querycheck:="select * from public.account where id='"+id+"'"
	rows, err := postgres.db.Query(querycheck)
	if err != nil {
		panic(err)
		os.Exit(1)
	}
	if(rows.Next()){
		flag=1
	}
	if(flag==1){
		amountsofar:=postgres.getAmount(id)
		finalamount=amountsofar+amount
		queryupdate:="UPDATE public.account SET amount="+strconv.Itoa(finalamount)+" WHERE id='"+id+"'"
		postgres.db.QueryRow(queryupdate)
	}else{
		finalamount = amount
		queryinsert:="INSERT INTO public.account (id, amount) VALUES ('"+id+"', "+strconv.Itoa(finalamount)+")"
		postgres.db.QueryRow(queryinsert)
	}
}

func (postgres *db_postgres) getAmount(id string) int  {
	var amount int = 0
	err := postgres.db.QueryRow("SELECT amount FROM account WHERE id='"+id+"'").Scan(&amount)
	if err == sql.ErrNoRows {
		log.Fatal("No Results Found")
	}
	if err != nil {
		log.Fatal(err)
	}
	return amount
}

func (postgres *db_postgres) getBottles() []Bottle  {
	if(postgres.bottles == nil){
		rows, err := postgres.db.Query("SELECT id, name, priceperliter FROM bottles")
		if err != nil {
			panic(err)
			os.Exit(1)
		}
		bottles := make([]Bottle, 0)
		for rows.Next() {
			var id int
			var name string
			var priceperliter int
			err = rows.Scan(&id, &name, &priceperliter)
			if err != nil {
				panic(err)
				os.Exit(1)
			}
			bottle:=Bottle{ Id:id,
				Name:name,
				PricePerLiter:priceperliter}
			bottles = append(bottles, bottle)
		}
		postgres.bottles = bottles
	}
	return postgres.bottles
}

func (postgres *db_postgres) getRecipes() []Recipe  {
	recipes := make([]Recipe, 1)
	ingredients:=make([]Ingredient, 2)
	ingredients[0]=Ingredient{Id:2, Volume:150}
	ingredients[1]=Ingredient{Id:5, Volume:150}
	recipes[0]=Recipe{Name:"Rum-Cola", Ingredients:ingredients}
	return recipes
}
