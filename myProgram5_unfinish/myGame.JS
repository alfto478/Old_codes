//game block coda
var nowPosition = [];
//easylevel
var easyPosition = [
    ["n00", "n00", "n00", "n31", "n31", "sb00"],
    ["n01", "n00", "n30", "sb12", "f66", "f66"],
    ["n01", "n01", "n01", "n01", "n00", "n00"],
    ["n31", "n30", "sb12", "f66", "f66", "f66"],
    ["n01", "n01", "n31", "n30", "n30", "f66"],
    ["n01", "n01", "n01", "n00", "n31", "f66"]
];
//normallevel
var normalPosition = [
    ["n01", "n01", "n31", "n30", "n30", "n30", "sb00"],
    ["n01", "n01", "n00", "n00", "n31", "sb12", "f66"],
    ["n01", "n01", "n00", "n31", "n31", "n31", "n30"],
    ["n00", "sb12", "sbt6", "f66", "f66", "f66", "f66"],
    ["n01", "n00", "n00", "n31", "n31", "n30", "n30"],
    ["n01", "n01", "n00", "n00", "n31", "sbrt", "f66"],
    ["n01", "n00", "n00", "n30", "n30", "f66", "f66"]
];
//hardlevel
var hardPosition = [
    ["n00", "n00", "n31", "n31", "n31", "n31", "n30", "n30"],
    ["n31", "n31", "n30", "n30", "n30", "sb12", "f66", "f00"],
    ["n31", "n30", "n30", "n30", "sbrt", "f66", "f66", "f00"],
    ["ff00", "ff00", "fn00", "ff66", "ff66", "fn00", "ff00", "ff00"],
    ["n01", "n31", "n31", "n30", "n30", "n30", "n30", "sb12"],
    ["n01", "n01", "ff00", "n31", "n31", "ff00", "n31", "f66"],
    ["n01", "n00", "n00", "n31", "n31", "n31", "n30", "sbt6"],
    ["n01", "n01", "n00", "n00", "n31", "n30", "n30", "n30"]
];

//set the game difficulty
//litial setting
var levelNumber = document.getElementsByClassName("judgmentLevel");
var level = 1;
var count = 0;
const colorList = ["#3bdd22", "#ddd222", "#dd2258"];
const code = /f[f|s|n]/;
levelNumber[level].style.color = colorList[level];
//////////////change the variable (edge, overall)
var mynumber, reference, overall, edge;
changeValue(level);
var standard = new Array();
judgmentArray();
startSignal();
drawscreen();
underBar();
var animation;

//change level of difficulty by clicking
for(let i = 0, y = levelNumber.length; i < y; i++){
    levelNumber[i].addEventListener("click",function(){
        clearInterval(animation);
        var start = document.getElementById("subScreen");
        levelNumber[level].style.color = "#000000";
        level = i;
        count++;
        levelNumber[level].style.color = colorList[level];
        ////////////下のいる？
        start.style.opacity = 50;
        changeValue(level);
        judgmentArray();
        startSignal();
        drawscreen();
        document.removeEventListener("keydown", moveBar, false);
        underBar();
    },false);
}

function changeValue(val){
    //set the value at each level
    switch(val){
        case 0:
            //easylevel
            mynumber = 6;
            reference = easyPosition;
            overall = 70;
            edge = 65;
        break;
        case 1:
            //normallevel
            mynumber = 7;
            reference = normalPosition;
            overall = 60;
            edge = 55;
        break;
        case 2:
            //hardlevel
            mynumber = 8;
            reference = hardPosition;
            overall = 52.5;
            edge = 47.5;
        break;
    }
}

//signal of the game start
//////////why don't create the system only to draw
function startSignal(){
    var start = document.getElementById("subScreen");
    var sct = start.getContext("2d");
    var turn = true;
    var alpha = 1;
    var stopJudgment = count;
    const text = "start to push space";
    sct.clearRect(0, 0, 483, 783);
    sct.globalAlpha = alpha;
    sct.fillStyle = "#2c2c2c";
    sct.fillRect(0, 366.5, 483, 50);
    var gifAnimation = setInterval(function(){
        if(stopJudgment !== count){
            clearInterval(gifAnimation);
        }
        if(turn === true) alpha += 0.1;
        else alpha += -0.1;
        sct.clearRect(147, 376.5, 150, 30);
        sct.globalAlpha = alpha;
        sct.fillStyle = "#adadad";
        sct.strokeStyle = "#000000";
        sct.lineWidth = 2;
        sct.fillRect(147, 376.5, 150, 30);
        sct.strokeRect(147, 376.5, 150, 30);
        sct.font = "14px serif";
        sct.fillStyle = "#040404";
        sct.fillText(text, 165, 395);
        if(alpha <= 0.2) turn = true;
        else if(alpha >= 1.4) turn = false;
    }, 100);

    //system to start the game
    //////change the way of writing
    document.addEventListener("keydown", function gameStart(e){
        if(e.code === "Space"){
            if(stopJudgment === count){
                var start = document.getElementById("subScreen");
                count++;
                start.style.opacity = 0;
                document.addEventListener("keydown", moveBar, false);
                ballSystem();
            }
        }
    }, false);
}

//remove Code f
function removeCode(val){
    if(code.test(val)){
        val = val.replace(/f/, "");
    }
    return val;
}

//system to set block information
function blockSorting(val){
    //return the corresponding color for each
    //remove code f of value
    switch(removeCode(val)){
        case "n01":
            return "#fc751d";
        case "n00":
            return "#654fe8";
        case "n31":
            return "#fc291d";
        case "n30":
            return "#281c9c";
        case "sb00":
            return "#37008a";
        case "sb12":
            return "#99f4f4";
        case "sbt6":
            return "#510af0";
        case "sbrt":
            return "#f42a2e";
        case "f66":
            return "#666666";
        case "f00":
            return "#2b2b2b";
        case "f88":
            return "#9dcb64";
        case "f44":
            return "#000000";
    }
}

//enter up to the specified number of random number in array
function randomArray(val, element){
    var order = new Array();
    var caution = new Array();
    for(let mark in element){
        if(code.test(element[mark])) caution.push(mark);
    }
    var nowLength = 0;
    do{
        var number = Math.floor(Math.random()* val);
        var judgment = true;
        for(let mark in order){
            if(order[mark] === number){
                judgment = false;
                break;
            }
        }
        for(let mark of caution){
            if(mark == number){
                judgment = false;
                break;
            }
        }
        if(code.test(element[nowLength])){
            number = nowLength;
            judgment = true;
        }
        if(judgment === true){
            nowLength++;
            order.push(number);
        }
    }while(order.length !== val);
    return order;
}

//stystem to draw game screen
function drawscreen(){
    var canvas = document.getElementById("mainContent");
    var ct = canvas.getContext("2d");
    //clearSystem
    ct.clearRect(0, 0, 438, 738);
    ct.strokeStyle = "#000000";
    ct.lineWidth = 3;
    //drawing
    for(let i = 0; i < mynumber; i++){
        var rv = randomArray(mynumber, reference[i]);
        nowPosition[i] = [];
        for(let y of rv){
            ct.fillStyle = blockSorting(reference[i][rv[y]]);
            ct.fillRect(y* overall+ 10, i* overall+ 10, edge, edge);
            ct.strokeRect(y* overall+ 10, i* overall+ 10, edge, edge);
            nowPosition[i][y] = removeCode(reference[i][rv[y]]);
        }
    }
}

//draw and operating system of bar
var moveBar;
function underBar(){
    var canvas = document.getElementById("mainContent");
    var bct = canvas.getContext("2d");
    var y, v;
    switch(level){
        case 0:
            //leveleasy
            y = 172;
            v = 100;
        break;
        case 1:
            //levelnormal 
            y = 177;
            v = 90;
        break;
        case 2:
            //levelhard
            y = 182;
            v = 80;
        break;
    }
    //clear system
    bct.clearRect(0, 648, 438, 24);
    //draw bar
    bct.fillStyle = "#3d3d3d";
    bct.strokeStyle = "#000000";
    bct.lineWidth = 3;
    bct.fillRect(y, 650, v, 20);
    bct.strokeRect(y, 650, v, 20);

    //opreation system of bar
    moveBar = function(e){
        //clear system
        //bct.fillStyle = "#3d3d3d";
        var distance = v/ 2;
        //move at right
        if(e.key === "ArrowRight"){
            bct.clearRect(y- 2, 648, v+ 4, 24);
            y+= distance;
            if(y > 412) y-= distance;
            simplification();
        }
        //move at left
        if(e.key === "ArrowLeft"){
            bct.clearRect(y- 2, 648, v+ 4, 24);
            y-= distance;
            if(y < -49) y+= distance;
            simplification();
        }
    }

    //draw
    function simplification(){
        bct.fillRect(y, 650, v, 20);
        bct.strokeRect(y, 650, v, 20);
    }
}

//system to operating the ball
var positionNumber = new Array();

//adjust speed
function ballSystem(){
    var speed = 1;
    positionNumber = [500, 16];
    var radius;
    var angle = randomNumber(0, 55);
    switch(level){
        case 0:
            radius = 16;
        break;
        case 1:
            radius = 14;
        break;
        case 2:
        case 3:
            radius = 11;
        break;
    }
    var endCount = 738+ radius* 2;
    ////////up to speed gradually
    animation = setInterval(function(){
        //change the angle
        angle = bounceWall(positionNumber[0], positionNumber[1], radius, angle);
        //collision detection of block
        if(Math.floor(positionNumber[0]) <= 425 + radius) angle = collisionDetection(positionNumber[0], positionNumber[1], radius, angle);
        //draw ball
        ball(positionNumber[0], positionNumber[1], radius, angle, speed);
        //judgment to stop
        if(positionNumber[0] > endCount) clearInterval(animation);
        speed+= 0.0000000001;
    }, 1);
    // 1 -> speed
}

//system to decide the angle
function bounceWall(x, y, radius, angle){
    if(x <= radius || x >= 738- radius) return changeAngle(angle, 0);
    if(y <= radius || y >= 437- radius) return changeAngle(angle, 1);
    return angle;
}

//calculate horizontal or vertical angle
function changeAngle(val, num){
    var rn = randomNumber(10, 0);
    if(rn === 4){
        if(val < 180) return val+ 180;
        return val- 180;
    }
    //horizontal
    if(num === 0){
        if(val >= 180) return 360- val+ 180;
        return 180- val;
    }
    //vertical
    return 360- val;
}

//a system that creates an array for judgment

////////////to make the standerd array double row
function judgmentArray(){
    for(let i = 0; i < mynumber* 2; i++){
        standard[i] = i* overall+ 10;
        if(i >= mynumber){
            standard[i] = (i- mynumber)* overall+ edge+ 10;
        }
    }
}

//bound the block
function collisionDetection(x, y, radius, angle){
    const jm = [(90 <= angle && 270 >= angle), (180 <= angle && 360 >= angle)];
    const xy = [Math.floor(x), Math.floor(y)];
    const marks = [1, -1];
    for(let i = 0; i < 2; i++){
        //judgment hit point
        if(jm[i]){
            //bottom
            //right
            var interval = mynumber;
            var point = -radius;
        }else{
            //top
            //left
            var interval = 0;
            var point = radius;
        }
        //alert(jm +":"+ angle);
        for(let v = 0; v < standard.length/ 2; v++){
            if(xy[i]+ point === standard[v+ interval]){
                for(let z = 0; z < standard.length/ 2; z++){
                    if(standard[z] <= xy[i+ marks[i]] && standard[z+ mynumber] >= xy[i+ marks[i]]){
                        var horizontal = (i === 0 ? v: z);
                        var vertical = (i === 0 ? z: v);
                        angle = breakBlock(vertical, horizontal, angle, i, jm);
                    }
                }
            }
        }
    }

    //break the block
    function breakBlock(vertical, horizontal, angle, num){
        if(nowPosition[horizontal][vertical] !== null){
            var canvas = document.getElementById("mainContent");
            var ct = canvas.getContext("2d");
            ct.clearRect(vertical* overall+ 10- 2, horizontal* overall+ 10- 2, edge+ 4, edge+ 4);
            nowPosition[horizontal][vertical] = null;
            return changeAngle(angle, num);
        }
        return angle;
    }
    return angle;
}

//system to drawing the ball
function ball(x, y, radius, angle, speed){
    var canvas = document.getElementById("mainContent");
    var cct = canvas.getContext("2d");
    //clear sysytem
    cct.globalCompositeOperation = "destination-out";
    for(let i = 0; i < 2; i++){
        if(i === 1){
            //draw the ball
            cct.globalCompositeOperation = "source-over";
            x+= calculate(speed, angle, true);
            y+= calculate(speed, angle, false);
            radius--;
        }
        cct.beginPath();
        cct.fillStyle = "#262626";
        cct.arc(y, x, radius, 0, Math.PI* 2, false);
        cct.fill();
    }
    positionNumber = [x, y];
}

//system to calculate top and left of ball
function calculate(radius, angle, jm){
    if(jm)return radius* Math.cos((angle/ 180)* Math.PI);
    return radius* Math.sin((angle/ 180)* Math.PI);
}

//system to return random number of specified range
function randomNumber(max, min){
    return Math.floor(Math.random()* (max++ - min))+ min;
}