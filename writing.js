function loadWriting() {
  types = ["Journalism", "Blogging", "Media about Me"]
  all = [journ = [{"title": "Stanford Daily: All", "link": "https://www.stanforddaily.com/?s=rhea+karuturi", "image": "daily.png"},
  {"title": "Bay City Beacon: Uber and Lyft", "link": "https://www.thebaycitybeacon.com/politics/background-checks-for-uber-and-lyft/article_8112ec2c-3be3-11e7-8e32-d3a18f6232ca.html", "image": "uber.png" },
  {"title": "Bay City Beacon: Internet in Juvenile Prisons", "link": "https://www.thebaycitybeacon.com/politics/ab---granting-the-right-to-internet-in-juvenile/article_09e90126-3bee-11e7-81e0-2b4920c85858.html", "image": "juvi.png"},
{"title": "Deccan Herald", "link":"https://www.deccanherald.com/content/426276/artists-go-multisensorial-media-works.html" , "image": "artShow.png"}
], blog = [{"title":"A Year in Being Indian", "link":"https://www.theodysseyonline.com/year-being-indian","image": "indian.png"},
{"title":"Being Seen", "link":"https://www.theodysseyonline.com/seeing-and-being-seen","image": "seen.png" },
{"title":"On Rodin", "link":"https://www.theodysseyonline.com/year-being-indian","image":"rodin.png" }
], media = [{"title": "GSB Research", "link": "https://globalpoverty.stanford.edu/news/stanford-students-find-challenges-and-rewards-while-doing-field-research-center-faculty" , "image": "gsb.png"},
  {"title": "Writing Award", "link": "https://undergrad.stanford.edu/programs/introsems/teach/introsem-excellence-award/excellence-award-winners" , "image": "intro_excellence.png"},
  {"title": "The Million Page Project", "link": "https://www.deccanherald.com/content/476410/need-heard.html", "image": "tmpp.png"},
  {"title": "Kilimanjaro", "link": "https://bangaloremirror.indiatimes.com/opinion/sunday-read/on-top-of-the-world/articleshow/53890829.cms", "image": "killi.png"},
  {"title": "India Article", "link": "https://www.facebook.com/stanford.global/posts/there-is-a-dichotomy-that-seems-sacred-between-the-individual-and-the-political-/1057096874334124/", "image": "verma.png"}]
]
  //academic = ["Selected", "Senior", "Junior", "Sophomore", "Freshman" ]


  var body = document.getElementById("writingBody")
  for(i=0; i< types.length;i++) {
    var div= document.createElement("div")
    div.setAttribute("class", "writingGrid")
    div.setAttribute("id",types[i])
    var div2= document.createElement("div")
    var header = document.createElement("h3")
    header.innerHTML = types[i]
    div2.setAttribute("class", "row")
    div2.appendChild(header)

    div.appendChild(div2)
    //body.appendChild(div)
  }
  var big = document.createElement("div")
  big.setAttribute("style", "padding:1vw;")


  for(i=0; i< types.length;i++) {
    var div= document.getElementById(types[i])
    set = all[i]
    for(j=0; j< set.length;j++) {
      temp = set[j]
      var sub = document.createElement("div")
      sub.setAttribute("style", "padding:1vw;")
      var title = document.createElement("a")
      title.innerHTML = temp["title"]
      title.setAttribute("href", temp["link"])
      var img =document.createElement("img")
      img.setAttribute("src", temp["image"])
      img.setAttribute("style", "width: 5%;")

      var a = document.createElement("a")
      a.setAttribute("href", temp["link"])
      a.setAttribute("style", "margin-right:0.5vw;")

      a.appendChild(img)
      sub.appendChild(a)
      sub.appendChild(title)
      big.appendChild(sub)
    }
  body.appendChild(big)
  }

}
