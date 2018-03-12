const express = require("express");
const mqtt = require("../mqtt/mqtt-connection");
const router = express.Router();
const { Usage } = require("../models/Usage"); 

router.post("/subscribe/:deviceId/:userId", (req, res) => {
    let deviceID = req.params.deviceId;
    mqtt.subscribeDevice(deviceID).then((granted) => {
        res.status(200).send(granted);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

router.post("/unsubscribe/:deviceId/:userId", (req, res) => {
    let deviceID = req.params.deviceId;
    let userId = req.params.userId;
    mqtt.unsubscribeDevice(deviceID).then((granted) => {
        res.status(200).send(granted);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

router.post("/switch/:deviceId/:action", (req, res) => {
    let deviceID = req.params.deviceId;
    let action = req.params.action === "ON" ? "01" : "00"; 
        mqtt.publishMessage(deviceID, action).then((result) => {
            res.status(200).send(result);
        }).catch((e) => {
            res.status(400).send(e);
        });
});

router.get("/usage/:deviceId", (req, res) => {
    let deviceId = req.params.deviceId;
    console.log(deviceId)
    Usage.find({deviceId: deviceId}).then((usages) => {
        res.status(200).send(usages);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

router.get("/usage/:deviceId/:year/:month/:date", (req, res) => {
    Usage.findOne({
        deviceId: req.params.deviceId,
        year: req.params.year,
        month: req.params.month,
        date: req.params.date
    }).then((usages) => {
        res.status(200).send(usages);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

router.get("/usage/:deviceId/:year/:month", (req, res) => {
    Usage.find({
        deviceId: req.params.deviceId,
        year: req.params.year,
        month: req.params.month
    }).then((usages) => {
        res.status(200).send(usages);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

module.exports = router;