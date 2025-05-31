// event module
// this class
const EventEmitter = require("events");
// instance or object
const emitter = new EventEmitter();

// listing to event

emitter.on("messagelogged", (e) => {
  console.log("from listerner", e);
});

// raise event
emitter.emit("messagelogged", { ai: 1 });
