/** @format */

class chatUI {
	constructor(list) {
		this.list = list;
	}
	clear() {
		this.list.innerHTML = "";
	}

	render(data) {
		const cal = Math.floor(data.created_at.seconds / 1000);
		const html = `
      <li class="list-group-item">
          <span class="username">${data.username}</span>
          <span class="message">${data.message}</span>
          <div class="time">${Math.floor(cal / 60 / 60 / 24 / 12) + " days"}</div>
      </li>
    `;

		this.list.innerHTML += html;
	}
}
