// this file will initlize socketIO in any where in clinte  
const socket = io();
const btn = document.getElementById('friendRequestsDropdown');
let myId = document.getElementById('userId').value;


socket.on("connect", () => {
    socket.emit('joinNotificationsRoom', myId);
    socket.emit('goOnline', myId);
});

// listen on event "newFriendRequest" from init.js file for i need it public in friend request and chating

socket.on('newFriendRequest', data => {
    const friendRequests = document.getElementById('friendRequests');
    const span = friendRequests.querySelector('span');
    if (span) span.remove();
    friendRequests.innerHTML += `
    <a class="dropdown-item" href="/profile/${data.id}">
        ${data.name}
    </a>    
    `;
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-danger');
    
});


document.getElementById('friendRequestsDropdown').onclick = () => {
    btn.classList.remove('btn-danger');
    btn.classList.add('btn-primary');
}