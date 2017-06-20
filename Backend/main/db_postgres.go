package main

type db_postgres struct {
	account map[string]int
	amt int
}

func (postgres *db_postgres)addToBill(id string, amount int)  {
	if(postgres.account==nil){
		postgres.account=make(map[string]int)
	}
	amountsofar:= postgres.account[id]
	postgres.account[id] = amountsofar + amount
}

func (postgres *db_postgres) getAmount(id string) int  {
	if(postgres.account==nil){
		postgres.account=make(map[string]int)
	}
	return postgres.account[id]
}

func (postgres *db_postgres) getBottles() []Bottle  {
	bottles := make([]Bottle, 5)
	bottles[0]= Bottle{Id:0, Name:"TEST", PricePerLiter:20000}
	bottles[1]= Bottle{Id:1, Name:"Rum", PricePerLiter:25000}
	bottles[2]= Bottle{Id:2, Name:"Orangensaft", PricePerLiter:10000}
	bottles[3]= Bottle{Id:3, Name:"Apfelsaft", PricePerLiter:10000}
	bottles[4]= Bottle{Id:4, Name:"Cola", PricePerLiter:10000}
	return bottles
}
