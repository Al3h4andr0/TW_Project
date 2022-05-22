const todos = require('../data/todos');
const notFound = (id) => ({message: `Todo with id ${id} not found`});

class TodosControler {

    async getTodos(id) {
        return new Promise((resolve, reject) => {
            if (typeof id === 'undefined') {
                return resolve(todos);
            }

            id = parseInt(id);
            let todo = todos.find((todo) => todo.id === id);

            if (todo) {
                resolve(todo)     
            } else {
                reject(notFound(id));
            }
        });
    }

    async createTodo(todo) {
        return new Promise((resolve, _) => {
            let newTodo = {
                ...todo,
                id: todos[todos.length -1].id + 1
            }

            todos.push(newTodo);
            resolve(newTodo);
        });
    }

    async updateTodo(id, values) {
        id = parseInt(id);

        return new Promise((resolve, reject) => {
            let todoIndex = todos.findIndex((todo) => {
                return todo.id === id
            });

            if (todoIndex !== -1) {
                for (let key in values) {
                    todos[todoIndex][key] = values[key];
                }
                resolve(todos[todoIndex]);
            } else {
                reject(notFound(id));
            }
        })
    }

    async deleteTodo(id) {
        id = parseInt(id);

        return new Promise((resolve, reject) => {
            let todoIndex = todos.findIndex((todo) => todo.id === id);

            todos.splice(todoIndex, 1);

            if (todoIndex !== -1) {
                resolve('Todo deleted');
            } else {
                reject(notFound(id));
            }

        });
    }
}

module.exports = TodosControler;