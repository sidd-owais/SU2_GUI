console.log("hello world from preload.js");
const { contextBridge } = require("electron");
const fs = require("fs");
// const process = require("process");
// const Buffer = 0;
const ipcRenderer = require("electron").ipcRenderer;
// const 
contextBridge.exposeInMainWorld(
    "modules",
    {
        fs,
        ipcRenderer
    }
)
// require, process, Buffer, global, setImmediate, clearImmediate, exports
// console.log(document);

/* ipc */

ipcRenderer.on(
    "hello",
    (event, ...args) =>
    {
        console.log("event:", event);
        console.log(args);
        ipcRenderer.send("hi");
    }
);

ipcRenderer.on(
    "SU2-success",
    (event, ...args) =>
    {
        console.log("su2 ran successfully!!");
        document.querySelector("#run-simulation").classList.remove("hidden");
    }
    );
    ipcRenderer.on(
        "SU2-failed",
        (event, ...args) =>
        {
            document.querySelector("#run-simulation").classList.remove("hidden");
            console.log("su2 failed! please retry");
        }
    );
