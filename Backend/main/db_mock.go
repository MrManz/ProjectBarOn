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

func (mock *db_mock) getBottles(path string) []Bottle  {
	bottles := make([]Bottle, 4)
	bottles[0]= Bottle{Id:0, Name:"Vodka", PricePerLiter:2000, PathToPicture:"http://"+path+"/pictures/vodka.jpg", Pin:"5"}
	bottles[1]= Bottle{Id:1, Name:"Rum", PricePerLiter:2500, PathToPicture:"http://"+path+"/pictures/captain.png", Pin:"6"}
	bottles[2]= Bottle{Id:2, Name:"Orangensaft", PricePerLiter:1000, PathToPicture:"http://"+path+"/pictures/osaft.jpg", Pin:"7"}
	bottles[3]= Bottle{Id:3, Name:"Cola", PricePerLiter:1000, PathToPicture:"http://"+path+"/pictures/cola.jpg", Pin:"8"}
	return bottles
}

func (mock *db_mock) getRecipes() []Recipe  {
	recipes := make([]Recipe, 1)
	recipes[0]=Recipe{Name:"Rum-Cola", Id:1}
	return recipes
}

func (mock *db_mock) getIngredients(id int) []Ingredient  {
	ingredients := make([]Ingredient, 2)
	if(id == 1){
		ingredients[0]=Ingredient{Id:1, Volume:150}
		ingredients[1]=Ingredient{Id:4, Volume:150}
	}
	return ingredients
}