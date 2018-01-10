import React, { Component } from 'react'
import { observable, computed, autorun } from 'mobx'

class ObservableTodoStore {
  @observable todos = []
  @observable pendingRequests = 0

  constructor() {
    autorun(() => console.log(this.report))
  }

  @computed
  get completeTodosCount() {
    return this.todos.filter(todo => todo.completed === true).length
  }

  @computed
  get report() {
    if (this.todos.length === 0) return '<none>'
    return `Next todo: "${this.todos[0].task}". Progress: ${this.completeTodosCount}/${this.todos.length}`
  }

  addTodo(task) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null
    })
  }
}

const observableTodoStore = new ObservableTodoStore()

observableTodoStore.addTodo('read MobX tutorial')

observableTodoStore.addTodo('try MobX')

observableTodoStore.todos[0].completed = true

observableTodoStore.todos[1].task = 'try MobX in own project'

observableTodoStore.todos[0].task = 'grok MobX tutorial'
