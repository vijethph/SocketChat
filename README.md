<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="SocketIO Chat"></a>
</p>

<h2 align="center">Socket Chat</h2>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]() 
  [![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> A SocketIO based online chat application which can be deployed to Localtunnel
    <br> Made with HTML, CSS and Javascript
</p>

## 📝 Table of Contents
- [Screenshots](#screenshots)
- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## Screenshots <a name="screenshots"></a>
![Login page](img/login.jpg "Login Screen")
![Chat Page](img/chatting.jpg "Chatting Screen")

## 🧐 About <a name = "about"></a>
This is a javascript program that can be used to connect online with friends by hosting one server at any particular point. It uses Express and SocketIO frameworks to establish and maintain the connection.

Users can simply join into the chat and put up messages which can be read by others.

## 🏁 Getting Started <a name = "getting_started"></a>
Follow these instructions in order to get a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on as a live server.

### Prerequisites
node.js>=10 and npm>=2.25 are required. 

After installing, check their versions using these commands

```
node -v
npm -v
```

### 🧱 Installing <a name="installing"></a>
Clone this project and open this project in terminal.

Install Express and SocketIO

```
npm install express
npm install socketio
```

And run the project using following command and check the output at https://localhost:3000 in your browser.

```
node server.js
```

The following output will be shown in the terminal after running above command.

```
listening on *:3000
```

<!--## 🔧 Running the tests <a name = "tests"></a>
Explain how to run the automated tests for this system.

### Break down into end to end tests
Explain what these tests test and why

```
Give an example
```

### And coding style tests
Explain what these tests test and why

```
Give an example
```
-->

## 🎈 Usage <a name="usage"></a>
This application can be used by others if it is deployed using the steps in [deployment](#deployment). For usage by a single user, the above [installation](#installing) steps are sufficient. 

## 🚀 Deployment <a name = "deployment"></a>
After starting the server, open another terminal, connect to the internet and type the following

```
npm install -g localtunnel
lt --port 3000
```
Now the project is deployed. It will show an output giving a website address like this:
```
deployed at
```
Ask your friends to open up the specified url and start chatting.

## ⛏️ Built Using <a name = "built_using"></a>
- [Express](https://expressjs.com/) - Server Framework
- [SocketIO](https://socketio.com/) - Connection Framework
- [NodeJS](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>
- [@vijethph](https://github.com/vijeth) - Idea & Full Development

See also the list of [contributors](https://github.com/vijethph/) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>
- Thanks to CPMA Session conducted by ATS Learning Solutions 
- Inspiration: Project Ideas for Javascript
- References: All Youtube Channels for using ScoketIO.


### Made with ❤ in India 