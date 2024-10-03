const { error } = require('console');
const fs = require('fs');

// Readable Stream

const readableStream = fs.createReadStream("./my-file.txt", { highWaterMark: 20 });

readableStream.on("data", (chunk) => {
  console.log("New Chunk:", chunk.toString());
});

// Writable Stream

const writableStream = fs.createWriteStream("new-file");

writableStream.write("hello, ");
writableStream.end("world!");

// Duplex stream

const { Transform, pipeline } = require("stream");
const readable = fs.createReadStream("./my-file.txt", { highWaterMark: 20 });
const writable = fs.createWriteStream("new-file.txt");

const uppercase = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  }
});

pipeline(readable, uppercase, writable, (error) => {
  if (error) {
    console.error(error);
  }
});

readable.pipe(uppercase).pipe(writable);