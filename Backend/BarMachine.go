package main

import "sync"

type BarMachine struct {
	sync.RWMutex
	Id string
	BarSession session
}

func NewBarMachine(id string) *BarMachine {
	b := BarMachine{Id:id}
	b.BarSession = session{}
	return b
}


func (b *BarMachine) CheckIfIdle() {

}