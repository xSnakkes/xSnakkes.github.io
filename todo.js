    let addMessage = document.querySelector('.message'),
    addButtom = document.querySelector('.add'),
    todo = document.querySelector('.todo')

let todoList = []

if(localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'))
    displayMessage()
}

addButtom.addEventListener('click', function(){
    if(!addMessage.value) return
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        import: false
    }
        
    todoList.push(newTodo)
    displayMessage()
    localStorage.setItem('todo', JSON.stringify(todoList))
    addMessage.value = ''
})


function displayMessage(){
    let displayMessage = ''
    todoList.forEach(function(item, i){
        displayMessage += `
        
        <li>
            <div class="galka">
            <label class="but">
            <input class="better" type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
            <span class="checkbox">
            </span>
            </label>
            </div>
            <div class="texting">
            
            <label for='item_${i}' class="${item.important ? 'important' : ''}">${item.todo}</label>
            </div>
        </li>
        
        `
        todo.innerHTML = displayMessage
    })

}

todo.addEventListener('change', function(event){
    let valueLabel = todo.querySelector('[for='+ event.target.getAttribute('id') +']').innerHTML
    todoList.forEach(function(item){
        if (item.todo === valueLabel){
            item.checked = !item.checked
            localStorage.setItem('todo', JSON.stringify(todoList))
        }
    })
})

todo.addEventListener('contextmenu', function(event){
    event.preventDefault()
    todoList.forEach(function(item, i){
        if(item.todo === event.target.innerHTML){
            if(event.ctrlKey || event.metaKey){
                todoList.splice(i, 1)
            }else{
                item.important = !item.important
            }
            displayMessage()
            localStorage.setItem('todo', JSON.stringify(todoList))
        }
    })
})
