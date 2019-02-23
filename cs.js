function loadCS() {
  all = ["Java", "JavaScript", "Python", "C++", "C", "HTML", "CSS", "SQL", "R", "JSON", "XML", "React", "JSQuery", "D3", "Swift", "Stata", "Excel","Photoshop", "Sketch", "Figma", "Wix", "Squarespace", "Shopify","Objective-C"]
  links = ["#", "#", "#", "#", "#", "#", "http://web.stanford.edu/class/cs147/projects/Shopping/armoir/", "#", "#", "http://web.stanford.edu/class/cs147/projects/Shopping/armoir/", "XML", "React", "JSQuery", "D3", "http://web.stanford.edu/class/cs147/projects/Shopping/armoir/Armoir.ipa", "Stata", "https://docs.google.com/spreadsheets/d/1UpXuqvndywenO0hgCMl1gsfM-zJkTOf50_h23y_uRbE/edit?usp=sharing","https://rheakaru.github.io/art.html", "https://rheakaru.github.io/art.html", "http://web.stanford.edu/class/cs147/projects/Shopping/armoir/prototype.html", "Wix", "Squarespace", "https://rosebazaar.in/","http://web.stanford.edu/class/cs147/projects/Shopping/armoir/Armoir.ipa"]
  var body = document.getElementById("csBody")
  for(i=0; i< all.length;i++) {
    var div = document.createElement("div")
    div.setAttribute("class", "csBlock")
    var title = document.createElement("h3")
    title.innerHTML = all[i]
    var a = document.createElement("a")
    a.setAttribute("class", "fill-div")
    a.setAttribute("href", "#")
    var span= document.createElement("span")
    span.appendChild(title)
    a.appendChild(span)
    div.appendChild(a)
    body.appendChild(div)
  }
}
