package main

import (
	"net/http"
	"fmt"
	"io/ioutil"
	"encoding/json"
	"time"
	"strconv"
)
//Middleware dient zur Überprüfung des Authorization Headers
func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		//get Token
		token:=r.Header.Get("Authorization")
		//ist Header gesetzt?
		if(token == ""){
			//kein Header == Abbruch
			w.WriteHeader(http.StatusUnauthorized)
			fmt.Fprintf(w, "Kein Authorization Header gesetzt!")
			return
		}
		//Token an Google senden
		resp, err := http.Get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token="+token)
		fmt.Println("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token="+token)
		if err != nil {
			// Abbruch
			w.WriteHeader(http.StatusUnauthorized)
			fmt.Fprintf(w, "Es ist ein unerwarteter Fehler aufgetreten, bitte nochmal versuchen")
		}
		defer resp.Body.Close()
		//Google lieft einen Status 400 auf die Anfrage zurück, wenn der Token kaputt ist
		if(resp.StatusCode==400){
			//falscher Token == Abbruch
			w.WriteHeader(http.StatusUnauthorized)
			fmt.Fprintf(w, "Der Token ist ungültig!")
			return
		}
		//Daten aus Token auslesen
		body, err := ioutil.ReadAll(resp.Body)
		if(err != nil){
			w.WriteHeader(http.StatusUnauthorized)
			fmt.Fprintf(w, "Es ist ein unerwarteter Fehler aufgetreten, bitte nochmal versuchen")
			return
		}
		//Daten von JSON entpacken
		token_data := make(map[string]string)
		if err := json.Unmarshal(body, &token_data); err != nil {
			panic(err)
		}
		//aud prüfen
		if(token_data["aud"]!="839090909377-3ng2immnrb7i0ukkmiqm250vkankfb39.apps.googleusercontent.com"){
			w.WriteHeader(http.StatusUnauthorized)
			fmt.Println("Token wurde nicht auf die App ausgestellt")
			return
		}
		//iss prüfen
		if(token_data["iss"]!="accounts.google.com"){
			w.WriteHeader(http.StatusUnauthorized)
			fmt.Println("Token wurde nicht von Google Accounts ausgestellt")
			return
		}
		//zeitstempel prüfen
		fmt.Println(time.Now().Unix())
		timestamp, err := strconv.ParseInt(token_data["exp"], 10, 32)
		if(err != nil){
			w.WriteHeader(http.StatusUnauthorized)
			fmt.Fprintf(w, "Es ist ein unerwarteter Fehler aufgetreten, bitte nochmal versuchen")
			return
		}
		if(timestamp < time.Now().Unix()){
			w.WriteHeader(http.StatusUnauthorized)
			fmt.Println("Token ist abgelaufen")
			return
		}
		//Alle Daten in den Header setzen
		r.Header.Set("email", token_data["email"])
		r.Header.Set("userId", token_data["sub"])
		r.Header.Set("given_name", token_data["given_name"])
		r.Header.Set("family_name", token_data["family_name"])
		//Handler aufrufen
		next.ServeHTTP(w, r)
	})
}

//Header davor Löschen, um zu vermeiden dass er schon gesetzt ist
func setHeaderSecure(header *http.Header,key string, value string)  {
	header.Del(key)
	header.Add(key,value)
}
