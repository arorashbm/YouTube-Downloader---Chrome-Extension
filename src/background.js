chrome.runtime.onMessage.addListener(function(request, sender, callback){
  console.log(request.url, request.name.replace("|", ""), request.name);
  chrome.downloads.download({url: request.url, filename: request.name.replace(/[|?]/g, "")});
});
