package main

//der Handler dient nur dazu zu zeigen, wie die Authentifizierungs-Middleware funktioniert, sowie zum Test

import (
	"net/http"
	"fmt"
)

type BeispielHandler struct {
	TokenHolder //kann man hier selbst definieren, dann muss aber die Methode setTokenData definiert werden (siehe Interface authHandler)
}

//Erzeugung muss mit Create Methode erfolgen, wenn Multithreading funktionieren soll
func CreateBeispielHandler() *BeispielHandler {
	return &BeispielHandler{}
}

//ServeHTTP Methode muss definiert werden
func (beispielHandler BeispielHandler)ServeHTTP(w http.ResponseWriter, r *http.Request)  {
	//Handlername.token_data beinhaltet die Daten, die im Token sind
	email:= beispielHandler.token_data["email"]
	fam:=beispielHandler.token_data["family_name"]
	name:=beispielHandler.token_data["given_name"]
	id:=beispielHandler.token_data["sub"]
	//Alle Daten sind als Strings kodiert
	fmt.Fprintf(w, "Moinsen "+name+" "+fam+" Mail: "+email+" ID: "+id)
}
