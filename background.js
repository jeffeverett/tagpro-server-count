var trackedServer = "sphere";

// let player play tagpro when icon clicked
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.update(tab.id, {
        url: "http://tagpro-" + trackedServer + ".koalabeast.com/games/find/"
    });
});

function changeTrackedServer(server) {
    trackedServer = server;

    chrome.storage.sync.set({server: trackedServer});

    // update immediately so player does not have to wait
    updatePlayerCount();
}

function updatePlayerCount() {
    // check player count
    $.ajax({
        type: "GET",
        url: "http://tagpro-" + trackedServer + ".koalabeast.com/stats",
        success: function(data) {
            // indicate player count in badge text
            chrome.browserAction.setBadgeText({
                text: data.players.toString()
            });

            if (data.players >= 7) {
                // green for enough players to join
                chrome.browserAction.setBadgeBackgroundColor({
                    color: "#1ABB07"
                });
            }
            else {
                // red for not enough players
                chrome.browserAction.setBadgeBackgroundColor({
                    color: "#DB0F35"
                });
            }
        },
        error: function() {
            chrome.browserAction.setBadgeText({
                text: "ERR"
            });

            // red for error
            chrome.browserAction.setBadgeBackgroundColor({
                color: "#DB0F35"
            });
        }
    });
}

chrome.storage.sync.get("server", function(data) {
    if (data.server)
        trackedServer = data.server;

    // register radio buttons for all servers
    chrome.contextMenus.create({
        title: "Choose server to track",
        id: "server_choice",
        contexts: ["browser_action"]
    });

    chrome.contextMenus.create({
        title: "Track Centra",
        parentId: "server_choice",
        type: "radio",
        checked: trackedServer === "centra",
        contexts: ["browser_action"],
        onclick: function() {
            changeTrackedServer("centra");
        }
    });

    chrome.contextMenus.create({
        title: "Track Chord",
        parentId: "server_choice",
        type: "radio",
        checked: trackedServer === "chord",
        contexts: ["browser_action"],
        onclick: function() {
            changeTrackedServer("chord");
        }
    });

    chrome.contextMenus.create({
        title: "Track Diameter",
        parentId: "server_choice",
        type: "radio",
        checked: trackedServer === "diameter",
        contexts: ["browser_action"],
        onclick: function() {
            changeTrackedServer("diameter");
        }
    });

    chrome.contextMenus.create({
        title: "Track Orbit",
        parentId: "server_choice",
        type: "radio",
        checked: trackedServer === "orbit",
        contexts: ["browser_action"],
        onclick: function() {
            changeTrackedServer("orbit");
        }
    });

    chrome.contextMenus.create({
        title: "Track Origin",
        parentId: "server_choice",
        type: "radio",
        checked: trackedServer === "origin",
        contexts: ["browser_action"],
        onclick: function() {
            changeTrackedServer("origin");
        }
    });

    chrome.contextMenus.create({
        title: "Track Pi",
        parentId: "server_choice",
        type: "radio",
        checked: trackedServer === "pi",
        contexts: ["browser_action"],
        onclick: function() {
            changeTrackedServer("pi");
        }
    });

    chrome.contextMenus.create({
        title: "Track Radius",
        parentId: "server_choice",
        type: "radio",
        checked: trackedServer === "radius",
        contexts: ["browser_action"],
        onclick: function() {
            changeTrackedServer("radius");
        }
    });

    chrome.contextMenus.create({
        title: "Track Sphere",
        parentId: "server_choice",
        type: "radio",
        checked: trackedServer === "sphere",
        contexts: ["browser_action"],
        onclick: function() {
            changeTrackedServer("sphere");
        }
    });

    (function() {
        // check player count initially
        updatePlayerCount();

        // check again in 60 seconds
        setTimeout(arguments.callee, 60000);
    })();
});
