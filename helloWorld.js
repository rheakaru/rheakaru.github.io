
function helloWorld() {
  //read in information from file
  //get number of sections
  //for each section:
    //get info
    //add to screen with appropriate
  document.write("<img src=\"art/art-1.png\" class=\"artImg\"> Hello VBScript!</img> ");
  var numTimes = 10;
  while (numTimes > 0) {
    document.write("<p>hello world</p>");
    numTimes --;
  }
}

function header() {
  var div = document.getElementById("test")
  div.innerHTML = <header><div><a href=\"index.html\"><img border=\"0\" src=\"header.png\" align=\"middle\"></a></div><nav align=\"middle\"><ul><li> <a class= \"navText\" href=\"index.html\">Home</a> </li><li> <a class= \"navText\" href=\"act.html\">Activities</a> </li><li> <a class= \"navText\" href=\"cs.html\">Computer Science</a></li><li> <a class= \"navText\" href=\"writing.html\">Writing</a></li><li> <a class= \"navText\" href=\"art.html\">Design</a></li></ul></nav></header>";
  var head = document.createElement("HEADER");                       // Create a <p> node
  var div = document.createElement("DIV");      // Create a text node
  head.appendChild(div);

  //var para = document.createElement("P");                       // Create a <p> node
//  var t = document.createTextNode("This is a paragraph.");      // Create a text node
//  para.appendChild(t);
  //div.appendChild(para)
  document.body.prepend(head);                                // Append the text to <p>
  //document.getElementById("test").appendChild(para);           // Append <p> to <div> with id="myDIV"
    //"<header><div><a href=\"index.html\"><img border=\"0\" src=\"header.png\" align=\"middle\"></a></div><nav align=\"middle\"><ul><li> <a class= \"navText\" href=\"index.html\">Home</a> </li><li> <a class= \"navText\" href=\"act.html\">Activities</a> </li><li> <a class= \"navText\" href=\"cs.html\">Computer Science</a></li><li> <a class= \"navText\" href=\"writing.html\">Writing</a></li><li> <a class= \"navText\" href=\"art.html\">Design</a></li></ul></nav></header>")
}
