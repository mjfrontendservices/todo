$(document).ready(function () {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('./serviceWorker_cached.js')
                .then(reg => console.log('Service worker registered'))
                .catch(err => console.log(`Service worker error: ${err}`));
        });
    }

    let todo = JSON.parse(localStorage.getItem('todo'));
    if (!todo) {
        todo = [];
    }
    let done = JSON.parse(localStorage.getItem('done'));
    if (!done) {
        done = [];
    }
    function addTodo(task) {
        localStorage.setItem('todo', JSON.stringify(task));
    }
    function addDone(done_task) {
        localStorage.setItem('done', JSON.stringify(done_task));
    }

    function insertTodo(todo_id, todos) {
        let theSameId;
        let id = todo.findIndex(x => x.id === todo_id);
        if (id === -1) {
            theSameId = false;
        } else {
            theSameId = true;
        }
        if (theSameId === true) {
            alert('Click add button again');
        } else {
            if (todos === "") {
                alert('Empty todo');
            } else {
                let todo_task = {
                    id: todo_id,
                    todo: todos
                };
                todo.push(todo_task);
                addTodo(todo);
                window.location.reload();
            }
        }
    }

    $('.add_todo_list').on('click', function () {
        insertTodo(
            Math.floor((Math.random() * 1000000) + 1),
            $('.add_todo_input').val()
        );
        $('.todo_count').text(todo.length);
        if ($('.add_todo_input').val() != "") {
            $(this).hide();
            $('.spin_btn').show();
        }
    });

    $('.todo_count').text(todo.length);

    todo.forEach(_todo => {
        $('.tasks .container').append(
            `
            <div class="lists">
                <div class="task">
                    <p>${_todo['todo']}</p>
                </div>
                <div class="done">
                    <i data-id="${_todo['id']}" data-done="${_todo['todo']}" class="fa fa-check _don"></i>
                </div>
                <div class="del">
                    <i data-id="${_todo['id']}" class="fa fa-trash _delete"></i>
                </div>
            </div>
            `
        );
    });

    // delete todo

    $('._delete').click(function () {
        let ids = $(this).attr('data-id');
        let index = todo.findIndex(xa => xa.id === parseInt(ids));
        if (index != -1) {
            todo.splice(index, 1);
        }
        localStorage.setItem('todo', JSON.stringify(todo));
        $('.todo_count').text(todo.length);
        window.location.reload();
    });

    // done todo

    function insertDone(done_id, todo_) {
        let theSameId;
        let id = done.findIndex(x => x.id === done_id);
        if (id === -1) {
            theSameId = false;
        } else {
            theSameId = true;
        }
        if (theSameId === true) {
            alert('Click add button again');
        } else {
            let done_task = {
                id: done_id,
                todo: todo_
            };
            done.push(done_task);
            addDone(done);
            window.location.reload();
        }
    }

    $('._don').on('click', function () {
        insertDone(
            $(this).attr('data-id'),
            $(this).attr('data-done')
        );
        let ids = $(this).attr('data-id');
        let index = todo.findIndex(xa => xa.id === parseInt(ids));
        if (index != -1) {
            todo.splice(index, 1);
        }
        localStorage.setItem('todo', JSON.stringify(todo));
        $('.todo_count').text(todo.length);
        $('.done_count').text(done.length);
        window.location.reload();
    });

    $('.done_count').text(done.length);

    done.forEach(_todo => {
        $('._tasks .container').append(
            `
            <div class="_done">
                <div class="task">
                    <p>${_todo['todo']}</p>
                </div>
                <div class="del">
                    <i data-delete-done="${_todo['id']}" class="fa fa-trash _done_del"></i>
                </div>
            </div>
            `
        );
    });

    $('._done_del').click(function () {
        let ids = $(this).attr('data-delete-done');
        let index = done.findIndex(xa => xa.id === ids);
        if (index != -1) {
            done.splice(index, 1);
        }
        localStorage.setItem('done', JSON.stringify(done));
        $('.done_count').text(done.length);
        window.location.reload();
    });
});