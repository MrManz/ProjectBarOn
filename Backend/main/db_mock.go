package main

type db_mock struct {
	account map[string]int
	amt int
}

func (mock *db_mock)addToBill(id string, amount int)  {
	if(mock.account==nil){
		mock.account=make(map[string]int)
	}
	amountsofar:=mock.account[id]
	mock.account[id] = amountsofar + amount
}

func (mock *db_mock) getAmount(id string) int  {
	if(mock.account==nil){
		mock.account=make(map[string]int)
	}
	return mock.account[id]
}

func (mock *db_mock) getBottles() []Bottle  {
	bottles := make([]Bottle, 5)
	bottles[0]= Bottle{Id:0, Name:"Vodka", PricePerLiter:20000}
	bottles[1]= Bottle{Id:1, Name:"Rum", PricePerLiter:25000}
	bottles[2]= Bottle{Id:2, Name:"Orangensaft", PricePerLiter:10000}
	bottles[3]= Bottle{Id:3, Name:"Apfelsaft", PricePerLiter:10000}
	bottles[4]= Bottle{Id:4, Name:"Cola", PricePerLiter:10000}
	return bottles
}