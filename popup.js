window.onload = function() {
    chrome.tabs.getSelected(null, function(tab) {
        var num_comments = localStorage.getItem(tab.id+'_num_comments');
        var points = localStorage.getItem(tab.id+'_points');
        var item_id = localStorage.getItem(tab.id+'_item_id');
        
        var pts = document.createElement("p");
        pts.innerHTML = "Points: "+points;
        document.body.appendChild(pts);

        var commentNumber = document.createElement("p");
        commentNumber.innerHTML = "Number of comments: "+num_comments;
        document.body.appendChild(commentNumber);

        var itemId = document.createElement("a");
        itemId.href = 'http://news.ycombinator.com/item?id='+item_id;
        itemId.innerHTML = "Discussion";
        itemId.target = "_blank";
        document.body.appendChild(itemId);
    });
}
