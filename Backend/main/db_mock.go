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
	bottles := make([]Bottle, 3)
	bottles[0]= Bottle{Id:0, Name:"Cola", PricePerLiter:6}
	bottles[1]= Bottle{Id:1, Name:"Whisky", PricePerLiter:24}
	bottles[2]= Bottle{Id:2, Name:"Rum", PricePerLiter:24}
	return bottles
}