/** @format */
const chatList = document.querySelector(".chat-list");
const newChatRoom = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMssg = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");
//add new chat room
newChatRoom.addEventListener("submit", (e) => {
	e.preventDefault();
	const message = newChatRoom.message.value.trim();
	chatroom
		.addChat(message)
		.then(() => newChatRoom.reset())
		.catch((err) => {
			console.log(err);
		});
});

//update chat rooms
rooms.addEventListener("click", (e) => {
	if (e.target.tagName === "BUTTON") {
		chatUIApp.clear();
		chatroom.updateRoom(e.target.getAttribute("id"));
		chatroom.getchatDB((chat) => {
			chatUIApp.render(chat);
		});
	}
});
//update username
newNameForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const newName = newNameForm.name.value.trim();
	chatroom.updateName(newName);
	newNameForm.reset();
	//show then hide the update message
	updateMssg.innerText = `Your name was updated to ${newName}`;
	setTimeout(() => {
		updateMssg.innerText = ``;
	}, 3000);
});
//check local storage for the name
const username = localStorage.username ? localStorage.username : "anonymous";

//class instance
const chatUIApp = new chatUI(chatList);
const chatroom = new Chatroom("general", username);

//get chat and render
chatroom.getchatDB((data) => {
	chatUIApp.render(data);
});
