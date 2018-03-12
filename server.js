const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const mqtt = require("./mqtt/mqtt-connection");
const broker = require("./mqtt/broker");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const { mongoose } = require("./db/connection");
const { User } = require("./models/User");
const { updateUsage } = require("./controller/UsageController");

const app = express();

let buffer = {}

broker.init();
mqtt.addListener((topic, message) => {
    console.log(`${topic.toString()} : ${message}`);
    let deviceId = topic.toString().split("/")[1]
    let operation = message.toString().substring(0,2);

    if(operation === "00"){
        
    }else if(operation === "01"){
        
    }else if(operation === "10"){
        
    }else if(operation === "11"){
        let currentTime = new Date();
        if(buffer[deviceId]){
            let P = 230.0 * buffer[deviceId].current * (currentTime.getTime() - buffer[deviceId].timeStamp) / (3600 * 1000* 1000);
            console.log(P);
            updateUsage(deviceId, currentTime, P);
        }
        buffer[deviceId] = {
            timeStamp: currentTime.getTime(),
            current: parseFloat(message.toString().substring(2))
        }
    }
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            console.log(user)
            if (!user) {
                return done(null, false);
            }
            if (!user.validPassword(password)) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

passport.serializeUser((user, done) => {
    done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(undefined, user);
    })
});

app.use(cookieSession({
    maxAge: 2592000000,
    keys: ["secret"]
}))

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use(passport.session());

app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", function(err, user) {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).send();
        }

        req.logIn(user, function(err) {
            if (err) {
            return next(err);
            }
            return res.send(user.id);
        });
    })(req, res, next);
});

app.get("/api/current_user", (req, res) => {
    res.send(req.user);
});

app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

app.post("/api/signup", (req, res) => {
    let user = new User();
    user.username = req.body.username;
    user.password = user.generateHash(req.body.password);
    user.save().then((result) => {
        res.status(200).send(result);
    }).catch((e) => res.status(400).send(e));
});

app.use("/", routes);

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(3000, () => console.log("Server is up on 3000"));