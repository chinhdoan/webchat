/** @format */ /** @format */

//firebase.google.com/docs/web/setup#available-libraries -->

// Your web app's Firebase configuration
https: var firebaseConfig = {
	apiKey: "AIzaSyBE3n4WRnjKlNVUNJ79aUIY2VC3iBbNcpM",
	authDomain: "chinh-chatroom.firebaseapp.com",
	databaseURL: "https://chinh-chatroom.firebaseio.com",
	projectId: "chinh-chatroom",
	storageBucket: "chinh-chatroom.appspot.com",
	messagingSenderId: "899751637261",
	appId: "1:899751637261:web:83742c0f8b30a23f3ac044",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

class Chatroom {
	constructor(room, username) {
		this.room = room;
		this.username = username;
		this.chatDB = db.collection("chatDB");
		this.listening;
	}
	async addChat(message) {
		//format a chat object
		const now = new Date();
		const chat = {
			message,
			username: this.username,
			room: this.room,
			created_at: firebase.firestore.Timestamp.fromDate(now),
		};

		//save chat document to database
		const response = await this.chatDB.add(chat);
		return response;
	}
	//listen realtime databases
	getchatDB(callback) {
		this.listening = this.chatDB
			.where("room", "==", this.room)
			.orderBy("created_at")
			.onSnapshot((snapshot) =>
				snapshot.docChanges().forEach((change) => {
					if (change.type === "added") {
						//update the ui
						callback(change.doc.data());
					}
				})
			);
	}
	updateName(newUsername) {
		this.username = newUsername;
		localStorage.setItem("username", newUsername);
	}
	updateRoom(newRoom) {
		this.room = newRoom;
		if (this.listening) {
			this.listening();
			console.log("unlisten");
		}
		console.log("updated");
	}
}

// const chatroom = new Chatroom("general", "jenny");
// chatroom.getchatDB((data) => {
// 	console.log(data);
// });

// setTimeout(() => {
// 	chatroom.updateRoom("gaming"),
// 		chatroom.updateName("Kimmese"),
// 		chatroom.getchatDB((data) => {
// 			console.log(data);
// 		});

// 	chatroom.addChat("hello person");
// }, 3000);
