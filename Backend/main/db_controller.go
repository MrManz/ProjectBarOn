package main

import ("github.com/go-bongo/bongo"
	"log"
	"gopkg.in/mgo.v2/bson"
	"fmt"
)

type db_controller struct {
}

type Person struct {
	bongo.DocumentBase `bson:",inline"`
	FirstName string
	LastName string
	Gender string
	Mail string
	EthereumAddress string
}

func (c *db_controller) CreateDB() {
	config := &bongo.Config{
		ConnectionString: "localhost",
		Database:         "BarOnDB",
	}

	connection, err := bongo.Connect(config)
	if err != nil {
		log.Fatal(err)
	}

	myPerson := &Person{
		FirstName:"James",
		LastName:"Bond",
		Gender:"male",
		Mail:"jamesbond@BarOn.com",
		EthereumAddress:"0x6bAc5bb00D9A9ddd43150Bfd3d377Cd2C18C373d",
	}
	err = connection.Collection("users").Save(myPerson)
	if err != nil {
		log.Fatal(err)
	}

}

func (c *db_controller) QueryPerson(Mail string) *Person{
	config := &bongo.Config{
		ConnectionString: "localhost",
		Database:         "BarOnDB",
	}

	connection, err := bongo.Connect(config)
	if err != nil {
		log.Fatal(err)
	}

	person := &Person{}

	err = connection.Collection("users").FindOne(bson.M{"mail":Mail}, person)

	if err != nil {
		fmt.Println(err.Error())
	} else {
		fmt.Println("Found user:", person.FirstName)
	}

	return person

}