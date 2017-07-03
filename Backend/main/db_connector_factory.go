package main

import "fmt"

type db_connector_factory struct {

}

func Create_db_connector_factory() *db_connector_factory{
	return &db_connector_factory{}
}

func (fac db_connector_factory) make(identifier string) db_connector{
	switch identifier {
	case "mock":
		return &db_mock{}
	case "postgres":
		return createPostgresDB()
	default:
		fmt.Println("Keine gültige Datenbank angegeben!")
	}
	return nil
}
