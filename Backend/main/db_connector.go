package main

type db_connector interface {
	addToBill(id string, amount int)
	getAmount(id string) int
	getBottles() []Bottle
	getRecipes() []Recipe
}

type Bottle struct {
	Id int
	Name string
	PricePerLiter int
}

type Recipe struct {
	Name string
	Ingredients []Ingredient
}

type Ingredient struct {
	Id int
	Volume int
	Name string
}
