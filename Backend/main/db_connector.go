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
