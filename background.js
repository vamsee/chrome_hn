function checkForValidUrl(tabId, changeInfo, tab) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://api.thriftdb.com/api.hnsearch.com/items/_search?q="+tab.url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var resp = JSON.parse(xhr.responseText);
                if (resp.hits > 0) {
                    var num_comments = resp.results[0].item.num_comments;
                    var points = resp.results[0].item.points;
                    var itemId = resp.results[0].item.id;
                    
                    localStorage.setItem(tabId+'_num_comments', num_comments);
                    localStorage.setItem(tabId+'_points', points);
                    localStorage.setItem(tabId+'_item_id', itemId);
                    chrome.browserAction.setIcon({path:"icon-19-on.png", tabId: tabId});
                    chrome.browserAction.setBadgeText({text: points+"", tabId: tabId});
                }
            }
        }
    }
    xhr.send(null);
};


function cleanupStorage(tabId, removeInfo) {
    localStorage.removeItem(tabId+'_num_comments');
    localStorage.removeItem(tabId+'_points');
    localStorage.removeItem(tabId+'_item_id');
}

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
chrome.tabs.onRemoved.addListener(cleanupStorage);