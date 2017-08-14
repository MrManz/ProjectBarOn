package main

type db_connector interface {
	addToBill(idUser string,idBottle int, amount int)
	getAmount(id string) []ConsumedAmount
	getBottles(path string) []Bottle
	getRecipes(path string) []Recipe
	getIngredients(id int) []Ingredient
	likeCocktail(idUser string, idRecipe int)
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
	Likes int
	PathToPicture string
}

type Ingredient struct {
	Id int
	Volume int
}

type ConsumedAmount struct {
	IdUser string
	IdBottle int
	Amount int
}