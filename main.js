const { app, BrowserWindow } = require("electron");
// console.log("hello world from main.js");
const child_process = require("child_process");

// const process = require("process");

const fs = require("fs");
const path = require('path');

let browserWindow;
// npm 
function appOnReady()
{
    // ipcMain.handle("");
    browserWindow = new BrowserWindow(
        {
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, "sources\\preload.js"),
                nodeIntegration: true
            }
        }
    );
    browserWindow.loadFile(path.join(__dirname, "app\\index.html"));

    const { ipcMain } = require("electron");
    ipcMain.on(
        "hi",
        (event, ...args) =>
        {
            console.log("event:", event);
            console.log("args:", args);
            browserWindow.webContents.send("hello");
        }
    );
    ipcMain.on(
        "runSU2",
        (event, ...args) =>
        {
            runSU2();
            // console.log("event:", event);
            // console.log("args:", args);
            // browserWindow.webContents.send("hello");
        }
    );
    ipcMain.on(
        "runPV",
        (event, ...args) =>
        {
            console.log("runPV");
            runPV();
            // console.log("event:", event);
            // console.log("args:", args);
            // browserWindow.webContents.send("hello");
        }
    );
    // browserWindow.webContents.send("hello");

    // console.log("foo");

}

app.on("ready", appOnReady);
app.on("window-all-closed", 
    () =>
    {
        console.log("unfortunately all windows were closed");
        app.quit();
    }
)


// console.log(process.version);

// fs.writeFile("file.txt", "hello world from main.js", () => {});
// console.log("bar");

// console.log("__dirname:", __dirname);
// console.log(path.join(__dirname, "hello"));
// let PRE = "cd " + path.join(__dirname, "simulation");
// let SU2_PATH = 
// let SU2_ARGUMENTS = [];
// console.log(SU2_PATH);


function SU2OnExit(error, stdout, stderr)
{
    if(null == error)
    {
        browserWindow.webContents.send("SU2-success");
    }
    else
    {
        browserWindow.webContents.send("SU2-failed");
    }
    // console.log(error);

}

function runSU2()
{
    // child_process.execFile(
    //     PRE + SU2_PATH,
    //     SU2_ARGUMENTS,
    //     (error) =>
    //     {
    //         if(error)
    //         {
    //             console.log(error);
    //         }
    //         console.log("SU2 DONE!");
    //     }
    // );
    // exec(SU2_PATH, )
    // let SCRIPT = "cd \"" + path.join(__dirname, "simulation\" ; ");
    // //  + 
    // // path.join(__dirname, "bin\\SU2_CFD.exe") + " " + path.join(__dirname, "simulation\\inv_NACA0012.cfg");
    // child_process.exec(SCRIPT, (error, stdout, stderr) =>
    // {
    //     console.log(error, stdout, stderr);
    // })
    scriptPath = "powershell " + path.join(__dirname, "simulation\\script.ps1");
    console.log(scriptPath);
    child_process.exec(scriptPath, SU2OnExit);
}
// console.log(app.getAppPath());
// runSU2();



/* ipcMain */


// to send message: 
// browserWindow.

function runPV()
{
    scriptPath = "powershell " + path.join(__dirname, "simulation\\scriptParaview.ps1");
    console.log(scriptPath);
    child_process.exec(scriptPath, () => { });
}