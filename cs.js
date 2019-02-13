function loadCS() {
  all = ["Java", "JavaScript", "Python", "C++", "C", "HTML", "CSS", "SQL", "R", "JSON", "XML", "React", "JSQuery", "D3", "Swift", "Objective-C", "Stata", "Excel","Photoshop", "Sketch", "Figma", "Wix", "Squarespace", "Shopify"]
  var body = document.getElementById("csBody")
  for(i=0; i< all.length;i++) {
    var div = document.createElement("div")
    div.setAttribute("class", "csBlock")
    var title = document.createElement("h3")
    title.innerHTML = all[i]
    div.appendChild(title)
    body.appendChild(div)

  }
}
