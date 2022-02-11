const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


// Get username and room from URL
var notif_count = 0;
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

//Setting OnFocusSate//
var isFocused = true;
function onFocus(){
    isFocused = true;
};
function onBlur() {
    isFocused = false;
};
window.onfocus = onFocus;
window.onblur = onBlur;

// Message from server
socket.on('message', message => {
  console.log(message);
  outputMessage(message);
  if (message.username !== username && message.username !== 'ChatRoom Bot'){
    document.getElementById('myAudio').play();
    // alert('New Message Recieved');
    myFunction();
  }
  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', e => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;
  
  msg = msg.trim();
  
  if (!msg){
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach(user=>{
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
 }

function myFunction() {
  if (!isFocused) {    
    // If the user is on another tab, show there's a new message
    notif_count += 1;
    document.title = "(" + notif_count + ") " + " New Messages";
  }
  window.onfocus = function() {
    notif_count = 0;
    document.title = "Alfie's Chatroom";
  }
}

function showNotificationCount(count){
  const pattern = /^\(\d+\)/;
  if(count === 0 || pattern.test(document.titile)){
    document.title = document.title.replace(pattern, count === 0 ? "" : "(" + count + ")");
    console.log("if");
  }
  else{
    console.log("else");
    document.title = "(" + count + ")" + document.title;
  }
}


(function() {
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAa1JREFUOE+tks1rE2EQxp9n3zRJs40I/QcUbHst9iioa7aCHvygFE23VMT/Qb3rUfGmFz30Y5OAoHgQQTdNTkJB6EnwWMVDv05hkw2074xUMHQ10kM6t2FmfjzPzBADBgecx/EBut7shDXZZQB5VV0Vq49PNKu7RylMKWj7wTuQ134PKTYVaBEwVHxXSF2S5GXx89vtw9AUIPHLdwXOKwAfHdGaCr/t0apxOEaaGUDPA1xwo5X3fyA9gJ65kktOjX4VtY9G6tXFftLb/tx1gIvOvp0cbtY2Dnp6gNi7XaIxD90onI4vlcug3aE4OdJkSbsLZk4PRytLnen5qoh+GamHT1OAxJ+/KNT77qfwars0d8/Q2RTYvCjzGWDLKsbc1cqLjh8sAbpeiCrPUgCdmhpqn5xYp8gDt1HreTxsJfHKF8SY19zvnC003/xMAQ6SuBTcUeJmMQpvtLzgXDaj29hz1FLGYTgD4rKILhTrlca/SwScjh98cJQbQhmC0gOxA8AA+gPKqBBjmWthq+8Zu6Vb48LMcwVzUGl0Yz4Z/au532WO75WPetn/1QdW8AvlTKwRZGGQnQAAAABJRU5ErkJggg==';
    document.getElementsByTagName('head')[0].appendChild(link);
})();