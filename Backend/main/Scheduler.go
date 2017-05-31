package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/contrib/sessions"
)

var concreteBarMachine = BarMachine{Id:"01"}

func BarHandler(c *gin.Context) {
	c.Writer.Write([]byte("BarMachine: " + concreteBarMachine.Id))
}

func main() {

	router := gin.Default()
	router.Use(sessions.Sessions("goquestsession", store))

	router.GET("/login", loginHandler)
	router.GET("/auth", authHandler)
	router.GET("/Bar", BarHandler)

	router.Run("127.0.0.1:9090")
}
