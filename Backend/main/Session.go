package main

import "sync"

type session struct {
	sync.RWMutex
	ActiveUser user
	Collaborators []user
}