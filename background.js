chrome.runtime.onMessage.addListener(async (request) => {
    console.log(request.action);
    // { action: "add", condition: "xxxx", agent: "xxxx"}
    // { action: "update", id: xxxx, condition: "xxxx", agent: "xxxx"} add this feature later
    // { action: "remove", id: [xxxx,xxxx]}
    if (request.action == "add") {
        const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
        const maxId = existingRules.length > 0
            ? Math.max(...existingRules.map(rule => rule.id))
            : 0;
        const newRules = [
            {
                "id": maxId + 1,
                "priority": 1,
                "action": {
                    "type": "modifyHeaders",
                    "requestHeaders": [
                        {
                            "header": "user-agent",
                            "operation": "set",
                            "value": request.agent
                        }
                    ]
                },
                "condition": {
                    "urlFilter": request.condition,
                    "resourceTypes": ["main_frame", "sub_frame", "stylesheet", "script", "image", "font", "object", "xmlhttprequest", "ping", "csp_report", "media", "websocket", "webtransport", "webbundle", "other"]
                }
            }
        ]
        await browser.declarativeNetRequest.updateDynamicRules({
            addRules: newRules
        });
    } else if (request.action == "remove") {
        await browser.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: request.id
        });
    } else {
        console.error(`Undefined action: ${JSON.stringify(request)}`)
    }
});
