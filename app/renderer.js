"use strict";


// console.log("hello world from script.js");
// console.log(xyz.versionNode);
// console.log(xyz.versionChrome);
// console.log(xyz.versionElectron);
// console.log(`${xyz.versionNode, xyz.versionChrome,xyz.versionElectron}`);
let config = modules.fs.readFileSync("others/inv_NACA0012.cfg", "utf-8");
// console.log(config);
function p(n)
{
    console.log(n);
    return -1;
}
// let arr = [-1, -2, -3, -4];
// let i = 0, j = 1;
// console.log(arr[i++, j++]);

// console.log(x);
// while(true);

console.log(modules);

let domInputAngleOfAttack = document.querySelector("#input-angle-of-attack");
let domInputTemperature = document.querySelector("#input-temperature");
let domInputMachNumber = document.querySelector("#input-mach-number");


let cnt = 0;
let fs = modules.fs;
let shell = modules.shell;

function btnRunSimulationOnClick()
{
    let angleOfAttack = domInputAngleOfAttack.value;
    console.log("angleOfAttack:", angleOfAttack);
    if(angleOfAttack == undefined)
    {
        angleOfAttack = "1.25";
    }
    let freeStreamTemperature = domInputTemperature.value;
    console.log("freeStreamTempreature:", freeStreamTemperature);
    if(freeStreamTemperature == undefined)
    {
        freeStreamTemperature = "273.15";
    }

    let machNumber = domInputMachNumber.value;
    console.log("machNumber:", machNumber);
    if(machNumber == undefined)
    {
        machNumber = 0.8;
    }
    // console.log("runSimulation()");
    generateConfigFile(angleOfAttack, freeStreamTemperature, machNumber);
    runSimulation();
}


function generateConfigFile(angleOfAttack, temperature, machNumber)
{
    console.log("generating config file");
    let regexAngleOfAttack = /(AOA= ).*/;
    let regexMachNumber = /(MACH_NUMBER= ).*/;
    let regexFreeStreamTemperature = /(FREESTREAM_TEMPERATURE= ).*/;

    // console.log(config.match(regexAngleOfAttack)[1]);
    // console.log(config.match(regexAngleOfAttack).toString());

    config = config.replace(regexAngleOfAttack, () => "AOA= " + angleOfAttack);
    config = config.replace(regexMachNumber, () => "MACH_NUMBER= " + machNumber);
    config = config.replace(regexFreeStreamTemperature, () => "FREESTREAM_TEMPERATURE= " + temperature);
    fs.writeFileSync("simulation/inv_NACA0012.cfg", config);
    console.log("successfully written file");
}

function runSimulation()
{
    
    // console.log(fs.open.toString());
    // fs.readFileSync("./sample.cfg");
    // fs.writeFileSync("c:/temp/file" + cnt++ + ".txt", "file write successfull!!");
    // fs.open(
    //     "c:/temp/file.txt",
    //     "w+",
    //     (err, fd) =>
    //     {
    //         fs.appendFile(fd, "hello world!!");
    //         fclose(
    //             fd,
    //             err =>
    //             {
    //                 console.log(err);
    //             }
    //         );
    //         flag = true;
    //     }
    // );
    
    // console.log()
    // shell.openExternal("C:/Users/romeo/OneDrive/Desktop/electron/script_su2.ps1");
    // modules.runSU2();
    modules.ipcRenderer.send("runSU2");
    document.querySelector("#run-simulation").classList.add("hidden");

}

function openInParaview()
{
    console.log("openInParaview()");
    modules.ipcRenderer.send("runPV");
    // shell.openExternal("C:/Users/romeo/OneDrive/Desktop/electron/script_paraview.ps1");
}

document.querySelector("#run-simulation").addEventListener("click", btnRunSimulationOnClick);
document.querySelector("#open-in-paraview").addEventListener("click", openInParaview);
document.querySelector("#run-script").addEventListener("click", runScript);

function runScript()
{
    console.log("runScript()");
    shell.openExternal("C:/Users/romeo/OneDrive/Desktop/electron/script.ps1");
}



// let config = 
// {
    
// }



function runSU2()
{
    
}







/* ipc */

console.log(modules.ipcRenderer);

let object =
{
    member1: "hello",
    member2: "world",
    method1: function foo()
    {
        return "foo";
    },
    method2: function bar()
    {
        return "bar";
    },
    // toString: function toString()
    // {
    //     return "object!!";
    // }
};
