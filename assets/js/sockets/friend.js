const addBtn = document.getElementById('addBtn');

const myName = document.getElementById('myName').value;
const myImage = document.getElementById('myImage').value;
const friendId = document.getElementById('friendId').value;
const friendName = document.getElementById('friendName').value;
const friendImage = document.getElementById('friendImage').value;

// this function can take parameter (eventObject)
// (eventObject): contain set of proparity and methods like pervrntDefault
addBtn.onclick = (e) => {
    // preventDefault to prevent button to submit default behaver that is submit form  
    e.preventDefault()
    socket.emit('sendFriendRequests', {
        // myId: myId
        // myName: myName
        // myImage: myImage
        // friendId: friendId
        // friendName: friendName
        // friendImage: friendImage
        // in key value paries : if the value like key i can write key just
        myId, 
        myName, 
        myImage, 
        friendId, 
        friendName, 
        friendImage
    });
};

socket.on('requestSent', () => {
    addBtn.remove()
    document.getElementById('friends-from').innerHTML += '<input type="submit" value="Cancel Request" class="btn btn-danger" formaction="/friend/cancel">';
})