package main

import (
	"net/http"
	"fmt"
)

func orderHandler() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		email:=r.Header.Get("email")
		fam:=r.Header.Get("family_name")
		name:=r.Header.Get("given_name")
		id:=r.Header.Get("userID")
		fmt.Fprintf(w, "Moinsen "+name+" "+fam+" Mail: "+email+" ID: "+id)
	})
}



