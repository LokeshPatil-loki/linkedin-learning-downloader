chrome.tabs.onUpdated.addListener((tabId,changeInfo,tab) => {
    if(tab.url && tab.url.includes("https://www.linkedin.com/learning/")){
        let urlSplit = tab.url.split("https://www.linkedin.com/learning/")[1].split("/");
        chrome.tabs.sendMessage(tabId,{
            "type": "NEW",
            "course": urlSplit[0],
            "video": urlSplit[1],
        })
    }else{
        console.log("Wrong");
    }
})