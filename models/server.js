const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.middlewares();
		this.routes();
	}

	// global middlewares 
	middlewares() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.static("public"));
        this.app.use(fileUpload());
	}

	// routes for the api
	routes() {
		this.app.use('/api/file', require("../routes/file.routes"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("sever listen ", this.port);
		});
	}
}

module.exports = Server;
