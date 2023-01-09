const socket = io()

let userName;
let textarea = document.querySelector('#textarea')
let sendBtn = document.querySelector('#send')
let messageArea = document.querySelector('.message-area')

do {

    userName = prompt('Please enter your name: ')

} while(!userName)


sendBtn.addEventListener('click', (e)=>{
    
    if((textarea.value).length !== 0){
        sendMessage(textarea.value)
    }
    
    
})

function sendMessage(message){

    let msg = {
        user: userName,
        message: message.trim()
    }

    //append message in messagearea

    appendMessage(msg, 'outgoing')
    textarea.value = null
    scrollToBottom()

    // send message to server
    socket.emit('message', msg)

}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup

    messageArea.appendChild(mainDiv)
}

//receive message

socket.on('message', (msg)=>{
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}