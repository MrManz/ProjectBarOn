package main

type db_connector interface {
	addToBill(idUser string,idBottle int, amount int)
	getAmount(id string) ConsumedLiquid
	getBottles(path string) []Bottle
	getRecipes() []Recipe
	getIngredients(id int) []Ingredient
}

type Bottle struct {
	Id int
	Name string
	PricePerLiter int
	PathToPicture string
	Pin string
}

type Recipe struct {
	Name string
	Id int
}

type Ingredient struct {
	Id int
	Volume int
}

type ConsumedLiquid map[int]int
