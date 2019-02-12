function loadArt() {
  types = ["drawings/","graphicDs/", "posters/","gifs/"]
  var area = document.getElementById("designItems")
  var str = "art/"
  num = [9,10,11,7]
  type = [".png",".png",".png", ".gif"]
  for (i = 0; i < types.length; i++) {
    var div = document.createElement("div")
    div.setAttribute("class", "artGrid")
    var row = document.createElement("div")
    row.setAttribute("class", "row")
    var col = document.createElement("div")
    col.setAttribute("class", "column")
    var col2 = document.createElement("div")
    col2.setAttribute("class", "column")

    numItems = num[i]
    for (j=1; j<numItems+1; j++) {
      var img = document.createElement("img")
      img.setAttribute("class", "artImg")
      img.setAttribute("onclick", "showImage('" + str+types[i]+j+type[i]+ "')")
      img.setAttribute("src", str+types[i]+j+type[i])
      if (j < (numItems/2)) {
        col.appendChild(img)
      } else {
        col2.appendChild(img)
      }
    }


    row.appendChild(col)
    row.appendChild(col2)
    div.appendChild(row)
    area.appendChild(div)
  }
}

function goBack() {
  window.history.back();
}

function showImage(imgName) {
  //document.write("<h1> Hello world</h1>")
  document.write("<html><head><title> Rhea Karuturi Art Detail Page.</title><link rel='stylesheet' href='style.css'></script><script src='art.js'></script></head> <body ><button onclick='goBack()'> Back </button><div class= 'row' id='designItems'> <img class = 'artImg' src= '" + imgName + "'> </img></div> </body></html>")
}
