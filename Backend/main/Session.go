package main

import "sync"

type session struct {
	sync.RWMutex
}