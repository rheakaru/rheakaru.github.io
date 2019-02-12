window.onload = function header() {
  var div = document.getElementById("headerImage")
  var a = document.createElement("a");
  a.setAttribute("href", "index.html");
  var hImg = document.createElement("img");
  hImg.setAttribute("border", 0);
  hImg.setAttribute("src", "header.png");
  hImg.setAttribute("align", "align");
  a.appendChild(hImg)
  div.appendChild(a)

  text = ["Home", "Computer Science", "Writing","Design"] //"Activities",
  links = ["index.html",  "cs.html", "writing.html", "art.html"] //"act.html",
  var ul = document.createElement("ul");
  for (i = 0; i < text.length;i++) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.setAttribute("class","navText")
    a.setAttribute("href",links[i])
    a.innerHTML = text[i]
    li.appendChild(a)
    ul.appendChild(li)
  }
  var nav = document.getElementById("nav")
  nav.appendChild(ul)
}

function showMessage() {
  var elem = document.getElementById("toWrite");
  elem.innerHTML = 'Please do not press me';
}
