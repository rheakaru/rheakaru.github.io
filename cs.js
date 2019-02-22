function loadCS() {
  all = ["Java", "JavaScript", "Python", "C++", "C", "HTML", "CSS", "SQL", "R", "JSON", "XML", "React", "JSQuery", "D3", "Swift", "Stata", "Excel","Photoshop", "Sketch", "Figma", "Wix", "Squarespace", "Shopify","Objective-C"]
  var body = document.getElementById("csBody")
  for(i=0; i< all.length;i++) {
    var div = document.createElement("div")
    div.setAttribute("class", "csBlock")
    var title = document.createElement("h3")
    title.innerHTML = all[i]
    var a = document.createElement("a")
    a.setAttribute("class", "fill-div")
    a.setAttribute("href", "rheakaru.github.io")
    div.appendChild(a)
    div.appendChild(title)
    body.appendChild(div)
  }
}
