package main

import "net/http"

//Interface  für alle Handler, die einer Authenifizierung bedürfen
type AuthHandler interface {
	http.Handler
	setTokenData(map[string]string)
}

//Eine Map, die die Daten hält, die bei einer erfolgreichen Authentifizierung entstehen
type TokenHolder struct {
	token_data map[string]string
}

//Setzt Daten in den Tokenholder
func (tokenHolder *TokenHolder) setTokenData(token_data_from_middleware map[string]string)  {
	tokenHolder.token_data = token_data_from_middleware
}
