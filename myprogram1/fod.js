nothas = document.getElementById('close');
nothas.style.color = "#ff0000";
var hav = document.getElementById("vud");
var has = document.getElementById('open');
var nothas = document.getElementById('close');
var swi = document.getElementById('swith');
var ao = document.querySelectorAll('.naka1');
var bu = document.querySelectorAll('.naka2');
let dd = 0;
passive();
document.getElementById('swith').addEventListener("click",function(){
    ao.forEach(function(ay){
        ay.addEventListener("mouseover",main);
    });
    bu.forEach(function(bf){
        bf.addEventListener("mouseover",mainn);
    });
    if(hav.classList.contains("judgment")){
        ao.forEach(function(ay){
            ay.removeEventListener("mouseover",main);
        });
        bu.forEach(function(bf){
            bf.removeEventListener("mouseover",mainn);
        });
    }else{
    }
});

swi.addEventListener("click",function(){
    if(hav.classList.contains("judgment")){
        hav.classList.remove("judgment");
        nothas.style.color = "#ff0000";
        has.style.color = "#000000";
        bund();
    }else{
        hav.classList.add("judgment");
        has.style.color = "#ff0000";
        nothas.style.color = "#000000";
        bund();
    }
});

f = document.getElementById("vud");

function bund(){
    var poi = document.querySelectorAll('.naka1');
    var poll = document.querySelectorAll('.naka2');
    for(let i = 0;i < poi.length;i++){
        var sew = document.getElementById(poi[i].getAttribute("id"));
        sew.style.color = "#000000";
        var dre = document.getElementById(poll[i].getAttribute("id"));
        dre.style.color = "#000000";
    }
}

function passive(){
    for(let i = 0;i < ao.length;i++){
        ao[i].addEventListener("click",function(){
            bund();
            dd = i;
            var au = document.getElementById(ao[dd].getAttribute("id"));
            au.style.color = "#ff0000";
            var bn = document.getElementById(bu[dd].getAttribute("id"));
            bn.style.color = "#ff0000";
        },false);
    }
    for(let i = 0;i < ao.length;i++){
        bu[i].addEventListener("click",function(){
            bund();
            dd = i;
            var au = document.getElementById(ao[dd].getAttribute("id"));
            au.style.color = "#ff0000";
            var bn = document.getElementById(bu[dd].getAttribute("id"));
            bn.style.color = "#ff0000";
        },false);
    }
}

var main = function(){
    bund();
    var gg = 0;
    for(let i = 0;i < ao.length;i++){
        ao[i].addEventListener("mouseover",function(){
            gg = i;
            gh = document.getElementById(ao[gg].getAttribute("id"));
            gt = document.getElementById(bu[gg].getAttribute("id"));
        });
    }
    gh.style.color = "#ff0000";
    gt.style.color = "#ff0000";
}

var mainn = function(){
    bund();
    var gg = 0;
    for(let i = 0;i < bu.length;i++){
        bu[i].addEventListener("mouseover",function(){
            gg = i;
            gh = document.getElementById(ao[gg].getAttribute("id"));
            gt = document.getElementById(bu[gg].getAttribute("id"));    
        });
    }
    gh.style.color = "#ff0000";
    gt.style.color = "#ff0000";
}