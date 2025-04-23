var reet = document.getElementById('reet');
var px_tasknumber = Array.from(document.querySelectorAll('.tasknumber'));
var px_plus = document.getElementById('add');
var px_taskmanager = 0;
var px_color = Array.from(document.querySelectorAll('.colormanager'));
const px_colorlist = ["#e0626a","#8ba4fd","#fddd8b","#a3fd8b","#db8bfd"];
const colorList2 = ["#f0004d", "#004cf0", "#f0b800", "#16f000", "#9a00f0"];
var px_layoutcanvas = document.getElementById('px_layout_create');
var px_canvasnumber = Array.from(document.querySelectorAll('.create'));

//create a multidimensional array of px_class
var px_class = [];
for(let i = 0; i < 5; i++){
    var formalVariable = ".input" + i;
    px_class[i] = Array.from(document.querySelectorAll(formalVariable));
}

function changeText(val){
    var element = val.querySelectorAll("[name='copied']");
    var array = [];
    for(let mark of element){
        if(mark.tagName == "INPUT" || mark.tagName == "TEXTAREA"){
            mark = mark.value;
        }else{
            mark = mark.textContent;
        }
        array.push(mark);
    }
    return array.join("\n");
}

//set clipboard the adjusted copy text
document.addEventListener("copy", function(e){
    var copied = window.getSelection().getRangeAt(0).cloneContents();
    copied = changeText(copied);
    e.clipboardData.setData("text/plain", shorteningLine(copied));
    e.preventDefault();
},false);

//adjust the copy text
function shorteningLine(val){
    let result = val;
    result = result.replace(/:\n/g, ": ");
    result = result.replace(/\npx/g, "px");
    result = result.replace(/^/, "\n");
    result = result.replace(/^/g, "\t");
    return result;
}

//processing when the copy button is pressed
var copyArray = document.getElementsByClassName("gg-copy");
for(let i = 0, y = copyArray.length; i < y; i++){
    copyArray[i].addEventListener("click", function(e){
        var relayPoint = document.getElementById("relayPoint");
        if(i === 5){
            relayPoint.value = "https://css.gg/copy";
        }else{
            relayPoint.value = "\n\ttop: " + px_class[i][0].value + "px;\n\tleft: " + px_class[i][1].value + "px;\n\twidth: " + px_class[i][2].value + "px;\n\theight: " + px_class[i][3].value + "px;";
        }
        relayPoint.select();
        try{
            document.execCommand("cut");
            reet.innerText = "copied";
        }catch{
            reet.innerText = "not copied";
        }
        var nowColor = getbackcolor(px_color[i]);
        for(let mark in px_colorlist){
            if(nowColor === px_colorlist[mark]) reet.style.color = colorList2[mark];
        }
    },false);
}

//front, add taskbar
//event to press the plus button
px_plus.addEventListener("click",function(){
    px_taskmanager++;
    moveDownBotton(px_taskmanager);
    insidePx(getid(px_tasknumber[px_taskmanager]));
    for(let i = 0;i < 4;i++){
        px_class[px_taskmanager][i].value = 50 + (25 * px_taskmanager);
    }
});

//move down the plus button
function moveDownBotton(val){
    if(val === 4) outpx(px_plus);
    else px_plus.style.top = 190 + val * 100 + "px";
}

//front, remove taskbar
var px_remove = Array.from(document.querySelectorAll('.task_remove'));
var px_removenumber = 0;
for(let i = 0;i < 5;i++){
    px_remove[i].addEventListener("click",function(){
        px_removenumber = i;
        outpx(getid(px_tasknumber[px_taskmanager]));
        allAdvance(px_removenumber);
        colorReset(px_taskmanager);
        moveUpButton(px_taskmanager);
    });
}

//taskbar advance/initialization
//step1(text/color advance)
function allAdvance(val){
    for(let i = 0;i < 5;i++){
        if(i > val){
            for(let y = 0;y < 4;y++){
                getid(px_class[val][y]).value = getid(px_class[i][y]).value;
            }
            var newcolor = getbackcolor(getid(px_color[i]));
            getid(px_color[val]).style.backgroundColor = newcolor;
            getid(px_tasknumber[val]).style.borderLeftColor = newcolor;
            val++; 
        }
    }
}
//step2(color initialization)
function colorReset(val){
    var i = 5;
    do{
        i--;
        getid(px_color[i]).style.backgroundColor = px_colorlist[i];
        getid(px_tasknumber[i]).style.borderLeftColor = px_colorlist[i];
    }while(i > val);
    px_taskmanager--;
}

//move up the plus button
function moveUpButton(val){
    if(val === -1) px_plus.style.top = 90 + "px";
    else if(val === 3) px_plus.style.left = 670 + "px";
    else px_plus.style.top = 190 + val * 100 + "px";
}

//front, colormenu
var px_colormanager = document.getElementById('color_manager');
var px_colorbox = Array.from(document.querySelectorAll('.colorbox'));
var hard;
var soft;
for(let i = 0;i < 5;i++){
    px_color[i].addEventListener("click",function(){
        px_colormanager.style.top = 147 + 100 * i + "px";
        px_colormanager.style.left = 1167 + "px";
        hard = getid(this);
        soft = getid(px_tasknumber[i]);
        this.addEventListener("mouseleave", function(){
            document.addEventListener("click", deleteEvent, false);
        }, false);
    });

    px_colorbox[i].addEventListener("click",function(){
        hard.style.backgroundColor = px_colorlist[i];
        soft.style.borderLeftColor = px_colorlist[i];
        document.removeEventListener("click", deleteEvent, false);
        outpx(px_colormanager);
    });

    px_colorbox[i].addEventListener("mouseover",function(){
        this.style.color = "#f0006b";
    });
    px_colorbox[i].addEventListener("mouseout",function(){
        this.style.color = "#000000";
    });
}

var deleteEvent = function(e){
    if(e.target.id !== "color_manager"){
        outpx(px_colormanager);
    }
    if(e.target.className === "colormanager"){
        for(let mark in px_color){
            if(px_color[mark].getAttribute("id") === e.target.id){
                px_colormanager.style.top = 147 + 100 * mark + "px";
                px_colormanager.style.left = 1167 + "px";
                hard = getid(px_color[mark]);
                soft = getid(px_tasknumber[mark]);
                break;
            }
        }
    }
}
//front, adjust the value based on the outer frame
function px_quantify(){
    for(let i = 0;i < px_taskmanager + 1;i++){
        getid(px_class[i][0]).value = px_canvasnumber[i].getBoundingClientRect().top -8;
        getid(px_class[i][1]).value = px_canvasnumber[i].getBoundingClientRect().left - 8;
        getid(px_class[i][2]).value = px_canvasnumber[i].getBoundingClientRect().width - 6;
        getid(px_class[i][3]).value = px_canvasnumber[i].getBoundingClientRect().height - 6;
    }
}

//front, display all the front system
function displayFront(){
    let i = 0;
    do{
        insidePx(getid(px_tasknumber[i]));
        i++;
    }while(px_taskmanager >= i)
    px_title.style.left = 10 + "px";
    reet.style.left = 1150 + "px";
    px_aletr.style.left = 100 + "px";
    if(px_taskmanager < 4){
        px_plus.style.left = 670 + "px";
    }
}

//front and back, front and back selector switch
var px_title = document.getElementById('title');
var px_aletr = document.getElementById("alert");
var px_switch = document.getElementById('switch');
var judgment = false;
var locateError = false;
px_switch.addEventListener("click",function(){
    //number referee
    for(let i = 0;i < 5;i++){
        let na = [];
        for(let y = 0;y < 4;y++){
            na[y] = numberChange(getid(px_class[i][y]).value);
        }
        if(locateError) break;
        if(1697 < na[1] + na[2]) locateError = true;
        else if(947 < na[0] + na[3]) locateError = true;
    }
    //whehthre it is an error
    if(locateError){
        locateError = false;
        reet.innerText = "error";
        reet.style.color = "#f0000d";
    }else{
        //change to front or back
        if(judgment){
            //change to the front
            judgment = false;
            //display all the element
            displayFront();
            //front, adjust the value based on the outer frame
            px_quantify();
            outpx(px_layoutcanvas);
            for(let mark of px_canvasnumber){
                mark.style.zIndex = 1000;
            }
            outpx(px_canvas_task);
            //remove class
            for(let mark of px_canvasnumber){
                mark.classList.remove('locked');
                mark.classList.remove('selectBoth');
            }
        }else{
            //change to the back
            judgment = true;
            reet.innerText = "";
            //display shapes
            px_display();
            //bring out all the elements
            for(let mark of px_tasknumber){
                outpx(getid(mark));
            }
            outpx(reet);
            outpx(px_title);
            outpx(px_colormanager);
            outpx(px_plus);
            outpx(px_aletr);
        }
    }
});

//check whether the passed value is an integer, zero, or something else and perform the corresponding processing for each
function numberChange(val){
    if(parseInt(val)) return parseInt(val);
    else if(val == 0) return val = 0;
    else if(locateError === false) locateError = true;
}

//back, display shapes
function px_display(){
    var truevalue = new Array();
    px_layoutcanvas.style.left = 5 + "px";
    for(let i = 0;i < 5;i++){
        for(let y = 0;y < 4;y++){
            truevalue.push(zeroswitch(getid(px_class[i][y]).value));
        }
        getid(px_canvasnumber[i]).style.top = truevalue[0] + "px";
        getid(px_canvasnumber[i]).style.left = truevalue[1] + "px";
        getid(px_canvasnumber[i]).style.width = truevalue[2] + "px";
        getid(px_canvasnumber[i]).style.height = truevalue[3] + "px";
        getid(px_canvasnumber[i]).style.border = "solid";
        getid(px_canvasnumber[i]).style.backgroundColor = getbackcolor(getid(px_color[i]));
        if(px_taskmanager < i){
            outpx(getid(px_canvasnumber[i]));
        }
        truevalue = [];
    }
}

//set to zero if the passed value is blank
function zeroswitch(val){
    if(val === "") return val = 0;
    return val;
}

//back, drag system
px_layout_create();
function px_layout_create(){
    var px_numberplus = 1000;
    var px_intop;
    var px_inleft;
    //drag event1
    for(let i = 0, y = px_canvasnumber.length;i < y;i++){
        px_canvasnumber[i].addEventListener("mousedown",px_layout_development);
    }

    //drag event2
    function px_layout_development(event){
        this.classList.add("newmove");
        var newbox = document.getElementsByClassName('newmove')[0];
        px_numberplus++;
        newbox.style.zIndex = px_numberplus;
        px_intop = event.pageY - this.offsetTop;
        px_inleft = event.pageX - this.offsetLeft;
        document.addEventListener("click", removeMenu, false);
        if(newbox.classList.contains("locked")){
            newbox.classList.remove("newmove");
        }else if(newbox.classList.contains('selectBoth')){
            newbox.classList.remove("newmove");
        }else{
            px_layoutcanvas.addEventListener("mousemove",px_layout_move);
            newbox.addEventListener("mouseup",px_layout_remove);
            document.body.addEventListener("mouseleave",px_layout_remove);
        }
    }

    //drag event3
    function px_layout_move(event){
        var newbox = document.getElementsByClassName('newmove')[0];
        outpx(px_canvas_task);
        document.removeEventListener("click", removeMenu, false);
        //if the value of this px exceeds the value outer frame, it will be interrupted
        //cause of the bug
        newbox.style.top = px_top_judgment(event.pageY - px_intop) + "px";
        newbox.style.left = px_left_judgment(event.pageX - px_inleft) + "px";
        newbox.addEventListener("mouseup",px_layout_remove);
        document.body.addEventListener("mouseleave",px_layout_remove);
    }

    //drag event4
    function px_layout_remove(){
        var newbox = document.getElementsByClassName('newmove')[0];
        px_layoutcanvas.removeEventListener("mousemove",px_layout_move);
        newbox.removeEventListener("mouseup",px_layout_remove);
        document.body.removeEventListener("mouseleave",px_layout_remove);
        newbox.classList.remove("newmove");
    }
}

//control top of designated element
function px_top_judgment(val){
    var true_max = 950 - document.getElementsByClassName("newmove")[0].clientHeight - 3;
    if(-3 > val) return -3;
    else if(val < true_max) return val;
    return true_max;
}

//control left of designated element
function px_left_judgment(val){
    var true_max = 1700 - document.getElementsByClassName("newmove")[0].clientWidth - 3;
    if(-3 > val) return -3;
    else if(val < true_max) return val;
    return true_max;
}

var px_canvas_task = document.getElementById('canvas_task');
var px_lock = document.getElementById('lock');
var px_resize_both = document.getElementById('both');
var errorSignal = false;
//use properly with the drag system
var removeMenu = function(e){
    if(e.target.id !== "canvas_task"){
        outpx(px_canvas_task);
        try{
            let aa = document.getElementsByClassName('mark');
            aa[0].classList.remove("mark");
        }catch{
        }
    }
    if(e.target.className.includes("create")){
        var targetretouch = document.getElementById(e.target.id);
        targetretouch.classList.add("mark");
        errorSignal = false;
        px_canvas_task.style.top = judgmentOfHeight(targetretouch.getBoundingClientRect().top, targetretouch) + "px";
        px_canvas_task.style.left = judgmentOfWidth(targetretouch.getBoundingClientRect().left, targetretouch) + "px";
        desplayjudgment(targetretouch);
    }
}

function judgmentOfHeight(val, element){
    let spare = element.getBoundingClientRect().bottom;
    if(val > 35) return val-= 29;
    if(spare < 932) return spare-= 2;
    errorSignal = true;
    return val;
}

function judgmentOfWidth(val, element){
    let spare = element.getBoundingClientRect().right;
    if(errorSignal){
        if(val > 52) return val-= 47;
        if(spare < 1665) return spare-= 2;
        return val;
    }
    return val;
}

function desplayjudgment(val){
    //judgment of the first button name
    if(val.classList.contains('locked')) px_lock.innerHTML = ("<h6><u>.unlock</u></h6>");
    else px_lock.innerHTML = ("<h6><u>.lock</u></h6>");
    //judgment of the second button name
    if(val.classList.contains('selectBoth')) px_resize_both.innerHTML = ('<h6><u>.each</u></h6>');
    else px_resize_both.innerHTML = ('<h6><u>.both</u></h6>');
}

for(let mark of document.querySelectorAll('.internal')){
    mark.addEventListener("mouseover",function(){
        this.style.color = "#00f0b3";
    });
    mark.addEventListener("mouseout",function(){
        this.style.color = "#000000";
    });
}

//set lock button
px_lock.addEventListener("click",function(){
    var newmovebox = document.getElementsByClassName('mark')[0];
    newmovebox.classList.remove('selectBoth');
    outpx(px_canvas_task);
    newmovebox.classList.remove("mark");
    if(newmovebox.classList.contains('locked')){
        newmovebox.classList.remove('locked');
    }else{
        newmovebox.classList.add('locked');
    }
});

//set resize button
px_resize_both.addEventListener("click",function(){
    var newmovebox = document.getElementsByClassName('mark')[0];
    newmovebox.classList.remove('locked');
    outpx(px_canvas_task);
    newmovebox.classList.remove("mark");
    if(newmovebox.classList.contains('selectBoth')){
        newmovebox.classList.remove('selectBoth');
    }else{
        newmovebox.classList.add('selectBoth');
    }
});

//detail iteration system
//set the left side of the specified key to 250
function insidePx(val){
    val.style.left = 250 +"px";
}

//set the left side of specified element to -6000
function outpx(val){
    val.style.left = -6000 + "px";
}

//return element of specified key
function getid(val){
    return document.getElementById(val.getAttribute("id"));
}

//return backcolor of speified element in Hexadecimal
function getbackcolor(val){
    var backcolor = window.getComputedStyle(val, null).getPropertyValue('background-color');
    return rgbTo16(backcolor);
}


//make RGB Hexadecimal
rgbTo16 = function(col){
    return "#" + col.match(/\d+/g).map(function(a){return ("0" + parseInt(a).toString(16)).slice(-2)}).join("");
}