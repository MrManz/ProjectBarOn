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