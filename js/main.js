(function() {
    'use strict';

    //? two way data binfing(to UI)
    var vm = new Vue({
        el: '#app',
        data: {
            newItem: '',
            todos: []
        },
        watch: {
            todos: {
                handler: function() {
                    localStorage.setItem('todos', JSON.stringify(this.todos));
                },
                deep: true
            }
        },
        mounted: function() {
            this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        },
        methods: {
            addItem: function() {
                var item = {
                    title: this.newItem,
                    isDone: false
                };
                this.todos.push(item);
                this.newItem = ''; //? this.newItemを空文字することで、値が消える
            },
            deleteItem: function(index) {
                if (confirm("削除してもよろしいですか？")) {
                    this.todos.splice(index, 1);
                }
            },
            purge: function() {
                if(!confirm("全て削除しますか？")) {
                    return;
                }
                this.todos = this.remaining;
            }
        },
        computed: {
            remaining: function() {
                return this.todos.filter(function(todo) {
                    return !todo.isDone;
                });
            }
        }
    });
})();