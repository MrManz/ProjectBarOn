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

func (postgres *db_postgres)addToBill(idUser string,idBottle int, amount int)  {
	var flag int
	var finalamount int
	querycheck:="select * from public.account where iduser='"+idUser+"' AND idbottle="+strconv.Itoa(idBottle)
	rows, err := postgres.db.Query(querycheck)
	if err != nil {
		panic(err)
		os.Exit(1)
	}
	if(rows.Next()){
		flag=1
	}
	if(flag==1){
		amountsofar:=postgres.getAmount(idUser)
		finalamount=amountsofar[idBottle]+amount
		queryupdate:="UPDATE public.account SET amount="+strconv.Itoa(finalamount)+" WHERE iduser='"+idUser+"' AND idbottle="+strconv.Itoa(idBottle)
		postgres.db.QueryRow(queryupdate)
	}else{
		finalamount = amount
		queryinsert:="INSERT INTO public.account (iduser, idbottle, amount) VALUES ('"+idUser+"', "+strconv.Itoa(idBottle)+", "+strconv.Itoa(finalamount)+")"
		postgres.db.QueryRow(queryinsert)
	}
}

func (postgres *db_postgres) getAmount(id string) ConsumedLiquid  {
	rows, err := postgres.db.Query("SELECT idbottle, amount FROM public.account WHERE idUser ='"+id+"'")
	if err != nil {
		panic(err)
		os.Exit(1)
	}
	liquids:=make(map[int]int)
	for rows.Next() {
		var idBottle, amount int
		err = rows.Scan(&idBottle, &amount)
		if err != nil {
			panic(err)
			os.Exit(1)
		}
		liquids[idBottle]=amount
	}
	return liquids
}

func (postgres *db_postgres) getBottles(path string) []Bottle  {
	if(postgres.bottles == nil){
		rows, err := postgres.db.Query("SELECT id, name, priceperliter, pathtopicture, pin FROM bottles")
		if err != nil {
			panic(err)
			os.Exit(1)
		}
		bottles := make([]Bottle, 0)
		for rows.Next() {
			var id int
			var name string
			var priceperliter int
			var pathtopicture string
			var pin string
			err = rows.Scan(&id, &name, &priceperliter, &pathtopicture, &pin)
			if err != nil {
				panic(err)
				os.Exit(1)
			}
			bottle:=Bottle{ Id:id,
				Name:name,
				PricePerLiter:priceperliter,
				PathToPicture:"http://"+path+pathtopicture,
				Pin:pin}
			bottles = append(bottles, bottle)
		}
		postgres.bottles = bottles
	}
	return postgres.bottles
}

func (postgres *db_postgres) getRecipes() []Recipe  {
		rows, err := postgres.db.Query("SELECT public.recipes.id, public.recipes.name, count(public.recipes.id) AS nummer FROM public.recipes INNER JOIN public.like ON public.recipes.id = public.like.idrecipe GROUP BY public.recipes.id ORDER BY nummer DESC")
		if err != nil {
			panic(err)
			os.Exit(1)
		}
		recipes := make([]Recipe, 0)
		for rows.Next() {
			var recipeId int
			var name string
			var likes int
			err = rows.Scan(&recipeId, &name, &likes)
			if err != nil {
				panic(err)
				os.Exit(1)
			}
			recipe:=Recipe{Name:name, Id:recipeId, Likes:likes}
			recipes = append(recipes, recipe)
		}
	return recipes
}

func (postgres *db_postgres) getIngredients(id int) []Ingredient  {
	rows, err := postgres.db.Query("SELECT id_bottle, volume FROM ingredients WHERE id_recipe="+strconv.Itoa(id))
	if err != nil {
		panic(err)
		os.Exit(1)
	}
	ingredients := make([]Ingredient, 0)
	for rows.Next() {
		var id_bottle, volume int
		err = rows.Scan(&id_bottle, &volume)
		if err != nil {
			panic(err)
			os.Exit(1)
		}
		ingredient:=Ingredient{Id:id_bottle, Volume:volume}
		ingredients = append(ingredients, ingredient)
	}
	return ingredients
}

func (postgres *db_postgres) likeCocktail(idUser string, idRecipe int){
	var flag int = 0
	querycheck:="SELECT * FROM public.like WHERE iduser = '"+idUser+"' AND idrecipe ="+strconv.Itoa(idRecipe)
	rows, err := postgres.db.Query(querycheck)
	if err != nil {
		panic(err)
		os.Exit(1)
	}
	if(rows.Next()){
		flag=1
	}
	if(flag==0){
		queryupdate:="INSERT INTO public.like (iduser, idrecipe) VALUES ('"+idUser+"', "+strconv.Itoa(idRecipe)+")"
		postgres.db.QueryRow(queryupdate)
	}
}