console.log('script loaded??');


content = document.querySelectorAll(".filters button");
var myFunction = function(){
var url = 'https://api.spaceXdata.com/v3/launches?limit=100'
//alert(this.parentElement.className);

if(this.parentElement.className === 'successful-landing'){
  url += '&launch_success=true&land_success='+this.innerText.toLowerCase();
  window.history.pushState("", "", './successful-land='+this.innerText.toLowerCase());
}
else if(this.parentElement.className === 'launch-year'){
  url += '&land_success=true&launch_success=true&launch_year='+this.innerText;
  //window.history.pushState("", "", './launch-year='+this.innerText.toLowerCase());
}
else {
  url += '&launch_success='+this.innerText.toLowerCase();
  window.history.pushState("", "", './launch_success='+this.innerText.toLowerCase());
}

url = './json.json';
  ajax_get(url, function(data) {

//alert(url)

       var out = "";
   var i;
   for(i = 0; i < data.length; i++) {


       out += "<div class='col-sm-12 col-md-6 col-lg-4 product-tile'>";
       out += "<div class='display-product'>";
       out += "<img src='"+data[i].links.mission_patch+"' alt='"+data[i].details+"' loading='lazy'><br />";
       out += "<ul><li><strong>"+data[i].mission_name +" #"+data[i].flight_number+"</strong></li>";

       out += "<li><strong>Mission IDs: </strong>";

       if(data[i].mission_id.length === 0)
       out += "No ID Found";
       // else {
       //   foreach (data[i].mission_id as &$value) {
       //       echo $value;
       //   }
       // }

       out += "</li>";
       out += "<li><strong>Launch Year: </strong>"+data[i].launch_year+"</li>";
       out += "<li><strong>Successfull Launch: </strong>";
       if(data[i].launch_success==1)
       out += "true";
       else
       out += "false";
       out += "</li></ul>";


       out += "</div>\n</div>";

   }
   //alert(out)
   document.getElementsByClassName("product-group")[0].innerHTML = out;
      // document.getElementsByTagName("h1").innerHTML = JSON.parse(data);
      // var html = "<h2>" + data["title"] + "</h2>";
      // html += "<h3>" + data["description"] + "</h3>";
      // html += "<ul>";
      //    for (var i=0; i < data["articles"].length; i++) {
      //        html += '<li><a href="' + data["articles"][i]["url"] + '">' + data["articles"][i]["title"] + "</a></li>";
      //    }
      // html += "</ul>";
      // document.getElementById("text").innerHTML = html;
  });
}

for (var iIndex = 0; iIndex < content.length; iIndex++){

    content[iIndex].addEventListener("click", myFunction);

};

function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log('responseText:' + xmlhttp.responseText);
            try {
                var data = JSON.parse(xmlhttp.responseText);
            } catch(err) {
                console.log(err.message + " in " + xmlhttp.responseText);
                return;
            }
            callback(data);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
