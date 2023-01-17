const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

// Get username and room from URL

const { username, room } = Qs.parse(window.location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Output message to DOM

const outputMessage = (message) => {
  const div = document.createElement("div");
  div.classList.add("message");
  const p = document.createElement("p");
  p.classList.add("meta");
  p.innerText = message.username;
  const spanTime = document.createElement("span");
  spanTime.innerText = message.time;
  p.appendChild(spanTime);
  div.appendChild(p);

  if (message.lat && message.lon) {
    const layerURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const mapAttribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const mapCoords = [message.lat, message.lon];

    const map = L.map("map").setView(mapCoords, 13);
    L.tileLayer(layerURL, { attribution: mapAttribution }).addTo(map);
    L.marker(mapCoords).addTo(map);

    const locationLink = document.createElement("a");
    locationLink.tabIndex = 0;
    locationLink.classList.add("btn", "link-primary");
    locationLink.innerText = "This is my current location";
    locationLink.setAttribute("data-bs-toggle", "modal");
    locationLink.setAttribute("data-bs-target", "#mapModal");

    div.appendChild(locationLink);
  } else {
    const para = document.createElement("p");
    para.classList.add("text");
    para.innerText = message.text;
    div.appendChild(para);
  }

  document.querySelector(".chat-messages").appendChild(div);
};

// Add room name to DOM
const outputRoomName = (roomDetails) => {
  roomName.innerText = roomDetails;
};

const outputUsers = (users) => {
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.innerText = user.username;
    userList.appendChild(li);
  });
};

// Join chatroom
socket.emit("joinRoom", { username, room });

// Get room and users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on("message", (message) => {
  outputMessage(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text from form
  let msg = e.target.elements.msg.value;
  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit("chatMessage", msg);

  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Prompt the user before leave chat room
document.getElementById("leave-btn").addEventListener("click", () => {
  const leaveRoom = confirm("Are you sure you want to leave the chatroom?");
  if (leaveRoom) {
    // window.location = "../index.html";
    window.location.href = "/";
  }
});

// Listen for send location
document.getElementById("location-btn").addEventListener("click", (e) => {
  e.preventDefault();

  if (!navigator.geolocation) {
    return alert("Geolocation is not supported in your browser");
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
      socket.emit("sendLocationInfo", {
        username: username,
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    },
    () => {
      alert("Unable to get location.");
    }
  );
});

// Location message
socket.on("sendLocationMessage", (message) => {
  outputMessage(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
