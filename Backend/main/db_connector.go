package main

type db_connector interface {
	addToBill(id string, amount int)
	getAmount(id string) int
}
