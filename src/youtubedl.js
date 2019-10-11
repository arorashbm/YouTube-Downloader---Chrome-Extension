window.onload = function(){

  var videoDetails = ytplayer.config.args.player_response;
  var videoDetailsParse = JSON.parse(videoDetails);
  var videoDetailsCut = videoDetailsParse["streamingData"]["adaptiveFormats"];
  
  function clickDownload(){
    var dropdown = document.getElementById("download-dropdown");
    var ul = dropdown.children;
    var li = ul[0].children;
    for(i=0;i<li.length;i++) {
      if(li[i].style.display == "")
        li[i].style.display = "block";
      else if(li[i].style.display == "block")
        li[i].style.display = "";
    }
  }

  function getNameUrl(e){
    var url = e.currentTarget.getAttribute("href");
    var name = document.getElementsByTagName("title")[0].innerText;
    var datatype = e.currentTarget.getAttribute("data-type");
    var data = {url: url, name: name, sender: "YTDL", type: datatype};
    window.postMessage(data, "*");
  }

  var btn = document.createElement("ytd-button-renderer");
  btn.className = "style-scope ytd-menu-renderer force-icon-button style-text";
  btn.setAttribute("role", "button");
  btn.id = "download-button";
  btn.innerText = "Download";

  var anchor = document.createElement("a");
  anchor.id = "anchor"
  anchor.setAttribute("tab-index", "-1");
  anchor.className = "yt-simple-endpoint style-scope ytd-button-renderer";

  var btn_icon = document.createElement("yt-icon-button");
  btn_icon.className = "style-scope ytd-button-renderer style-default size-default";
  btn_icon.id = "button"

  var string = document.createElement("p");
  string.id = "text";
  string.innerHTML = "Download";
  //alert("asdfasd");
  var place = document.getElementById("top-level-buttons");
  place.appendChild(btn);

  var btn1 = document.getElementById("download-button");
  btn1.appendChild(anchor);

  var anchor1 = document.getElementById("anchor");
  anchor1.appendChild(string);

  var dropdown = document.createElement("div");
  dropdown.id = "download-dropdown";
  dropdown.className = "not-shown";
  document.body.appendChild(dropdown);
  var droplist = document.createElement("ul");
  dropdown.appendChild(droplist);
  var j=0; // for no links condition
  for(i=0;i<videoDetailsCut.length;i++){
    var item = document.createElement("a");
    if (videoDetailsCut[i]['url'] == null){
      j++;
      continue;
    }
    item.setAttribute("href", videoDetailsCut[i]['url']);
    item.setAttribute("target", "_blank");
    item.setAttribute("data-type", videoDetailsCut[i]['mimeType']);
    if(videoDetailsCut[i]['qualityLabel'])
      item.innerText = videoDetailsCut[i]['qualityLabel'] + " " + videoDetailsCut[i]['mimeType'];
    else
      item.innerText = videoDetailsCut[i]['mimeType'];
    item.addEventListener("click", getNameUrl);
    droplist.appendChild(item);
  }
  if (i==j)
    btn.onclick=function(){
      alert("Couldn't generate links for this video!!");
    };
  else
    btn.addEventListener("click", clickDownload);
}
