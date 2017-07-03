package main

import (
	"database/sql"
	_ "github.com/lib/pq"
	"os"
	"strconv"
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
	rows, err := postgres.db.Query("select count(1) from public.bottles where id="+id)
	if err != nil {
		panic(err)
		os.Exit(1)
	}
	if(rows != nil){
		rows.Scan(&flag)
	}
	if(flag==1){
		amountsofar:=postgres.getAmount(id)
		finalamount=amountsofar+amount
		err := postgres.db.QueryRow("UPDATE public.account SET amount="+strconv.Itoa(finalamount)+" WHERE id="+id)
		if err != nil {
			panic(err)
			os.Exit(1)
		}
	}else{
		finalamount = amount
		err := postgres.db.QueryRow("INSERT INTO public.account(id, amount)VALUES ("+id+", "+strconv.Itoa(finalamount)+")")
		if err != nil {
			panic(err)
			os.Exit(1)
		}
	}

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
