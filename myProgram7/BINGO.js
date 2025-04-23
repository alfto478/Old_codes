//create an array containing all the numbers
var overall = new Array();
for(let i = 0; i < 75; i++){
    overall[i] = i+ 1;
}

//a system to display main numbers
var jm = true;
var count = 0;
const numberName = ["first", "second", "thrid"];
var rjm = false;
var Rswitch = document.getElementById("roulette");
var audio = document.getElementById("ad");
document.getElementById("position").addEventListener("click", function(){
    if(jm){
        if(rjm){
            var rn = RandomNumber(0, (overall.length- 1));
            document.getElementById("number").textContent = overall[rn];
            Result(rn);
            lineResult(overall[rn]);
            overall.splice(rn, 1);
        }else{
            var sn = RandomNumber(1,4);
            var roulette = setInterval(function(){
                audio.play();
                jm = false;
                document.getElementById("number").textContent = RandomNumber(0, (overall.length- 1));
            }, 30);
            count++;
            setTimeout(function(){
                clearInterval(roulette);
                audio.pause();
                audio.currentTime = 0;
                document.getElementById("aj").play();
                var rn = RandomNumber(0, (overall.length- 1));
                document.getElementById("number").textContent = overall[rn];
                Result(rn);
                lineResult(overall[rn]);
                overall.splice(rn, 1);
                jm = true;
            }, sn* 1000);
        }
    }
    if(overall.length <= 0){
        document.getElementById("number").innerText = "end";
        jm = false;
    }
    if(count <= 3) document.getElementById("count").innerText = numberName[count- 1] + " time";
    else document.getElementById("count").innerText = count + "th time";
}, false);

//a system that displays the numbers displayed os far
var keep = new Array();
function Result(val){
    var result = new Array();
    keep.push(overall[val]);
    for(let i = 0, y = keep.length; i < y; i++){
        var mark = "";
        if((i)% 8 === 0 && i !== 0) mark = "\n";
        result.push(mark + keep[i]);
    }
    document.getElementById("secondkeeparea").innerText = result;
}

function lineResult(val){
    var line = document.getElementsByClassName("line");
    for(let i = 0; i < 5; i++){
        if(val <= (15* i)+ 15){
            line[i].textContent = SortingFactory(i);
            break;
        }
    }
}

function SortingFactory(num){
    var Kresult = new Array();
    for(let i = 0, y = keep.length; i < y; i++){
        if(keep[i] > num* 15 && keep[i] <= num* 15+ 15){
            Kresult.push(keep[i]);
        }
    }
    for(let z = 0, v = Kresult.length; z < v; z++){
        for(let i = Kresult.length, y = 0; i > y; i--){
            if(Kresult[z] > Kresult[i] && z < i){
                var f1 = Kresult[z];
                var f2 = Kresult[i];
                Kresult[z] = f2;
                Kresult[i] = f1;
            }
        }
    }
    return Kresult;
}

var sjm = true;
document.getElementById("set").addEventListener("click", function(){
    var hamburger = document.getElementById("hamburger");
    var allwidth = window.innerWidth;
    if(sjm){
        hamburger.style.width = (allwidth- 965) + "px";
        var num = 2213;
        var animation = setInterval(function(){
            hamburger.style.left = -6000 + "px";
            hamburger.style.left = num + "px";
            num-=13;
            if(num === 965) clearInterval(animation);
        }, 4);
        sjm = false;
    }else{
        var num = 965;
        var animation = setInterval(function(){
            hamburger.style.left = num + "px";
            num+=13;
            if(num === 2213){
                clearInterval(animation);
                hamburger.style.left = -6000 + "px";
            }
        }, 4);
        sjm = true;
    }
    document.getElementById("history").style.left = -6000 + "px";
}, false);

document.getElementById("reset").addEventListener("click", function(){
    for(let i = 0; i < 75; i++){
        overall[i] = i+ 1;
    }
    document.getElementById("count").innerText = "zero time";
    document.getElementById("number").innerText = "0";
    document.getElementById("secondkeeparea").innerText = "";
    var line = document.getElementsByClassName("line");
    count = 0;
    Rswitch.innerText = "roulette OFF";
    rjm = false;
    for(let i = 0; i < 5; i++){
        line[i].innerText = "";
    }
    keep = [];
    jm = true;
}, false);

Rswitch.addEventListener("click", function(){
    if(rjm){
        Rswitch.innerText = "roulette OFF";
        rjm = false;
    }else{
        Rswitch.innerText = "roulette ON";
        rjm = true;
    }
}, false);

//a system that retrun random number of specified range
function RandomNumber(min, max){
    return Math.floor(Math.random()* (++max - min)+ min);
}