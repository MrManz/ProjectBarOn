package main

type db_connector interface {
	addToBill(id string, amount int)
	getAmount(id string) int
	getBottles() []Bottle
}

type Bottle struct {
	Id int
	Name string
	PricePerLiter int
}

type Cocktail struct{
	Ingredients map[Bottle]int
	Price int
}

func newCocktail() *Cocktail{
	// TODO: Load from DB
	c := Cocktail{}
	p := 0

	for bottle, amount := range c.Ingredients {
		p = p + (bottle.PricePerLiter * amount)
	}
	c.Price = p
	return c
}
