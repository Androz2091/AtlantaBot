const express = require("express");
const session = require("express-session");
const { readdir } = require("fs");
const { join, parse, sep } = require("path");
const klaw = require("klaw");

class AtlantaDashboard {
    constructor(client) {
        this.client = client;
        this.app = express();
        this.states = [];
        try {
            this._setup();
            this._loadRoutes();
            this._start();
        } catch (e) {
            throw new Error(e);
        }
    }

    _setup() {
        this.app.set("views", "views");
        this.app.set("view engine", "ejs");
        this.app.use(express.static("public"));
        this.app.set("port", this.client.config.dashboard.port || 3000);
        this.app.use(
            session({
                secret: `ey.${Date.now()}${
                    this.client.user.id
                }${Date.now()}.atlanta.dashboard`,
                resave: false,
                saveUninitialized: false
            })
        );
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use((req, res, next) => {
            req.dashboard = this;
            req.client = this.client;
            req.config = this.client.config;
            next();
        });
    }

    _loadRoutes() {
        const path = join(__dirname, ".", "routes");

        klaw(path).on("data", item => {
            const file = parse(item.path);
            if (!file.ext || file.ext !== ".js") return;

            const { name, Router } = (r => r.default || r)(
                require(join(file.dir, file.base))
            );

            this.app.use(name, new Router());
        });
    }

    _start() {
        try {
            this.app.listen(this.app.get("port"));
            this.client.logger.info(
                `Atlanta Dashboard is listening on port ::${this.app.get(
                    "port"
                )}::`
            );
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = AtlantaDashboard;
