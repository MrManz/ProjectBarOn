package main

type db_connector interface {
	addToBill(id string, amount int)
	getAmount(id string) int
	getBottles(path string) []Bottle
	getRecipes() []Recipe
	getIngredients(id int) []Ingredient
}

type Bottle struct {
	Id int
	Name string
	PricePerLiter int
	PathToPicture string
}

type Recipe struct {
	Name string
	Id int
}

type Ingredient struct {
	Id int
	Volume int
}
