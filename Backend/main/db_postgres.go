package main

import (
	"database/sql"
	_ "github.com/lib/pq"
	"os"
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
	amountsofar:=postgres.getAmount(id)

	postgres.account[id] = amountsofar + amount
}

func (postgres *db_postgres) getAmount(id string) int  {
	var amount int = 0
	rows, err := postgres.db.Query("SELECT amount FROM account WHERE id="+id)
	if err != nil {
		panic(err)
		os.Exit(1)
	}
	if(rows != nil){
		rows.Scan(&amount)
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
