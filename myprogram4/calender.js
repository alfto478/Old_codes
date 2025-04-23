// global変数宣言
var day = document.getElementById("day");
var months = document.getElementById("months");
var month = document.getElementsByClassName("month");
var calendar = document.getElementById("calendar");
var memoDay = document.getElementById("memo_day");
var textTitle = document.getElementById("text_title");
var memoMain = document.getElementById("textbox_memo");
var memoButton = document.getElementById("button_ok");
const DayArray = ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"];
var monthSign = 0;
var previousBackColor;
var storage = localStorage;

// 今日を取得
var Days = new Date();
var nowYear = Days.getFullYear();
var nowMonth = Days.getMonth();
var nowDate = Days.getDate();
var nowDay = Days.getDay();

// 変わりのリセット/+MarkⅡ
var yaerNumber = nowYear - storage.getItem("oldYearNumber");
if(yaerNumber === 1){
    var count = 0;
    var oneNumber = 0;
    var twoNumber = 0;
    var conLasDay = new Date(nowYear - 1, 11 + 1, 0);
    var lsatNumber = conLasDay.getDate();
    var scoer1 = lsatNumber - conputFirstDay(0);
    var conFirDate = new Date(nowYear - 1, 11, 1);
    var scoer = 42 - 31 - conFirDate.getDay();
    for(let i = 0; i < 12; i++){
        var conDat = new Date(nowYear - 1, i + 1, 0);
        var lNumber = conDat.getDate();
        for(let y = 0, l = lNumber; y < l; y++){
            count++;
            if(i === 11 && y >= scoer1){
                storage.removeItem(eval("'" + "oNumber_" + oneNumber + "'"));
                storage.removeItem(eval("'" + "oNumberMark2_" + oneNumber + "'"));
                storage.setItem(eval("'" + "oNumber_" + oneNumber + "'"), storage.getItem(eval("'" + "number_" + count + "'")));
                storage.setItem(eval("'" + "oNumberMark2_" + i + "'"), storage.getItem(eval("'" + "numberMark2_" + count + "'")));
                oneNumber++;
            }
            storage.removeItem(eval("'" + "number_" + count + "'"));
            storage.removeItem(eval("'" + "numberMark2_" + count + "'"));
            if(i === 0 && y < scoer){
                storage.setItem(eval("'" + "number_" + count + "'"), storage.getItem(eval("'" + "neNumber_" + twoNumber + "'")));
                storage.setItem(eval("'" + "numberMark2_" + count + "'"), storage.getItem(eval("'" + "neNumberMark2_" + twoNumber + "'")));
                storage.removeItem(eval("'" + "neNumber_" + twoNumber + "'"));
                storage.removeItem(eval("'" + "neNumberMark2_" + twoNumber + "'"));
                twoNumber++;
            }
        }
    }
}else if(yaerNumber > 1){
    storage.clear();
}

// メモ用多次元配列/+MarkⅡ
var memoMark = new Array();
var memoArrayMark2 = new Array();
var count1 = 0;
for(let i = 0; i < 12; i++){
    memoMark[i] = [];
    memoArrayMark2[i] = [];
    for(let y = 0, l = conputLastDay(i); y < l; y++){
        count1++;
        memoMark[i][y] = nullJudgment(storage.getItem(eval("'" + "number_" + count1 + "'")));
        memoArrayMark2[i][y] = nullJudgment(storage.getItem(eval("'" + "numberMark2_" + count1 + "'")));
    }
}

// 去年の12月の配列/+MarkⅡ
var oldYear = new Array();
var oldYearMark2 = new Array();
for(let i = 0, y = conputFirstDay(0); i < y; i++){
    oldYear[i] = nullJudgment(storage.getItem(eval("'" + "oNumber_" + i + "'")));
    oldYearMark2[i] = nullJudgment(storage.getItem(eval("'" + "oNumberMark2_" + i + "'")));
}

// 来年の1月の配列/+MarkⅡ
var newYear = new Array();
var newYearMark2 = new Array();
for(let i = 0, y = 42 - 31 - conputFirstDay(11); i < y; i++){
    newYear[i] = nullJudgment(storage.getItem(eval("'" + "neNumber_" + i + "'")));
    newYearMark2[i] = nullJudgment(storage.getItem(eval("'" + "neNumberMark2_" + i + "'")));
}

// calendarを月に反映するporperty
var ConputCalendar = function(sta, mon){
    this.sta = sta;
    this.mon = mon;
};

ConputCalendar.prototype = {
    getDayList: function(){
        var count = 1;
        var nextCount = 1;
        var previousCount = conputLastDay(this.mon - 1);

        for(let z = this.sta - 1; z > -1; z--){
            calendar.rows[1].cells[z].innerText = previousCount;
            calendar.rows[1].cells[z].classList.remove("bigfont");
            previousCount--;
        }

        do{
            calendar.rows[1].cells[this.sta].innerText = count++;
            this.sta++;
        }while(this.sta < 7);

        for(let i = 2; i < 7; i++){
            for(let y = 0; y < 7; y++){
                if(conputLastDay(this.mon) < count){
                    calendar.rows[i].cells[y].classList.remove("bigfont");
                    calendar.rows[i].cells[y].innerText = nextCount++;
                }else{
                    calendar.rows[i].cells[y].innerText = count++;
                }
            }
        }
    }
};

// その時の日付を取得
var ConputDay = function(mon, x, y){
    this.mon = mon;
    this.x = x;
    this.y = y;
}

ConputDay.prototype = {
    getPosition: function(){
        var scoer = (7 - conputFirstDay(this.mon)) + (this.x - 2) * 7 + (this.y + 1);
        if(scoer <= 0){
            return conputLastDay(this.mon - 1) + scoer;
        }else if(scoer > conputLastDay(this.mon)){
            return scoer - conputLastDay(this.mon);
        }else{
            return scoer;
        }
    },
    getTrueMonth: function(){
        var scoer = (7 - conputFirstDay(this.mon)) + (this.x - 2) * 7 + (this.y + 1);
        if(scoer <= 0){
            if(this.mon === 0) return 11;
            else return this.mon - 1;
        }else if(scoer > conputLastDay(this.mon)){
            if(this.mon === 11) return 0;
            else return this.mon + 1;
        }else{
            return this.mon;
        }
    }
};

// 今日を出力
dayDisPlay();

function dayDisPlay(){
    day.textContent = "今日は" + nowYear + "年" + (nowMonth + 1) + "月" + nowDate + "日" + DayArray[nowDay] + "です";
    month[nowMonth].classList.add("previousMonth");
    var number = Math.ceil((nowDate - (7 - conputFirstDay(nowMonth))) / 7);
    monthSign = nowMonth;
    calendar.rows[number + 1].cells[nowDay].classList.add(monthClass(monthSign));
    memoDay.innerHTML = "<u><h4>" + "今日は" + nowYear + "年" + (nowMonth + 1) + "月" + nowDate + "日" + DayArray[nowDay] + "です" + "</h4></u>";
    textTitle.value = memoMark[nowMonth][--nowDate];
    memoMain.value = memoArrayMark2[nowMonth][nowDate];
    var Cal = new ConputCalendar(conputFirstDay(nowMonth), nowMonth);
    Cal.getDayList();
    setMemoTitle(monthSign);
}

// 月指定システム
for(let i = 0, y = month.length; i < y; i++){
    month[i].addEventListener("click",function(){
        var previousMonth = document.getElementsByClassName("previousMonth")[0];
        previousMonth.classList.remove("previousMonth");
        var specifyDay = document.getElementsByClassName(monthClass(monthSign))[0];
        specifyDay.classList.remove(monthClass(monthSign));
        monthSign = i;
        for(let f = 1; f < 7; f++){
            for(let z = 0; z < 7; z++){
                var nowBox = calendar.rows[f].cells[z];
                nowBox.innerText = "";
                nowBox.classList.remove("mark");
                nowBox.classList.add("bigfont");
            }
        }
        calendar.rows[1].cells[conputFirstDay(i)].classList.add(monthClass(monthSign));
        memoDay.innerHTML = "<u><h4>" + (monthSign + 1) + "月1日" + DayArray[conputFirstDay(i)] + "の予定です" + "</h4></u>";
        textTitle.value = memoMark[monthSign][0];
        memoMain.value = memoArrayMark2[monthSign][0];
        var Cal = new ConputCalendar(conputFirstDay(i), i);
        Cal.getDayList();
        setMemoTitle(monthSign);
        this.classList.add("previousMonth");
    },false);
}

// 日にちを指定
for(let i = 1; i < 7; i++){
    for(let y = 0; y < 7; y++){
        calendar.rows[i].cells[y].addEventListener("click",function(){
            var specifyDay = document.getElementsByClassName(monthClass(monthSign))[0];
            specifyDay.classList.remove(monthClass(monthSign));
            this.classList.add(monthClass(monthSign));
            var condy = new ConputDay(monthSign, i, y);
            if(condy.getTrueMonth() === 11 && monthSign === 0){
                memoDay.innerHTML = "<u><h4>" + (nowYear - 1) + "年" + (condy.getTrueMonth() + 1) + "月" + condy.getPosition() + "日" + DayArray[y] + "の予定です" + "</h4></u>";
                textTitle.value = oldYear[y];
                memoMain.value = oldYearMark2[y];
            }else if(monthSign === 11 && condy.getTrueMonth() === 0){
                memoDay.innerHTML = "<u><h4>" + (nowYear + 1) + "年" + (condy.getTrueMonth() + 1) + "月" + condy.getPosition() + "日" + DayArray[y] + "の予定です" + "</h4></u>";
                textTitle.value = newYear[condy.getPosition() - 1];
                memoMain.value = newYearMark2[condy.getPosition() - 1];
            }else{
                memoDay.innerHTML = "<u><h4>" + (condy.getTrueMonth() + 1) + "月" + condy.getPosition() + "日" + DayArray[y] + "の予定です" + "</h4></u>";
                textTitle.value = memoMark[condy.getTrueMonth()][condy.getPosition() - 1];
                memoMain.value = memoArrayMark2[condy.getTrueMonth()][condy.getPosition() - 1];
            }
        },false);
    }
}

// 多次元配列にタイトル/メモのセット
memoButton.addEventListener("click",function(){
    for(let i = 1; i < 7; i++){
        for(let y = 0; y < 7; y++){
            if(calendar.rows[i].cells[y].classList.contains(monthClass(monthSign))){
                var target = document.getElementsByClassName(monthClass(monthSign))[0];
                target.lastElementChild.remove();
                var condy = new ConputDay(monthSign, i, y);
                if(condy.getTrueMonth() === 11 && monthSign === 0){
                    oldYear[y] = textTitle.value;
                    oldYearMark2[y] = memoMain.value;
                    storage.setItem(eval("'" + "oNumber_" + y + "'"), textTitle.value);
                    storage.setItem(eval("'" + "oNumberMark2_" + y + "'"), memoMain.value);
                    addChildText(target, textTitle.value);
                }else if(monthSign === 11 && condy.getTrueMonth() === 0){
                    newYear[condy.getPosition() - 1] = textTitle.value;
                    newYearMark2[condy.getPosition() - 1] = memoMain.value;
                    storage.setItem(eval("'" + "neNumber_" + (condy.getPosition() - 1) + "'"), textTitle.value);
                    storage.setItem(eval("'" + "neNumberMark2_" + (condy.getPosition() - 1) + "'"), memoMain.value);
                    addChildText(target, textTitle.value);
                }else{
                    memoMark[condy.getTrueMonth()][condy.getPosition() - 1] = textTitle.value;
                    memoArrayMark2[condy.getTrueMonth()][condy.getPosition() - 1] = memoMain.value;
                    storage.setItem(eval("'" + "number_" + (getNumber(condy.getTrueMonth(), condy.getPosition() - 1)) + "'"), textTitle.value);
                    storage.setItem(eval("'" + "numberMark2_" + (getNumber(condy.getTrueMonth(), condy.getPosition() - 1)) + "'"), memoMain.value);
                    addChildText(target, textTitle.value);
                }
            }
        }
    }
},false);

// ページを離れた時にメモタイトル/内容を保存
window.addEventListener("unload",function(){
    var count = 0;
    for(let i = 0; i < 12; i++){
        for(let y = 0, l = conputLastDay(i); y < l; y++){
            count++;
            storage.setItem(eval("'" + "number_" + count + "'"), memoMark[i][y]);
            storage.setItem(eval("'" + "numberMark2_" + count + "'"), memoArrayMark2[i][y]);
        }
    }
    for(let i = 0, y = conputFirstDay(0); i < y; i++){
        storage.setItem(eval("'" + "oNumber_" + i + "'"), oldYear[i]);
        storage.setItem(eval("'" + "oNumberMark2_" + i + "'"), oldYearMark2[i]);
    }
    for(let i = 0, y = 42 - 31 - conputFirstDay(11); i < y; i++){
        storage.setItem(eval("'" + "neNumber_" + i + "'"), newYear[i]);
        storage.setItem(eval("'" + "neNumberMark2_" + i + "'"), newYearMark2[i]);
    }
    storage.setItem("oldYearNumber", nowYear);
},false);

// 指定された月をセット
function monthClass(mon){
    switch(mon){
        case 0:
            return "january";
        case 1:
            return "february";
        case 2:
            return "march";
        case 3:
            return "april";
        case 4:
            return "may";
        case 5:
            return "june";
        case 6:
            return "july";
        case 7:
            return "august";
        case 8:
            return "september";
        case 9:
            return "october";
        case 10:
            return "november";
        case 11:
            return "december";
    }
}

// 指定された月の1日の曜日を計算する
function conputFirstDay(val){
    var ConputDate = new Date(nowYear, val, 1);
    return ConputDate.getDay();
}

// 指定された月の末日を計算する
function conputLastDay(val){
    var ConputDate = new Date(nowYear, val + 1, 0);
    return ConputDate.getDate();
}

// 指定された月のメモタイトルをカレンダーにセット
function setMemoTitle(specifyMonth){
    for(let i = 1; i < 7; i++){
        for(let y = 0; y < 7; y++){
            var condy = new ConputDay(specifyMonth, i, y);
            if(condy.getTrueMonth() === 11 && monthSign === 0){
                addChildText(calendar.rows[i].cells[y], oldYear[y]);
            }else if(monthSign === 11 && condy.getTrueMonth() === 0){
                addChildText(calendar.rows[i].cells[y], newYear[condy.getPosition() - 1]);
            }else{
                addChildText(calendar.rows[i].cells[y], memoMark[condy.getTrueMonth()][condy.getPosition() - 1]);
            }
        }
    }
}

// 指定された要素の子要素に指定された文字を入れる
function addChildText(place, text){
    var newElement = document.createElement("div");
    var newContent = document.createTextNode(text);
    newElement.appendChild(newContent);
    newElement.setAttribute("class", "mark");
    place.appendChild(newElement);
}

// 保存用番号取得
function getNumber(mon, dayDate){
    var count = 0;
    for(let i = 0, x = mon; i < x; i++){
        for(let y = 0, l = dayDate; y < l; y++){
            count++;
        }
    }
    return count;
}

// null判定
function nullJudgment(val){
    if(val == null){
        return "";
    }else{
        return val
    }
}