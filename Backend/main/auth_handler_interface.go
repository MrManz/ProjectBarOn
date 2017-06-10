package main

import "net/http"

type AuthHandler interface {
	http.Handler
	setTokenData(map[string]string)
}

type TokenHolder struct {
	token_data map[string]string
}

func (tokenHolder *TokenHolder) setTokenData(token_data_from_middleware map[string]string)  {
	tokenHolder.token_data = token_data_from_middleware
}
