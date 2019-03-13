
var imgID = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12'];
var imgX = [0, 80, 160, 240, 320, 400, 0, 80, 160, 240, 320, 400, 0, 80, 160, 240, 320, 400, 0, 80, 160, 240, 320, 400];
var imgY = [0, 0, 0, 0, 0, 0, 80, 80, 80, 80, 80, 80, 160, 160, 160, 160, 160, 160, 240, 240, 240, 240, 240, 240];
var posS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
var imgON = [];
var imgOFF = [];

for (var i = 0; i < 24; i++) {
    imgOFF.push (0);
}


function startGame() {

    shuffle();

    for (var i = 0; i < 24; i++) {
        imgON.push(imgID[posS[i]]);
    }

    draw();

    var numbClick = 0;
    var oneClick = 24;
    var twoClick = 24;
    var matchFound = 0;
    var matchTotal = 0;

// add event listener, onclick turn card over

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
    canvas.addEventListener
    canvas.onclick = function() {

//start of function;

        numbClick ++;

        var x = (event.pageX) - 100;
        var y = (event.pageY) - 100;

        x = Math.floor (x / 80);
        y = Math.floor (y / 80);

        var posXY = y * 6 + x;

// check if position is vacant

        if (((imgOFF[posXY]) == 0) && ((posXY) != oneClick) && ((posXY) != twoClick)) {

// position is vacant
// check if 1st or 2nd click

            if ((Math.floor (numbClick / 2)) != (numbClick / 2)) {

// this is 1st click
// reset markers and turn over previous two cards

                if (matchFound == 1) {
                    matchFound = 0;
                    imgOFF[oneClick] = 1;
                    imgOFF[twoClick] = 1;
                }



// turn on card in location of 1st click and turn previous cards off if required
                oneClick = posXY;
                twoClick = 24;
                imgOFF[posXY] = 2;
                draw();
            }
            else {

// this is 2nd click
// turn on card in location of 2nd click

                twoClick = posXY;
                imgOFF[posXY] = 2;
                draw();

//check for a match

                if ((imgON[oneClick]) == (imgON[twoClick])) {

// match found

                    matchFound = 1;
                    matchTotal +=1;
                    
                    //matchTotal = 24;

                    if (matchTotal == 12) {
                        imgOFF[oneClick] = 1;
                        imgOFF[twoClick] = 1;
                        // game over
                        draw();
                        var endDiv = document.getElementById("enddiv");
                        var content = document.createTextNode("Well done - You have completed the game. Your score is " +  (numbClick / 2) + ".");
                        endDiv.appendChild(content);
                    }

                }

                 else {
                    imgOFF[oneClick] = 0;
                    imgOFF[twoClick] = 0;

                }
            }
        }

        else {

// position not vacant so ignore click

            numbClick --;
        }

    }

}


function shuffle() {
  var currentIndex = posS.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = posS[currentIndex];
    posS[currentIndex] = posS[randomIndex];
    posS[randomIndex] = temporaryValue;
  }

  return posS;
}


function draw() {
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');

    for (var i = 0; i < 24; i++) {
        if ((imgOFF[i]) == 0) {
            ctx.drawImage(document.getElementById('blank'), imgX[i], imgY[i]);
        }

        else {
            ctx.drawImage(document.getElementById(imgON[i]), imgX[i], imgY[i]);
//            alert(imgX[posXY[i]]);
            if ((imgOFF[i]) == 2) {
                ctx.drawImage(document.getElementById('frame'), imgX[i], imgY[i]);
            }
        }
    }
}
