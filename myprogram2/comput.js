var calculation_text = document.getElementById('text');
var calculation_clear = document.getElementById('clear');
var calculation_decision = document.getElementById('decision');
var calculation_dot = document.getElementById('bd');
var calculation_button1 = document.getElementById('b1');
var calculation_button2 = document.getElementById('b2');
var calculation_button3 = document.getElementById('b3');
var calculation_button4 = document.getElementById('b4');
var calculation_button5 = document.getElementById('b5');
var calculation_button6 = document.getElementById('b6');
var calculation_button7 = document.getElementById('b7');
var calculation_button8 = document.getElementById('b8');
var calculation_button9 = document.getElementById('b9');
var calculation_button0 = document.getElementById('b0');
var calculation_buttonplue = document.getElementById('bp');
var calculation_buttonminus = document.getElementById('bm');
var calculation_buttoncall = document.getElementById('bk');
var calculation_buttondivide = document.getElementById('bw');
var calculation_buttonbrackets = document.getElementById('bc');
var calculation_buttonback = document.getElementById('bb');
var calculation_result = document.getElementById('result');
var calculation_array = new Array();
var calculation_score = 0;
calculation_buttonsummarize();
var timer_m = document.getElementById('m1');
var timer_mm = document.getElementById('m10');
var timer_mmm = document.getElementById('m100');
var timer_start  = document.getElementById('start2');
var timer_stop = document.getElementById('stop2');
var timer_clear = document.getElementById('clear2');
var timer_title = document.getElementById('settime1');
var timer_title2 = document.getElementById('settime2');
var timer_title3 = document.getElementById('settime3');
var timer_judgment = false;
var timer_x1 = document.getElementById('x1');
var timer_x2 = document.getElementById('x2');
var timer_x3 = document.getElementById('x3');
var timer_x4 = document.getElementById('x4');
var timer_x5 = document.getElementById('x5');
var timer_y1 = 2;
var timer_y2 = 1;
var timer_y3 = 0;
var timer_y4 = 59;
var timer_y5 = 58;
var timer_z1 = document.getElementById('z1');
var timer_z2 = document.getElementById('z2');
var timer_z3 = document.getElementById('z3');
var timer_z4 = document.getElementById('z4');
var timer_z5 = document.getElementById('z5');
var timer_a1 = 2;
var timer_a2 = 1;
var timer_a3 = 0;
var timer_a4 = 59;
var timer_a5 = 58;
var timer_v1 = document.getElementById('v1');
var timer_v2 = document.getElementById('v2');
var timer_v3 = document.getElementById('v3');
var timer_v4 = document.getElementById('v4');
var timer_v5 = document.getElementById('v5');
var timer_n1 = 2;
var timer_n2 = 1;
var timer_n3 = 0;
var timer_n4 = 59;
var timer_n5 = 58;
var count4 = 00;
var count5 = 00;
var count6 = 00;
var stopwath_zt = document.getElementById('t01');
var stopwath_t = document.getElementById('t1');
var stopwath_tz = document.getElementById('t10');
var stopwath_start = document.getElementById('start3');
var stopwath_clear = document.getElementById('clear3');
var stopwath_stop = document.getElementById('stop3');
var count1 = 00;
var count2 = 00;
var count3 = 00;
var watch_t = document.getElementById('w1');
var watch_tz = document.getElementById('w10');
var watch_tzz = document.getElementById('w100');
load_time();

function calculation_buttonsummarize(){
    calculation_clear.addEventListener("click",function(){
        calculation_text.innerHTML = "";
        if(calculation_buttonbrackets.classList.contains('judgment')){
            calculation_buttonbrackets.classList.remove('judgment');
        }
        calculation_array = [];
    });
    calculation_dot.addEventListener("click",function(){
        calculation(".");
    });
    calculation_button1.addEventListener("click",function(){
        calculation("1");
    });
    calculation_button2.addEventListener("click",function(){
        calculation("2");
    });
    calculation_button3.addEventListener("click",function(){
        calculation("3");
    });
    calculation_button4.addEventListener("click",function(){
        calculation("4");
    });
    calculation_button5.addEventListener("click",function(){
        calculation("5");
    });
    calculation_button6.addEventListener("click",function(){
        calculation("6");
    });
    calculation_button7.addEventListener("click",function(){
        calculation("7");
    });
    calculation_button8.addEventListener("click",function(){
        calculation("8");
    });
    calculation_button9.addEventListener("click",function(){
        calculation("9");
    });
    calculation_button0.addEventListener("click",function(){
        calculation("0");
    });
    calculation_buttonplue.addEventListener("click",function(){
        calculation("+");
    });
    calculation_buttonminus.addEventListener("click",function(){
        calculation("-");
    });
    calculation_buttoncall.addEventListener("click",function(){
        calculation("×");
    });
    calculation_buttondivide.addEventListener("click",function(){
        calculation("÷");
    });
    calculation_buttonbrackets.addEventListener("click",function(){
        if(calculation_buttonbrackets.classList.contains('judgment')){
            calculation_buttonbrackets.classList.remove('judgment');
            calculation(")");
        }else{
            calculation_buttonbrackets.classList.add("judgment");
            calculation("(");
        }
    });
    calculation_buttonback.addEventListener("click",function(){
        if(calculation_array[calculation_array.length - 1] === "("){
            calculation_buttonbrackets.classList.remove('judgment');
        }
        if(calculation_array[calculation_array.length - 1] === ")"){
            calculation_buttonbrackets.classList.add('judgment');
        }
        calculation_array.length = calculation_array.length - 1;
        calculation_jointarray = calculation_array.join('');
        calculation_text.innerHTML = calculation_jointarray;
    });
    calculation_decision.addEventListener("click",function(){
        if(calculation_buttonbrackets.classList.contains('judgment')){
            calculation_buttonbrackets.classList.remove('judgment');
        }
        calculation_jointarray = calculation_array.join('');
        var calculation_tabjudgment = document.getElementById('tabjudgment')
        var calculation_newline = document.createElement('div');
        calculation_newline.textContent = calculation_jointarray;
        calculation_tabjudgment.after(calculation_newline);
        for(i = 0; i < calculation_array.length; i++){
            if(calculation_array[i] === "×"){
                calculation_score = i;
                calculation_array[calculation_score] = "*";
            }
            if(calculation_array[i] === "÷"){
                calculation_score = i;
                calculation_array[calculation_score] = "/";
            }
        }
        var calculation_jointarray2 = calculation_array.join('');
        var calculation_conputresult = conputscore(calculation_jointarray2);
        calculation_newline2 = document.createElement('div');
        calculation_newline2.textContent = calculation_conputresult;
        if(calculation_conputresult === "error"){
            calculation_newline2.style.color = "#0000ff";
        }else{
            calculation_newline2.style.color = "#ff0000";
        }
        calculation_tabjudgment.after(calculation_newline2);
    });
}

timer_m.addEventListener("mouseover",function(){
    timer_title3.style.left = 690 + "px";
    if(timer_judgment === true){
        timer_title3.style.left = -7000 + "px";
    }
    document.addEventListener("keydown",function(event){
        if(event.keyCode === 13){
            count4 = timer_n3;
            timer_m.innerHTML = global_2line(count4);
            timer_title3.style.left = -7000 + "px";
        }
    });
});

timer_title3.onmousewheel = function(event){
    if(event.wheelDelta > 0){
        timer_n1++;
        if(timer_n1 === 60){
            timer_n1 = 0;
        }
        timer_n2++;
        if(timer_n2 === 60){
            timer_n2 = 0;
        }
        timer_n3++;
        if(timer_n3 === 60){
            timer_n3 = 0;
        }
        timer_n4++;
        if(timer_n4 === 60){
            timer_n4 = 0;
        }
        timer_n5++;
        if(timer_n5 === 60){
            timer_n5 = 0;
        }
        timer_v1.innerHTML = global_2line(timer_n1);
        timer_v2.innerHTML = global_2line(timer_n2);
        timer_v3.innerHTML = global_2line(timer_n3);
        timer_v4.innerHTML = global_2line(timer_n4);
        timer_v5.innerHTML = global_2line(timer_n5);
    }else{
        timer_n1--;
        if(timer_n1 < 0){
            timer_n1 = 59;
        }
        timer_n2--;
        if(timer_n2 < 0){
            timer_n2 = 59;
        }
        timer_n3--;
        if(timer_n3 < 0){
            timer_n3 = 59;
        }
        timer_n4--;
        if(timer_n4 < 0){
            timer_n4 = 59;
        }
        timer_n5--;
        if(timer_n5 < 0){
            timer_n5 = 59;
        }
        timer_v1.innerHTML = global_2line(timer_n1);
        timer_v2.innerHTML = global_2line(timer_n2);
        timer_v3.innerHTML = global_2line(timer_n3);
        timer_v4.innerHTML = global_2line(timer_n4);
        timer_v5.innerHTML = global_2line(timer_n5);
    }
}

timer_mm.addEventListener("mouseover",function(){
    timer_title2.style.left = 630 + "px";
    if(timer_judgment === true){
        timer_title2.style.left = -6000 + "px";
    }
    document.addEventListener("keydown",function(event){
        if(event.keyCode === 13){
            count5 = timer_a3;
            timer_mm.innerHTML = global_2line(count5);
            timer_title2.style.left = -6000 + "px";
        }
    });
});

timer_title2.onmousewheel = function(event){
    if(event.wheelDelta > 0){
        timer_a1++;
        if(timer_a1 === 60){
            timer_a1 = 0;
        }
        timer_a2++;
        if(timer_a2 === 60){
            timer_a2 = 0;
        }
        timer_a3++;
        if(timer_a3 === 60){
            timer_a3 = 0;
        }
        timer_a4++;
        if(timer_a4 === 60){
            timer_a4 = 0;
        }
        timer_a5++;
        if(timer_a5 === 60){
            timer_a5 = 0;
        }
        timer_z1.innerHTML = global_2line(timer_a1);
        timer_z2.innerHTML = global_2line(timer_a2);
        timer_z3.innerHTML = global_2line(timer_a3);
        timer_z4.innerHTML = global_2line(timer_a4);
        timer_z5.innerHTML = global_2line(timer_a5);
    }else{
        timer_a1--;
        if(timer_a1 < 0){
            timer_a1 = 59;
        }
        timer_a2--;
        if(timer_a2 < 0){
            timer_a2 = 59;
        }
        timer_a3--;
        if(timer_a3 < 0){
            timer_a3 = 59;
        }
        timer_a4--;
        if(timer_a4 < 0){
            timer_a4 = 59;
        }
        timer_a5--;
        if(timer_a5 < 0){
            timer_a5 = 59;
        }
        timer_z1.innerHTML = global_2line(timer_a1);
        timer_z2.innerHTML = global_2line(timer_a2);
        timer_z3.innerHTML = global_2line(timer_a3);
        timer_z4.innerHTML = global_2line(timer_a4);
        timer_z5.innerHTML = global_2line(timer_a5);
    }
}

timer_mmm.addEventListener("mouseover",function(){
    timer_title.style.left = 570 + "px";
    if(timer_judgment === true){
        timer_title.style.left = -5000 + "px";
    }
    document.addEventListener("keydown",function(event){
        if(event.keyCode === 13){
            count6 = timer_y3;
            timer_mmm.innerHTML = global_2line(count6);
            timer_title.style.left = -5000 + "px";
        }
    });
});

timer_title.onmousewheel = function(event){
    if(event.wheelDelta > 0){
        timer_y1++;
        if(timer_y1 === 60){
            timer_y1 = 0;
        }
        timer_y2++;
        if(timer_y2 === 60){
            timer_y2 = 0;
        }
        timer_y3++;
        if(timer_y3 === 60){
            timer_y3 = 0;
        }
        timer_y4++;
        if(timer_y4 === 60){
            timer_y4 = 0;
        }
        timer_y5++;
        if(timer_y5 === 60){
            timer_y5 = 0;
        }
        timer_x1.innerHTML = global_2line(timer_y1);
        timer_x2.innerHTML = global_2line(timer_y2);
        timer_x3.innerHTML = global_2line(timer_y3);
        timer_x4.innerHTML = global_2line(timer_y4);
        timer_x5.innerHTML = global_2line(timer_y5);
    }else{
        timer_y1--;
        if(timer_y1 < 0){
            timer_y1 = 59;
        }
        timer_y2--;
        if(timer_y2 < 0){
            timer_y2 = 59;
        }
        timer_y3--;
        if(timer_y3 < 0){
            timer_y3 = 59;
        }
        timer_y4--;
        if(timer_y4 < 0){
            timer_y4 = 59;
        }
        timer_y5--;
        if(timer_y5 < 0){
            timer_y5 = 59;
        }
        timer_x1.innerHTML = global_2line(timer_y1);
        timer_x2.innerHTML = global_2line(timer_y2);
        timer_x3.innerHTML = global_2line(timer_y3);
        timer_x4.innerHTML = global_2line(timer_y4);
        timer_x5.innerHTML = global_2line(timer_y5);
    }
}

timer_start.addEventListener("click",function(){
    timer_m.innerHTML = global_2line(count4);
    timer_mm.innerHTML = global_2line(count5);
    timer_mmm.innerHTML = global_2line(count6);
    timer_judgment = true;
    var timer_time = setInterval(function(){
        timer_system();
        timer_stop.addEventListener("click",function(){
            timer_judgment = false;
            clearInterval(timer_time);
        });
        timer_clear.addEventListener("click",function(){
            timer_judgment = false;
            clearInterval(timer_time);
        });
    },1000);
});

timer_clear.addEventListener("click",function(){
    count4 = 0;
    count5 = 0;
    count6 = 0;
    timer_title3.style.left = -7000 + "px";
    timer_title2.style.left = -6000 + "px";
    timer_title.style.left = -5000 + "px";
    timer_m.innerHTML = global_2line(count4);
    timer_mm.innerHTML = global_2line(count5);
    timer_mmm.innerHTML = global_2line(count6);
});

var timer_system = function(){

    if(count5 === 0){
        if(count6 != 0){
            count5 = 60;
            count6 = count6 - 1;
        }
    }

    if(count4 === 0){
        if(count5 != 0){
            count4 = 60;
            count5 = count5 - 1;
        }
    }

    count4 = count4 - 1;

    if(count6 === 0){
        if(count5 === 0){
            if(count4 === 0){
                clearInterval(timer_time);
            }
        }
    }

    timer_m.innerHTML = global_2line(count4);
    timer_mm.innerHTML = global_2line(count5);
    timer_mmm.innerHTML = global_2line(count6);
}

stopwath_start.addEventListener("click",function(){
    var stopwath_time = setInterval(function(){
        stopwath_internal();
        stopwath_stop.addEventListener("click",function(){
            clearInterval(stopwath_time);
        });
        stopwath_clear.addEventListener("click",function(){
            clearInterval(stopwath_time);
        });
    },10);
});

stopwath_clear.addEventListener("click",function(){
    count1 = 0;
    count2 = 0;
    count3 = 0;
    stopwath_zt.innerHTML = '00';
    stopwath_t.innerHTML = '00';
    stopwath_tz.innerHTML = '00';
});

function calculation(val){
    calculation_array.push(val);
    calculation_jointarray = calculation_array.join('');
    if(calculation_jointarray.length > 21){
    }else{
        calculation_text.innerHTML = calculation_jointarray;
    }
}

var stopwath_internal = function(){
    count1++;
    if(count1 > 99){
        count1 = 00;
        count2++;
    }

    if(count2 > 59){
        count2 = 00;
        count3++;
    }

    stopwath_zt.innerHTML = global_2line(count1);
    stopwath_t.innerHTML = global_2line(count2);
    stopwath_tz.innerHTML = global_2line(count3);
}

var watch_time = function(){
    var watch_Date = new Date();
    var watch_nowseconds = watch_Date.getSeconds();
    var watch_nowMinutes = watch_Date.getMinutes();
    var watch_nowHours = watch_Date.getHours();

    watch_t.innerHTML = global_2line(watch_nowseconds);
    watch_tz.innerHTML = global_2line(watch_nowMinutes);
    watch_tzz.innerHTML = global_2line(watch_nowHours);
}

setInterval(function(){
    watch_time();
},1000);

function load_time(){
    var watch_Date = new Date();
    var watch_nowseconds = watch_Date.getSeconds();
    var watch_nowMinutes = watch_Date.getMinutes();
    var watch_nowHours = watch_Date.getHours();

    watch_t.innerHTML = global_2line(watch_nowseconds);
    watch_tz.innerHTML = global_2line(watch_nowMinutes);
    watch_tzz.innerHTML = global_2line(watch_nowHours);
}

function conputjudgment(element){
    if(isNaN(element)){
    }else{
        return parseInt(element.value);
    }
}

function conputscore(element){
    calculation_array = [];
    try{
        return Function('"use strict";return ('+element+')')();
    }catch{
        return element = "error";
    }
}

function global_2line(count){
    var invisible_count;
    if(count <10){
        invisible_count = "0" + count;
    }else{
        invisible_count = count;
    }
    return invisible_count;
}