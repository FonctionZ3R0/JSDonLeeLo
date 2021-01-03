var largeur = 30;
var longueur = 20;
var map = new Array(largeur);

var running = true;
var difficulty = 3;
var speed = 200;
var scoreplicator = 1;
var first = true;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

for (var i = 0; i < map.length; i++) {
    map[i] = new Array(longueur);
}

var apple = [getRandomInt(largeur), getRandomInt(longueur)];
var appleScore = 1000;
var appleFreshness = 1;

map[largeur / 2][longueur / 2] = 1;
map[apple[0]][apple[1]] = 3;
var snakePos = [largeur / 2, longueur / 2];
var baseSnakeLength = 4
var snakeLength = 4;
var snakeActLength = 1;
var snakeBody = [new Array(), new Array()];
var dir = 4;
var keydir = [4];
var snakeRing = "¤"; // readONly
var snakeBodyColor = "";
var snakeHTColor = "";
var snakePatern = 0;
var snakeChar = "¤";
var snakeColorInvent = new Array();



var snakeMenu = new Array(4);
for (var i = 0; i < snakeMenu.length; i++) {
    snakeMenu[i] = new Array(7);
}
var snakeMenuPatern = [
    [1, 5],
    [0, 5],
    [0, 6],
    [1, 6],
    [2, 6],
    [3, 6],
    [3, 5],
    [3, 4],
    [3, 3],
    [2, 3],
    [1, 3],
    [0, 3],
    [0, 2],
    [0, 1],
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [3, 1],
    [2, 1],
]

document.querySelector(".snakeBody").innerHTML = document.querySelector(".snakeBody").innerHTML.replace(/¤/g, snakeChar);
document.querySelector(".snakeRing").innerHTML = snakeRing;

var eatedApple = 0;

//========  USER  =========
var connected = false;
var storedApple = 0;
var user = "";
var inventory = "000000000000000000000000000000";
//=========================

var score = 0;
var selectMode = false;
var selectMax = 1;
var selector = 0;
var valider = false;

var countdown = 0;

var showboardmenu = false;
var boardText = "<br>----------------------------------------------------<br>";
var boardText2 = "You have [<span class=\"apple1\">" + storedApple + "</span>] apples !";


 
//======= login section ========
var loginInput = document.createElement("input");
loginInput.setAttribute("id","login");
var passwordInput = document.createElement("input");
passwordInput.setAttribute("id","password");
passwordInput.setAttribute("type","password");

var buttonRetour = document.createElement("button");
buttonRetour.innerHTML = " Retour  ";
buttonRetour.setAttribute("onclick","logMenu()");

var buttonConnect = document.createElement("button");
buttonConnect.innerHTML = " Connect ";
buttonConnect.setAttribute("onclick","ajax(\"connect\")");

var buttonRegister = document.createElement("button");
buttonRegister.innerHTML = " Register ";
buttonRegister.setAttribute("onclick","ajax(\"register\")");
//==============================

if (snakePos[0] > apple[0]) {
    countdown = snakePos[0] - apple[0];
} else {
    countdown = apple[0] - snakePos[0];
}
if (snakePos[1] > apple[1]) {
    countdown += snakePos[1] - apple[1];
} else {
    countdown += apple[1] - snakePos[1];
}

document.addEventListener("keydown", function(e) {
    if (keydir.length < 5 && !selectMode) {
        switch (e.key) {
            case "z":
                if (keydir[keydir.length - 1] != 1) {
                    keydir.push(0);
                }
                break;
            case "s":
                if (keydir[keydir.length - 1] != 0) {
                    keydir.push(1);
                }
                break;
            case "q":
                if (keydir[keydir.length - 1] != 3) {
                    keydir.push(2);
                }
                break;
            case "d":
                if (keydir[keydir.length - 1] != 2) {
                    keydir.push(3);
                }
                break;
            case "ArrowUp":
                if (keydir[keydir.length - 1] != 1) {
                    keydir.push(0);
                }
                break;
            case "ArrowDown":
                if (keydir[keydir.length - 1] != 0) {
                    keydir.push(1);
                }
                break;
            case "ArrowLeft":
                if (keydir[keydir.length - 1] != 3) {
                    keydir.push(2);
                }
                break;
            case "ArrowRight":
                if (keydir[keydir.length - 1] != 2) {
                    keydir.push(3);
                }
                break;
            case "Enter":

                break;
            case "Escape":
                running = false;
                break;
            default:
                break;
        }
    } else if (selectMode) {
        switch (e.key) {
            case "+":
                snakeLength++;
                mySnakeMenu();
                break;
            case "z":
                if (selector == 0) {
                    selector = selectMax;
                } else {
                    selector--;
                }
                break;
            case "s":
                if (selector == selectMax) {
                    selector = 0;
                } else {
                    selector++;
                }
                break;
            case "q":
                if (selector == 0) {
                    selector = selectMax;
                } else {
                    selector--;
                }
                break;
            case "d":
                if (selector == selectMax) {
                    selector = 0;
                } else {
                    selector++;
                }
                break;
            case "ArrowUp":
                if (selector == 0) {
                    selector = selectMax;
                } else {
                    selector--;
                }
                break;
            case "ArrowDown":
                if (selector == selectMax) {
                    selector = 0;
                } else {
                    selector++;
                }
                break;
            case "ArrowLeft":
                if (selector == 0) {
                    selector = selectMax;
                } else {
                    selector--;
                }
                break;
            case "ArrowRight":
                if (selector == selectMax) {
                    selector = 0;
                } else {
                    selector++;
                }
                break;
            case "Enter":
                valider = true;
                break;
            case "Space":
                valider = true;
                break;
            default:
                break;
        }
    }
})

function resetGame() {
    if (running == false) {
        dir = 4;
        keydir = [4];
        for (var i = 0; i < map.length; i++) {
            for (var y = 0; y < map[0].length; y++) {
                map[i][y] = 0;
            }
        }
        apple = [getRandomInt(largeur), getRandomInt(longueur)];
        map[largeur / 2][longueur / 2] = 1;
        map[apple[0]][apple[1]] = 3;
        snakePos = [largeur / 2, longueur / 2];
        snakeLength = 4;
        snakeActLength = 1;
        snakeBody = [new Array(), new Array()];
        running = true;
        score = 0;
        appleScore = 1000;
        appleFreshness = 1;
        document.querySelector(".message").innerHTML = "";
    }
}

function selectDifficulty() {
    document.querySelector(".map").innerHTML = "Select the difficulty level :<br>";
    document.querySelector(".map").innerHTML += "";
    if (selector == 0) {
        document.querySelector(".map").innerHTML += "<span class=\"selector\">-[easy]-</span>";
    } else {
        document.querySelector(".map").innerHTML += " [easy] ";
    }
    document.querySelector(".map").innerHTML += " ";
    if (selector == 1) {
        document.querySelector(".map").innerHTML += "<span class=\"selector\">-[normal]-</span>";
    } else {
        document.querySelector(".map").innerHTML += " [normal] ";
    }
    document.querySelector(".map").innerHTML += " ";
    if (selector == 2) {
        document.querySelector(".map").innerHTML += "<span class=\"selector\">-[hard]-</span>";
    } else {
        document.querySelector(".map").innerHTML += " [hard] ";
    }
    document.querySelector(".map").innerHTML += "<br>";
    switch (selector) {
        case 0:
            document.querySelector(".message").innerHTML = "<span class=\"grayText\">The game will be at a gentle speed,<br>         Perfect for beginners</span>";
            break;

        case 1:
            document.querySelector(".message").innerHTML = "<span class=\"grayText\">The game will be at a average speed,<br>for mastering basics or chill games</span>";
            break;

        case 2:
            document.querySelector(".message").innerHTML = "<span class=\"grayText\">The game will be at a Monstrous speed,<br>to push further and further beyond !!!</span>";
            break;

        default:
            break;
    }

    setTimeout(() => {
        if (valider == true) {
            valider = false;
            difficulty = selector;
            switch (difficulty) {
                case 0: // easy
                    speed = 100;
                    scoreplicator = 1;
                    break;

                case 1: // normal
                    speed = 50;
                    scoreplicator = 3;
                    break;

                case 2: // hard
                    speed = 25;
                    scoreplicator = 7;
                    break;

                default:
                    break;
            }
            if (first == true) {
                first = false;
                selectMode = false;
                resetGame();
                renderMap();
                renderSnake();
                document.querySelector(".scoreBox").setAttribute("style", "")
                document.querySelector(".message").innerHTML = "";
                run()
            } else {
                selector = 0;
                selectMax = 3;
                valider = false;
                menu();
            }
        } else {
            selectDifficulty();
        }
    }, 100);
}

function deathMenu() {
    document.querySelector(".message").innerHTML = "You die, because you eat yourself !<br>";
    document.querySelector(".message").innerHTML += "       ";
    if (selector == 0) {
        document.querySelector(".message").innerHTML += "<span class=\"selector\">-[restart]-</span>";
    } else {
        document.querySelector(".message").innerHTML += " [restart] ";
    }
    document.querySelector(".message").innerHTML += " ";
    if (selector == 1) {
        document.querySelector(".message").innerHTML += "<span class=\"selector\">-[menu]-</span>";
    } else {
        document.querySelector(".message").innerHTML += " [menu] ";
    }
    setTimeout(() => {
        if (valider == true) {
            valider = false;
            selectMode = false;
            switch (selector) {
                case 0:
                    resetGame();
                    renderMap();
                    renderSnake();
                    document.querySelector(".scoreBox").setAttribute("style", "")
                    document.querySelector(".message").innerHTML = "";
                    run();
                    break;

                case 1:
                    showboardmenu = true;
                    document.querySelector(".snake").innerHTML = "";
                    document.querySelector(".message").innerHTML = "";
                    document.querySelector(".score").innerHTML = "";
                    document.querySelector(".scoreBox").setAttribute("style", "display: none")
                    menu();
                    break;

                default:
                    break;
            }
        } else {
            deathMenu();
        }
    }, 100);
}

function menu() {
    selectMode = true;
    selector = 0;
    if (connected) {
        selectMax = 4;
    }else{
        selectMax = 3;
    }
    valider = false;
    boardText2 = "You have [<span class=\"apple1\">" + storedApple + "</span>] apples !";
    showboardmenu == true ? document.querySelector(".board").innerHTML = boardText+boardText2 : document.querySelector(".board").innerHTML = "";
    document.querySelector(".map").setAttribute("class","map center");
    callmenu();

    function callmenu() {
        if (score != 0) {
            document.querySelector(".map").innerHTML = "Well Done ! Your score is : [<span style=\"color: gold; text-shadow: 0 0 5px gold;\">" + score + "</span>]<br>";
        } else {
            document.querySelector(".map").innerHTML = "Welcome to <span class=\"green\">Snake:Ascii</span> !<br>";
        }
        if (selector == 0) {
            document.querySelector(".map").innerHTML += "<span class=\"selector\">-[Play]-</span>";
        } else {
            document.querySelector(".map").innerHTML += " [Play] ";
        }
        document.querySelector(".map").innerHTML += " ";
        if (selector == 1) {
            document.querySelector(".map").innerHTML += "<span class=\"selector\">-[Shop]-</span>";
        } else {
            document.querySelector(".map").innerHTML += " [Shop] ";
        }
        document.querySelector(".map").innerHTML += " ";
        if (selector == 2) {
            document.querySelector(".map").innerHTML += "<span class=\"selector\">-[My Snake]-</span>";
        } else {
            document.querySelector(".map").innerHTML += " [My Snake] ";
        }
        document.querySelector(".map").innerHTML += " ";
        if (selector == 3) {
            document.querySelector(".map").innerHTML += "<span class=\"selector\">-[Change Difficulty]-</span>";
        } else {
            document.querySelector(".map").innerHTML += " [Change Difficulty] ";
        }
        if (connected) {
            document.querySelector(".map").innerHTML += " ";
            if (selector == 4) {
                document.querySelector(".map").innerHTML += "<span class=\"selector\">-[disconnect]-</span>";
            } else {
                document.querySelector(".map").innerHTML += " [disconnect] ";
            } 
        }
        
        document.querySelector(".map").innerHTML += "<br>";
        switch (selector) {
            case 0:
                document.querySelector(".message").innerHTML = "<span class=\"grayText\">OH *** ! Here we go again ...</span><br> ";
                break;

            case 1:
                document.querySelector(".message").innerHTML = "<span class=\"grayText\">     Exchange your <span class=\"apple1\">apples</span> to get,<br><span class=\"apple4\">skins</span>, <span class=\"apple3\">colors</span> and <span class=\"selector\">rings</span> for your snake";
                break;

            case 2:
                document.querySelector(".message").innerHTML = "<span class=\"grayText\">You can make your snake molt and<br> help it develop some aptitudes</span>";
                break;

            case 3:
                document.querySelector(".message").innerHTML = "<span class=\"grayText\">Too hard ? Too easy ? Change difficulty here,<br>    choose the one that fits for you :D!</span>";
                break;
            case 4:
                document.querySelector(".message").innerHTML = "<span class=\"grayText\"> See you my frend .. :'(</span>";
                break;
            default:
                break;
        }

        setTimeout(() => {
            if (valider == true) {
                valider = false;
                switch (selector) {
                    case 0:
                        if (first == true) {
                            selector = 1;
                            selectMax = 2;
                            valider = false;
                            document.querySelector(".board").innerHTML = "";
                            document.querySelector(".map").setAttribute("class","map");
                            selectDifficulty();
                        } else {
                            selectMode = false;
                            resetGame();
                            renderMap();
                            renderSnake();
                            document.querySelector(".scoreBox").setAttribute("style", "")
                            document.querySelector(".message").innerHTML = "";
                            document.querySelector(".board").innerHTML = "";
                            run();
                        }
                        break;

                    case 1:
                        shopMenu();
                        break;

                    case 2:
                        mySnakeMenu();
                        break;

                    case 3:
                        first = false;
                        selector = 1;
                        selectMax = 2;
                        valider = false;
                        document.querySelector(".board").innerHTML = "";
                        selectDifficulty();
                        break;

                    case 4:
                        connected = false;
                        user = "";
                        boardText = "<br>------------------------------------------------------------<br>";
                        boardText2 = "You have [<span class=\"apple1\">" + storedApple + "</span>] apples !";
                        storedApple = 0;
                        selectMode = true;
                        selector = 0;
                        selectMax = 2;
                        valider = false;
                        logMenu();
                    default:
                        break;
                }
            } else {
                callmenu();
            }
        }, 100);
    }
}

function logMenu() {
    document.querySelector(".board").innerHTML = ""
    document.querySelector(".map").setAttribute("class","map");
    document.querySelector(".message").innerHTML = "";
    document.querySelector(".map").innerHTML = "Hey ! Let me know who you are :) or play as a stranger.. <br>        (Use the arrows to make your choice)<br>";
    document.querySelector(".map").innerHTML += "     ";
    if (selector == 0) {
        document.querySelector(".map").innerHTML += "<span class=\"selector\">-[Connect]-</span>";
    } else {
        document.querySelector(".map").innerHTML += " [Connect] ";
    }
    document.querySelector(".map").innerHTML += " ";
    if (selector == 1) {
        document.querySelector(".map").innerHTML += "<span class=\"selector\">-[Register]-</span>";
    } else {
        document.querySelector(".map").innerHTML += " [Register] ";
    }
    document.querySelector(".map").innerHTML += " ";
    if (selector == 2) {
        document.querySelector(".map").innerHTML += "<span class=\"selector\">-[Play as a stranger]-</span>";
    } else {
        document.querySelector(".map").innerHTML += " [Play as a stranger] ";
    }
    document.querySelector(".map").innerHTML += "<br>";
    setTimeout(() => {
        if (valider == true) {
            valider = false;
            switch (selector) {
                case 0:
                    connectionMenu();
                    break;

                case 1:
                    registerMenu();
                    break;

                case 2:
                    menu();
                    break;

                default:
                    break;
            }
        } else {
            logMenu();
        }
    }, 100);
}

// ======== SHOP section ======
function shopMenu() {
    selectMode = true;
    selector = 0;
    selectMax = 3;
    valider = false;
    document.querySelector(".board").innerHTML = boardText+boardText2;
    document.querySelector(".shopMap").style.display = "";
    document.querySelector(".message").innerHTML = "";
    shop();

    function shop() {
        document.querySelector(".map").innerHTML = "";
        if (selector == 0) {
            document.querySelector(".map").innerHTML += "<span class=\"selector\">-[Colors]-</span>";
        } else {
            document.querySelector(".map").innerHTML += " [Colors] ";
        }
        document.querySelector(".map").innerHTML += " ";
        if (selector == 1) {
            document.querySelector(".map").innerHTML += "<span class=\"selector\">-[Ring]-</span>";
        } else {
            document.querySelector(".map").innerHTML += " [Ring] ";
        }
        document.querySelector(".map").innerHTML += " ";
        if (selector == 2) {
            document.querySelector(".map").innerHTML += "<span class=\"selector\">-[Skin]-</span>";
        } else {
            document.querySelector(".map").innerHTML += " [Skin] ";
        }
        document.querySelector(".map").innerHTML += " ";
        if (selector == 3) {
            document.querySelector(".map").innerHTML += "<span class=\"selector\">-[retour]-</span>";
        } else {
            document.querySelector(".map").innerHTML += " [retour] ";
        }
        document.querySelector(".map").innerHTML += "<br>";
        switch (selector) {
            case 0:
                break;

            case 1:
                break;

            case 2:
                break;

            case 3:
                break;
            default:
                break;
        }

        setTimeout(() => {
            if (valider == true) {
                valider = false;
                switch (selector) {
                    case 0:
                        shopColors()
                        break;

                    case 1:
                        shop()
                        break;

                    case 2:
                        shop()
                        break;

                    case 3:
                        document.querySelector(".shopMap").style.display = "none";
                        menu();
                        break;

                    default:
                        break;
                }
            } else {
                shop();
            }
        }, 100);
    }
}

function shopColors() {
    selectMode = true;
    selector = 0;
    selectMax = 3;
    valider = false;
    document.querySelector(".snakeBody").style.color = "";
    document.querySelector(".snakeBody").style.textShadow = "";
    document.querySelector(".snakeHead").style.color = "";
    document.querySelector(".snakeHead").style.textShadow = "";
    document.querySelector(".snakeTail").style.color = "";
    document.querySelector(".snakeTail").style.textShadow = "";
    document.querySelector(".gameBox").style.display = "flex";
    document.querySelector(".gameBox").style.marginBottom = "32px";
    document.querySelector(".message").innerHTML = "";
    shopColor();

    function shopColor() {
        document.querySelector(".map").innerHTML = "          [Color]<br>---------------------------+<br> ";
        if (selector == 0) {
            document.querySelector(".map").innerHTML += "<span class=\"selector\">-<span style=\"color: darkred; text-shadow: 0 0 5px red;\">[BloodRed]</span>-</span>       [<span class=\"apple1\">250</span>]<span class=\"apple1\">@</span> |";
        } else {
            document.querySelector(".map").innerHTML += " <span style=\"color: darkred; text-shadow: 0 0 5px red;\">[BloodRed]</span>        ";
            document.querySelector(".map").innerHTML +="[<span class=\"apple1\">250</span>]<span class=\"apple1\">@</span>";
            document.querySelector(".map").innerHTML +=" |";
        }
        document.querySelector(".map").innerHTML += "<br> ";
        if (selector == 1) {
            document.querySelector(".map").innerHTML += "<span class=\"selector\">-<span style=\"color: orange; text-shadow: 0 0 5px red;\">[LavaOrange]</span>-</span>     [<span class=\"apple1\">250</span>]<span class=\"apple1\">@</span> |";
        } else {
            document.querySelector(".map").innerHTML += " <span style=\"color: orange; text-shadow: 0 0 5px red;\">[LavaOrange]</span>      [<span class=\"apple1\">250</span>]<span class=\"apple1\">@</span> |";
        }
        document.querySelector(".map").innerHTML += "<br> ";
        if (selector == 2) {
            document.querySelector(".map").innerHTML += "<span class=\"selector\">-<span style=\"color: yellow; text-shadow: 0 0 5px white;\">[SandYellow]</span>-</span>     [<span class=\"apple1\">250</span>]<span class=\"apple1\">@</span> |";
        } else {
            document.querySelector(".map").innerHTML += " <span style=\"color: yellow; text-shadow: 0 0 5px white;\">[SandYellow]</span>      [<span class=\"apple1\">250</span>]<span class=\"apple1\">@</span> |";
        }
        document.querySelector(".map").innerHTML += "<br>                           |<br>                           |<br>                           |<br>                           |<br>                           |<br>                           |<br>                           |<br>                           |<br>                           |<br>                           |<br>                           |<br>                           |<br>        ";
        if (selector == 3) {
            document.querySelector(".map").innerHTML += "<span class=\"selector\">-[retour]-         </span>|";
        } else {
            document.querySelector(".map").innerHTML += " [retour]          |";
        }
        document.querySelector(".map").innerHTML += "<br>---------------------------+<br>";
        switch (selector) {
            case 0:
                document.querySelector(".message").innerHTML = "<span class=\"grayText\">Nothing could look more royal,<br>   Pure, deep and .. red ..</span>";
                document.querySelector(".snakeBody").style.color = "darkred";
                document.querySelector(".snakeBody").style.textShadow = "0 0 5px red";
                document.querySelector(".snakeHead").style.color = "red";
                document.querySelector(".snakeHead").style.textShadow = "0 0 5px red";
                document.querySelector(".snakeTail").style.color = "red";
                document.querySelector(".snakeTail").style.textShadow = "0 0 5px red";
                break;

            case 1:
                document.querySelector(".message").innerHTML = "<span class=\"grayText\">The direct rival of hell fire<br>           Earth's blood...</span>";
                document.querySelector(".snakeBody").style.color = "orange";
                document.querySelector(".snakeBody").style.textShadow = "0 0 5px red";
                document.querySelector(".snakeHead").style.color = "yellow";
                document.querySelector(".snakeHead").style.textShadow = "0 0 5px red";
                document.querySelector(".snakeTail").style.color = "yellow";
                document.querySelector(".snakeTail").style.textShadow = "0 0 5px red";
                break;

            case 2:
                document.querySelector(".message").innerHTML = "<span class=\"grayText\">Countless deadly poison spicies <br> hide in the sand bellow your feet</span>";
                document.querySelector(".snakeBody").style.color = "yellow";
                document.querySelector(".snakeBody").style.textShadow = "0 0 5px white";
                document.querySelector(".snakeHead").style.color = "#a58c00";
                document.querySelector(".snakeHead").style.textShadow = "0 0 5px white";
                document.querySelector(".snakeTail").style.color = "#a58c00";
                document.querySelector(".snakeTail").style.textShadow = "0 0 5px white";
                break;

            case 3:
                document.querySelector(".message").innerHTML = "";
                document.querySelector(".snakeBody").style.color = "";
                document.querySelector(".snakeBody").style.textShadow = "";
                document.querySelector(".snakeHead").style.color = "";
                document.querySelector(".snakeHead").style.textShadow = "";
                document.querySelector(".snakeTail").style.color = "";
                document.querySelector(".snakeTail").style.textShadow = "";
                break;
            default:
                break;
        }

        setTimeout(() => {
            if (valider == true) {
                valider = false;
                switch (selector) {
                    case 0:
                        shopColor()
                        break;

                    case 1:
                        shopColor()
                        break;

                    case 2:
                        shopColor()
                        break;

                    case 3:
                        document.querySelector(".gameBox").style.marginBottom = "";
                        document.querySelector(".gameBox").style.display = "";
                        shopMenu();
                        break;

                    default:
                        break;
                }
            } else {
                shopColor();
            }
        }, 100);
    }
}
// ============================

// ======= MySnake Section =======
function mySnakeMenu() {
    selectMode = true;
    selector = 0;
    selectMax = 3;
    valider = false;
    document.querySelector(".gameBox").style.display = "flex";
    document.querySelector(".gameBox").style.marginBottom = "32px";
    document.querySelector(".message").innerHTML = "";
    document.querySelector(".shopMap").style.display = "";
    document.querySelector(".snakeBody").style.display = "none";
    document.querySelector(".shopTitle").style.display = "none";
    document.querySelector(".mySnakeBody").innerHTML = "";
    document.querySelector(".mySnakeBody").style.display = "";
    if (snakeLength > 9) {
        snakeMenu[2][3] = 0;
        snakeMenu[1][3] = 0;
        snakeMenu[0][3] = 0;
    }
    if (snakeLength > 19) {
        snakeMenu[2][1] = 0;
    }
    for (let i = 0; i < snakeLength - 1; i++) {
        if (i == 0) {
            snakeMenu[snakeMenuPatern[i][0]][snakeMenuPatern[i][1]] = 1;
        } else if (i < snakeLength - 3) {
            snakeMenu[snakeMenuPatern[i][0]][snakeMenuPatern[i][1]] = 2;
        } else if (i == snakeLength - 3) {
            snakeMenu[snakeMenuPatern[i][0]][snakeMenuPatern[i][1]] = 3;
        } else if (i == snakeLength - 2) {
            snakeMenu[snakeMenuPatern[i][0]][snakeMenuPatern[i][1]] = 4;
        }
    }
    if (snakeLength > 7) {
        snakeMenu[2][5] = 0;
    }
    if (snakeLength > 8) {
        snakeMenu[0][4] = 0;
        snakeMenu[1][4] = 0;
        snakeMenu[2][4] = 0;
    }

    if (snakeLength > 19) {
        snakeMenu[1][1] = 0;
    }
    for (let islon = 0; islon < 7; islon++) {
        if (snakeMenu[0][islon] == null && snakeMenu[1][islon] == null && snakeMenu[2][islon] == null && snakeMenu[3][islon] == null) {} else {
            document.querySelector(".mySnakeBody").innerHTML += "<br>";
        }
        for (let islar = 0; islar < 4; islar++) {
            document.querySelector(".mySnakeBody").innerHTML += snakeMenu[islar][islon] == 0 ? "  " : snakeMenu[islar][islon] == 1 ? "<span class=\"snakeTail\">o</span> " : snakeMenu[islar][islon] == 2 ? snakeChar + " " : snakeMenu[islar][islon] == 3 ? "<span class=\"snakeRing\">" + snakeRing + "</span> " : snakeMenu[islar][islon] == 4 ? "<span class=\"snakeHead\">O</span> " : "";
        }
    }

    mySnake();

    function mySnake() {
        document.querySelector(".map").innerHTML = "<br><br>"
        document.querySelector(".map").innerHTML += "        ";
        if (selector == 0) {
            document.querySelector(".map").innerHTML += "<span class=\"selector\">-[Molt]-</span>";
        } else {
            document.querySelector(".map").innerHTML += " [Molt] ";
        }
        document.querySelector(".map").innerHTML += "<br><br><br><br>";
        document.querySelector(".map").innerHTML += "        ";
        if (selector == 1) {
            document.querySelector(".map").innerHTML += "<span class=\"selector\">-[Ring]-</span>";
        } else {
            document.querySelector(".map").innerHTML += " [Ring] ";
        }
        document.querySelector(".map").innerHTML += "<br><br><br><br>";
        document.querySelector(".map").innerHTML += "      ";
        if (selector == 2) {
            document.querySelector(".map").innerHTML += "<span class=\"selector\">-[Aptitudes]-</span>";
        } else {
            document.querySelector(".map").innerHTML += " [Aptitudes] ";
        }
        document.querySelector(".map").innerHTML += "<br><br><br><br><br><br>";
        document.querySelector(".map").innerHTML += "       ";
        if (selector == 3) {
            document.querySelector(".map").innerHTML += "<span class=\"selector\">-[retour]-</span>";
        } else {
            document.querySelector(".map").innerHTML += " [retour] ";
        }
        switch (selector) {
            case 0:
                break;

            case 1:
                break;

            case 2:
                break;

            case 3:
                break;
            default:
                break;
        }

        setTimeout(() => {
            if (valider == true) {
                valider = false;
                switch (selector) {
                    case 0:
                        MoltMenu()
                        break;

                    case 1:
                        mySnake()
                        break;

                    case 2:
                        mySnake()
                        break;

                    case 3:
                        document.querySelector(".gameBox").style.marginBottom = "";
                        document.querySelector(".gameBox").style.display = "";
                        document.querySelector(".shopMap").style.display = "none";
                        document.querySelector(".snakeBody").style.display = "";
                        document.querySelector(".shopTitle").style.display = "";
                        document.querySelector(".mySnakeBody").style.display = "none";
                        menu();
                        break;

                    default:
                        break;
                }
            } else {
                mySnake();
            }
        }, 100);
    }
}

function MoltMenu() {
    selectMode = true;
    selector = 0;
    selectMax = 3;
    valider = false;

    Molt();

    function Molt() {
        document.querySelector(".map").innerHTML = "<br><br>"
        document.querySelector(".map").innerHTML += "       ";
        if (selector == 0) {
            document.querySelector(".map").innerHTML += "<span class=\"selector\">-[Color]-</span>";
        } else {
            document.querySelector(".map").innerHTML += " [Color] ";
        }
        document.querySelector(".map").innerHTML += "<br><br><br><br>";
        document.querySelector(".map").innerHTML += "        ";
        if (selector == 1) {
            document.querySelector(".map").innerHTML += "<span class=\"selector\">-[Skin]-</span>";
        } else {
            document.querySelector(".map").innerHTML += " [Skin] ";
        }
        document.querySelector(".map").innerHTML += "<br><br><br><br><br><br>";
        document.querySelector(".map").innerHTML += "       ";
        if (selector == 2) {
            document.querySelector(".map").innerHTML += "<span class=\"selector\">-[Molt !]-</span>";
        } else {
            document.querySelector(".map").innerHTML += " [Molt !] ";
        }
        document.querySelector(".map").innerHTML += "<br><br><br><br>";
        document.querySelector(".map").innerHTML += "       ";
        if (selector == 3) {
            document.querySelector(".map").innerHTML += "<span class=\"selector\">-[retour]-</span>";
        } else {
            document.querySelector(".map").innerHTML += " [retour] ";
        }
        switch (selector) {
            case 0:
                break;

            case 1:
                break;

            case 2:
                break;

            case 3:
                break;
            default:
                break;
        }

        setTimeout(() => {
            if (valider == true) {
                valider = false;
                switch (selector) {
                    case 0:
                        Molt()
                        break;

                    case 1:
                        Molt()
                        break;

                    case 2:
                        Molt()
                        break;

                    case 3:
                        mySnakeMenu();
                        break;

                    default:
                        break;
                }
            } else {
                Molt();
            }
        }, 100);
    }
}
// ===============================

// ======= Connection/register section ======
function connectionMenu() {
    document.querySelector(".map").setAttribute("class","map center");
    document.querySelector(".map").innerHTML = "-------[ Connect ]-------<br>";
    document.querySelector(".map").innerHTML += "~ Login ~<br>";
    document.querySelector(".map").appendChild(loginInput);
    document.querySelector(".map").innerHTML += "<br><br>";
    document.querySelector(".map").innerHTML += "~ Password ~<br>";
    document.querySelector(".map").appendChild(passwordInput);
    document.querySelector(".map").innerHTML += "<br><br>";
    document.querySelector(".map").appendChild(buttonConnect);
    document.querySelector(".map").innerHTML += "<br><br><br>";
    document.querySelector(".map").appendChild(buttonRetour);
}
function registerMenu() {
    document.querySelector(".map").setAttribute("class","map center");
    document.querySelector(".map").innerHTML = "-------[ Register ]-------<br>";
    document.querySelector(".map").innerHTML += "~ Login ~<br>";
    document.querySelector(".map").appendChild(loginInput);
    document.querySelector(".map").innerHTML += "<br><br>";
    document.querySelector(".map").innerHTML += "~ Password ~<br>";
    document.querySelector(".map").appendChild(passwordInput);
    document.querySelector(".map").innerHTML += "<br><br>";
    document.querySelector(".map").appendChild(buttonRegister);
    document.querySelector(".map").innerHTML += "<br><br><br>";
    document.querySelector(".map").appendChild(buttonRetour);
}
// ==========================================

//=============== Database Section ===================
var xmlhttp = new XMLHttpRequest();

function ajax(str) {
     xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText != "0Kc0mec710n0F"+ document.getElementById("login").value) {
                document.querySelector(".message").innerHTML = this.responseText;
            }
            if (str == "connect") {
                if (this.responseText == "0Kc0mec710n0F" + document.getElementById("login").value) {
                    user = document.getElementById("login").value;
                    connected = true;
                    boardText = boardText.replace("-","[ "+user+" ]");
                    showboardmenu = true;
                    getapple();
                    setTimeout(() => {
                        menu();
                    }, 100);
                }
            }
            if (str == "register") {
                    user = document.getElementById("login").value;
                    connected = true;
                    boardText = boardText.replace("-","[ "+user+" ]");
                    showboardmenu = true;
                    menu();
            }
        }
      };
      xmlhttp.open("GET", str+".php?login=" + document.getElementById("login").value +"&password="+ document.getElementById("password").value, true);
      xmlhttp.send();
}

function getapple() {
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText.substring(0,2) == "ok") {
                storedApple = parseInt(this.responseText.substring(2,this.responseText.length));
            }
        }
      };
      xmlhttp.open("GET", "getapple.php?login="+user, true);
      xmlhttp.send();
}

function addapple() {
    xmlhttp.onreadystatechange = null;
    xmlhttp.open("GET", "addapple.php?login="+user+"&apples="+storedApple, true);
    xmlhttp.send();
}
//============================================

// fonction du jeu

function renderMap() {
    document.querySelector(".map").innerHTML = "";
    ligne();
    for (let ilon = 0; ilon < longueur; ilon++) {
        document.querySelector(".map").innerHTML += "| ";
        for (let ilar = 0; ilar < largeur; ilar++) {
            document.querySelector(".map").innerHTML += map[ilar][ilon] == 0 ? "  " : map[ilar][ilon] == 1 ? "  " : map[ilar][ilon] == 2 ? "  " : map[ilar][ilon] == 3 ? "  " : map[ilar][ilon] == 4 ? "  " : "  ";
        }
        document.querySelector(".map").innerHTML += "|<br>";
    }
    ligne();

    function ligne() {
        document.querySelector(".map").innerHTML += "+-";
        for (let ilar = 0; ilar < largeur; ilar++) {
            document.querySelector(".map").innerHTML += "--";
        }
        document.querySelector(".map").innerHTML += "+<br>";
    }
}

function renderSnake() {
    document.querySelector(".snake").innerHTML = "";
    for (let ilon = 0; ilon < longueur; ilon++) {
        for (let ilar = 0; ilar < largeur; ilar++) {
            document.querySelector(".snake").innerHTML += map[ilar][ilon] == 0 ? "  " : map[ilar][ilon] == 1 ? "<span class=\"snakeHead\">O</span> " : map[ilar][ilon] == 2 ? snakeChar + " " : map[ilar][ilon] == 3 ? "<span id=\"apple\" class=\"apple" + appleFreshness + "\">@</span> " : map[ilar][ilon] == 4 ? "<span class=\"snakeTail\">o</span> " : map[ilar][ilon] == 5 ? "<span class=\"snakeRing\">" + snakeRing + "</span> " : "  ";
        }
        document.querySelector(".snake").innerHTML += "<br>";
    }
}

function event() {
    snakeBody[0][snakeActLength - 1] = snakePos[0];
    snakeBody[1][snakeActLength - 1] = snakePos[1];
    if (keydir != dir) {
        keydir.shift();
        dir = keydir[0];
    }
    switch (dir) {
        case 0:
            if (snakePos[1] == 0) {
                snakePos[1] = 19;
            } else {
                --snakePos[1];
            }
            break;

        case 1:
            if (snakePos[1] == longueur - 1) {
                snakePos[1] = 0;
            } else {
                ++snakePos[1];
            }
            break;

        case 2:
            if (snakePos[0] == 0) {
                snakePos[0] = 29;
            } else {
                --snakePos[0];
            }
            break;

        case 3:
            if (snakePos[0] == largeur - 1) {
                snakePos[0] = 0;
            } else {
                ++snakePos[0];
            }
            break;

        case 4:
            break;

        default:
            break;
    }
}

function update() {
    // console.log(snakeBody[0]);
    // console.log(snakeBody[1]);
    // keydir.push(1);
    // speed = 10000;
    // sizing
    if (snakeActLength < snakeLength) {
        snakeBody[0].push(snakeBody[0][snakeActLength - 1]);
        snakeBody[1].push(snakeBody[1][snakeActLength - 1]);
        snakeActLength++;
    } else {
        snakeBody[0].shift();
        snakeBody[1].shift();
        snakeActLength--;
        snakeBody[0].push(snakeBody[0][snakeActLength - 1]);
        snakeBody[1].push(snakeBody[1][snakeActLength - 1]);
        snakeActLength++;
    }

    //Apple eated
    if (snakePos[0] == apple[0] && snakePos[1] == apple[1]) {
        eatedApple++;
        document.querySelector(".appleMessage").innerHTML = "    <span class=\"scoreMessage\">+[<span style=\"color: goldenrod\">" + appleScore * scoreplicator + "</span>]</span><br>";
        appleFreshness = 1;
        snakeLength++;
        score += appleScore * scoreplicator;
        map[apple[0]][apple[1]] = 0;
        apple = [getRandomInt(largeur), getRandomInt(longueur)];
        map[apple[0]][apple[1]] = 3;

        if (snakePos[0] > apple[0]) {
            countdown = snakePos[0] - apple[0];
        } else {
            countdown = apple[0] - snakePos[0];
        }
        if (snakePos[1] > apple[1]) {
            countdown += snakePos[1] - apple[1];
        } else {
            countdown += apple[1] - snakePos[1];
        }
        countdown += (1 * scoreplicator) + 3;
    }
    //i eat myself
    if (map[snakePos[0]][snakePos[1]] == 2) {
        running = false
    }

    if (countdown != 0 && dir != 4) {
        countdown--;
    } else if (appleFreshness != 6 && dir != 4) {
        countdown = 3 * scoreplicator;
        if (appleFreshness < 6) {
            appleFreshness++;
        }
    }
    switch (appleFreshness) {
        case 1:
            appleScore = 1000;
            break;
        case 2:
            appleScore = 450;
            break;
        case 3:
            appleScore = 250;
            break;
        case 4:
            appleScore = 100;
            break;
        case 5:
            appleScore = 50;
            break;
        case 6:
            appleScore = 25;
            break;

        default:
            break;
    }
    map[snakeBody[0][snakeActLength - 2]][snakeBody[1][snakeActLength - 2]] = 5; // snakeRing
    if (snakeActLength > 3) {
        map[snakeBody[0][snakeActLength - 3]][snakeBody[1][snakeActLength - 3]] = 2; // snakeBody
    }
    map[snakeBody[0][1]][snakeBody[1][1]] = 4; // snakeTail

    if (snakeBody[0][0] == apple[0] && snakeBody[1][0] == apple[1]) {
        map[apple[0]][apple[1]] = 3;
    } else {
        map[snakeBody[0][0]][snakeBody[1][0]] = 0;
    }
    map[snakePos[0]][snakePos[1]] = 1; // snakeHead
}

document.querySelector(".scoreBox").setAttribute("style", "display: none")
selectMode = true;
selector = 0;
selectMax = 2;
valider = false;
logMenu();

function run() {
    setTimeout(() => {
        event();
        update();
        renderSnake();
        document.querySelector(".score").innerHTML = "Score[<span style=\"color: gold; text-shadow: 0 0 5px gold;\">" + score + "</span>] Apple<span id=\"apple\" class=\"apple" + appleFreshness + "\">@</span>[<span class=\"apple" + appleFreshness + "\">" + appleScore * scoreplicator + "</span>] Lenght[<span class=\"green\">" + (snakeActLength - 1) + "</span>]";
        //document.querySelector(".debug").innerHTML = "sb("+snakeBody[0]+" / "+snakeBody[1]+") sp("+snakePos[0]+","+snakePos[1]+")";
        if (running) {
            run();
        } else {
            storedApple += eatedApple;
            addapple();
            eatedApple = 0;
            selectMode = true;
            selector = 0;
            selectMax = 1;
            snakeLength = baseSnakeLength;
            valider = false;
            deathMenu();


            /*
            document.querySelector(".snake").innerHTML = "";
            selectMode = true;
            selector = 1;
            selectMax = 2;
            valider = false;
            selectDifficulty();
            */
        }
    }, speed);
}