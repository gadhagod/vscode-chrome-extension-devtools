const vscode = acquireVsCodeApi();

window.addEventListener("message", (data) => {
    var res = data.data;

    if (res.status === "GIVE") {
        document.getElementById("location_label").innerHTML = "Location: " + res.message.path;
    } else if (res.status === "ERR") {
        document.getElementById("loading").style.display = "none";
        document.getElementById("project_name").removeAttribute("disabled");
        document.getElementById("extension_type").removeAttribute("disabled");
        document.getElementById("choose_location").removeAttribute("disabled");
        document.getElementById("submit").removeAttribute("disabled");
    } else if (res.status === "LOAD") {
        document.getElementById("loader").innerHTML += "\n" + res.message;
    }
});

function getLocation() {
    vscode.postMessage({
        status: "GET",
        message: "Get location",
    });
}

function submit() {
    let projectName = document.getElementById("project_name").value;
    let extensionType = document.getElementById("extension_type").value;
    let chosenPath = document.getElementById("location_label").innerHTML.replace("Location: ", "");

    document.getElementById("project_name").setAttribute("disabled", "");
    document.getElementById("extension_type").setAttribute("disabled", "");
    document.getElementById("choose_location").setAttribute("disabled", "");
    document.getElementById("submit").setAttribute("disabled", "");

    if (!projectName || !extensionType || !chosenPath) {
        document.getElementById("project_name").removeAttribute("disabled");
        document.getElementById("extension_type").removeAttribute("disabled");
        document.getElementById("choose_location").removeAttribute("disabled");
        vscode.postMessage({
            status: "ERR",
            message: "Missing project configuration",
        });
        return;
    }

    document.getElementById("loading").style.display = "block";

    vscode.postMessage({
        status: "OK",
        message: {
            projectName: projectName,
            extensionType: extensionType,
            chosenPath: chosenPath,
        },
    });
}

(async function() {
    let loadingText = document.getElementById("loading_text");
    let ellipsisDotCount = 1;
    setInterval(() => {
        if(ellipsisDotCount > 2) {
            loadingText.innerHTML = loadingText.innerHTML.replace("...", ".");
            ellipsisDotCount = 1;
        } else {
            loadingText.innerHTML += ".";
            ellipsisDotCount++;
        }
    }, 1000);
})();