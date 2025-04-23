//global
var img = document.getElementById("png");
var dScore = document.getElementById("score");
var level;
var mynumberx;
var mynumbery;
var horizontal;
var vertical;
var score = 300;
var Ccount = 0;
var colorPosition = new Array();
const colorList = [
    ["#000000","#ffffff","#ff0000","#ff9900","#ffff00","#99ff00","#00ff00","#00ff99","#00ffff","#0088ff","#9a1c19","#9a5d19","#9a9619","#6c9a19","#199a19","#9a1965","#12e2af","#575757","#606060","#bfbfbf"],
    ["#0000ff","#7700ff","#cc00ff","#ff00ff","#ff0077","#b9b9b9","#626262","#00ffcc","#ff00cc","#0077ff","#199a5f","#199a77","#199a93","#19739a","#19279a","#aa5557","#aa8955","#a9aa55","#5caa55","#55aa8c"],
    ["#e79798","#e7b897","#e7e397","#cce797","#a6e797","#97e7b9","#97e7e7","#97c5e7","#979be7","#b797e7","#e797e6","#e797c7","#4a199a","#75199a","#9a1998","#55a5aa","#555faa","#8f55aa","#a755aa","#aa5590"],
    ["#e03c38","#e09538","#e0ce38","#8ee038","#3fe038","#38e09f","#38dfe0","#388ae0","#384ee0","#8e38e0","#e038d7","#e0388d","#e24012","#e2ad12","#b9e212","#12e26b","#128ae2","#5312e2","#c512e2","#e212a6"]
];


//step0
//draw game screen
var used = new Array();
const levelColor = ["#000000", "#3bdd22", "#ddd222", "#dd2258"];
document.getElementById("resultScreen").style.opacity = 0;


//system to change level
document.getElementById("decision").addEventListener("click", function(){
    var list = document.getElementById("list");
    var num = list.selectedIndex;
    document.getElementById("selectLevel").style.color = levelColor[num];
    level = list[num].value;
    odd = 0;
    existing = [];
    var resultCanvas = document.getElementById("resultScreen");
    resultCanvas.style.opacity = 0;
    resultCanvas.style.zIndex = "1000";
    Ccount = 0;
    setValueD();
    dScore.textContent = score;
    rewrite();
    createPosition();
    drawCard();
    createjmpa();
    document.getElementById("mainScreen").addEventListener("click", turnOver, false);
}, false);

//set the value for the system to draw
function setValueD(){
    switch(level){
        case "":
            mynumberx = 0;
            mynumbery = 0;
            score = 300;
        break;
        case "easy":
            mynumberx = 4;
            mynumbery = 10;
            vertical = calculateEdge(4, true);
            horizontal = calculateEdge(10, false);
            score = 200;
        break;
        case "normal":
            mynumberx = 6;
            mynumbery = 15;
            vertical = calculateEdge(6, true);
            horizontal = calculateEdge(15, false);
            score = 450;
        break;
        case "hard":
            mynumberx = 8;
            mynumbery = 20;
            vertical = calculateEdge(8, true);
            horizontal = calculateEdge(20, false);
            score = 600;
        break;
    }
}

//calculate the length of the side
function calculateEdge(num, jm){
    if(jm){
        return (475- 15)/ num- 5;
    }
    return (900- 15)/ num- 5;
}

//rewrite teh colorList to one line
function rewrite(){
    var count = 0;
    for(let i = 0, v = mynumberx/ 2; i < v; i++){
        for(let y = 0, z = mynumbery; y < z; y++){
            used[count] = colorList[i][y];
            count++;
        }
    }
}

//create an array for the position
function createPosition(){
    colorPosition = [];
    for(let i = 0; i < mynumberx; i++){
        colorPosition[i] = [];
        for(let y = 0; y < mynumbery; y++){
            colorPosition[i][y] = appropriateNum();
        }
    }
}

//return random
function appropriateNum(){
    var it;
    var num;
    var count;
    do{
        count = 0;
        num = randomNum(used.length, 0);
        it = used[num];
        for(let i in colorPosition){
            for(let mark of colorPosition[i]){
                if(mark === it) count++;
            }
        }
    }while(count >= 2);
    if(count === 1) used.splice(num, 1);
    return it;
}

//draw card
function drawCard(){
    var canvas = document.getElementById("mainScreen");
    var ct = canvas.getContext("2d");
    ct.clearRect(0, 0, 900, 475);
    ct.strokeStyle = "#000000";
    ct.lineWidth = "3";
    for(let i = 0; i < mynumberx; i++){
        for(let y = 0; y < mynumbery; y++){
            //draw
            ct.drawImage(img, y* (horizontal+ 5)+ 10, i* (vertical+ 5)+ 10, horizontal, vertical);
            ct.strokeRect(y* (horizontal+ 5)+ 10, i* (vertical+ 5)+ 10, horizontal, vertical);
        }
    }
}

//return a random number in specified range
function randomNum(max, min){
    return Math.floor(Math.random()* (max++ - min))+ min;
}

//step1
//turnover
var jmPosition = [
    [],
    [],
    [],
    []
];

//create an array for step1
function createjmpa(){
    for(let i = 0, y = mynumbery; i < y; i++){
        //top
        jmPosition[0][i] = i* (vertical+ 5)+ 10;
        //left
        jmPosition[1][i] = i* (horizontal+ 5)+ 10;
        //right
        jmPosition[2][i] = i* (horizontal+ 5)+ 10+ horizontal;
        //bottom
        jmPosition[3][i] = i* (vertical+ 5)+ 10+ vertical;
    }
}

//turnover
var odd = 0;
var existing = [];
var turnOver = function(e){
    for(let i = 0, y = mynumbery; i < y; i++){
        if(jmPosition[1][i] <= e.offsetX && jmPosition[2][i] >= e.offsetX) var column = i;
        if(jmPosition[0][i] <= e.offsetY && jmPosition[3][i] >= e.offsetY) var row = i;
    }

    if(column !== undefined && row !== undefined){
        if((existing[0] === row && existing[1] === column) === false){
            if(colorPosition[row][column] !== null){
                drawFlippedCard(row, column, true);
                odd++;
                existing.push(row, column);
                dScore.textContent = minScore(--score);
                if(score > 0) secondTime();
            }
        }
    }

    //step2
    //turn it over twice and put it back
    function secondTime(){
        if(odd !== 0 && odd% 2 === 0){
            var time = 2000;
            var authenticity = false;
            document.getElementById("mainScreen").removeEventListener("click", turnOver, false);
            if(colorPosition[existing[0]][existing[1]] === colorPosition[existing[2]][existing[3]]){
                time = 500;
                Ccount++;
                authenticity = true;
                score+= 5;
                if(Ccount === mynumbery* mynumberx/ 2) resultScreen(score);
            }
            setTimeout(function(){
                if(authenticity) setNull();
                for(let i = 0; i < 2; i++){
                    drawFlippedCard(existing[0], existing[1], false);
                    existing.splice(0, 2);
                }
                dScore.textContent = score;
                document.getElementById("mainScreen").addEventListener("click", turnOver, false);
            }, time);
        }
    }
}

//system for drawing flipped cards
function drawFlippedCard(x, y, jm){
    var canvas = document.getElementById("mainScreen");
    var ct = canvas.getContext("2d");
    ct.lineWidth = 3;
    ct.strokeStyle = "#000000";
    if(colorPosition[x][y] !== null){
        if(jm){
            ct.fillStyle = colorPosition[x][y];
            ct.fillRect(y* (horizontal+ 5)+ 10, x* (vertical+ 5)+ 10, horizontal, vertical);
        }else ct.drawImage(img, y* (horizontal+ 5)+ 10, x* (vertical+ 5)+ 10, horizontal, vertical);
        ct.strokeRect(y* (horizontal+ 5)+ 10, x* (vertical+ 5)+ 10, horizontal, vertical);
    }
}

//step3
//calculate score
function setNull(){
    var canvas = document.getElementById("mainScreen");
    var ct = canvas.getContext("2d");
    var v = 0;
    var h = 1;
    for(let i = 0; i < 2; i++){
        colorPosition[existing[v]][existing[h]] = null;
        ct.clearRect(existing[h]* (horizontal+ 5)+ 10- 2, existing[v]* (vertical+ 5)+ 10- 2, horizontal+ 4, vertical+ 4);
        v+= 2;
        h+= 2;
    }
}

//calculateScore
function minScore(val){
    if(val === 0){
        document.getElementById("mainScreen").removeEventListener("click", turnOver, false);
        for(let i = 0; i < mynumberx; i++){
            for(let y = 0; y < mynumbery; y++){
                drawFlippedCard(i, y, true);
            }
        }
        resultScreen(val);
    }
    return val;
}

//step4
//create gameover and clear screen
function resultScreen(val){
    var resultCanvas = document.getElementById("resultScreen");
    resultCanvas.style.opacity = 30;
    resultCanvas.style.zIndex = "1002";
    var rc = resultCanvas.getContext("2d");
    rc.clearRect(0, 0, 900, 475);
    rc.fillStyle = "#000000";
    rc.globalAlpha = 0.7;
    var width = 0;
    var animation = setInterval(function(){
        if(width === 900){
            clearInterval(animation);
            darwText();
        }else{
            width+= 10;
            rc.clearRect(0, 200, 900, 75);
            rc.fillRect(0, 200, width, 75);
        }
    }, 5.55);
    function darwText(){
        var text;
        var top;
        var left;
        switch(val){
            case 0:
                text = "GAME OVER";
                top = 255;
                left = 300;
                score-= 100;
            break;
            default:
                text = "GAME CLEAR";
                top = 255;
                left = 285;
            break;
        }
        rc.font = "48px serif";
        rc.fillStyle = "#ffffff";
        rc.globalAlpha = 1;
        rc.fillText(text, left, top);
        rc.font = "20px serif";
        text = "score: " + score + "\nnumber of color collected: " + Ccount + "";
        var atext = text.split("\n");
        for(let i = 0, y = atext.length; i < y; i++){
            rc.fillText(atext[i], 640, 235+ (i* 20));
        }
    }
}