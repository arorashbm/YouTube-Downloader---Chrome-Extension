s = document.createElement("script");
s.src = chrome.extension.getURL("src/youtubedl.js");

document.body.appendChild(s);
window.addEventListener("message", function(e){
  var extension = e.data.type.split("/")[1].split(";")[0];
  var filename = e.data.name + "." + extension;
  chrome.runtime.sendMessage({name: filename, url: e.data.url}, function(res){
    console.log(res);
  });
});
