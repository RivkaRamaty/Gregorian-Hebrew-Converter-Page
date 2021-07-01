function buildHttp() {
    var gy = document.getElementById("gy").value;
    var gm = document.getElementById("gm").value;
    var gd = document.getElementById("gd").value;
    var gs = document.getElementById("gs").checked;
    var httpbuilder = []
    httpbuilder.push("https://www.hebcal.com/converter?cfg=json&gy=");
    httpbuilder.push(gy);
    httpbuilder.push("&gm=");
    httpbuilder.push(gm);
    httpbuilder.push("&gd=");
    httpbuilder.push(gd);
    httpbuilder.push("&g2h=1");
    if (gs == true) {
        httpbuilder.push("&gs=on");
    }
    return httpbuilder;
}

function convertonclick() {
    var gy = document.getElementById("gy").value;
    var gm = document.getElementById("gm").value;
    var gd = document.getElementById("gd").value;
    var gs = document.getElementById("gs").checked;
    if (gy == "" || gd == "") {
        document.getElementById('resText').textContent = "";
        alert("Please fill all the fields and try again");
        return;
    }
    var httpbuilder = buildHttp();
    var httpreq = httpbuilder.join("");
    // get http request
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", httpreq, false); // false for synchronous request
    xmlHttp.send(null);
    var res = xmlHttp.responseText;
    // if user typed invalid date, http status will not be 200(ok)
    if (xmlHttp.status != 200) {
        document.getElementById('resText').textContent = "";
        alert("Invalid date. Please try again");
    }
    document.getElementById('resText').textContent = JSON.parse(res).hebrew;
}

var dt = new Date();
var day = document.getElementById("gd");
day.value = dt.getDate();
var month = document.getElementById("gm");
month.options[dt.getMonth()].defaultSelected = true;
var year = document.getElementById("gy");
year.value = dt.getFullYear();