package main

import (
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/contrib/sessions"
)

var concreteBarMachine = BarMachine{Id:"01"}

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "BarMachine: " + concreteBarMachine.Id)
}

func main() {

	router := gin.Default()
	router.Use(sessions.Sessions("goquestsession", store))

	router.GET("/login", loginHandler)
	router.GET("/auth", authHandler)

	router.Run("127.0.0.1:9090")

	http.HandleFunc("/", handler)
	http.ListenAndServe(":8080", nil)
}
