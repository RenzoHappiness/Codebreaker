console.log("Script loaded!");

const translations = {
    de: {
        title: "🔐 Codebreaker",
        instructionsTitle: "Spielanleitung:",
        instruction1: "• Der Computer schlägt einen 4-stelligen Code vor",
        instruction2: "• Gib an, wie viele rote (richtige Ziffer, falsche Position) und grüne (richtige Ziffer, richtige Position) Treffer du hattest",
        instruction3: "• Klicke \"Lösen/Weiter\" für den nächsten Vorschlag",
        redLabel: "Rote Treffer",
        greenLabel: "Grüne Treffer",
        roundLabel: "Runden",
        codeLabel: "Code zum Eingeben:",
        redButtonsLabel: "Rote Treffer:",
        greenButtonsLabel: "Grüne Treffer:",
        red0: "0 Rot", red1: "1 Rot", red2: "2 Rot", red3: "3 Rot", red4: "4 Rot",
        green0: "0 Grün", green1: "1 Grün", green2: "2 Grün", green3: "3 Grün",
        solveButton: "🔍 Lösen/Weiter",
        restartButton: "🔄 Neustart",
        alertWin: "Die Zahl muss sein:",
        alertError: "Etwas ist schiefgelaufen - keine Antwort gefunden"
    },
    en: {
        title: "🔐 Codebreaker",
        instructionsTitle: "How to play:",
        instruction1: "• The computer suggests a 4-digit code",
        instruction2: "• Indicate how many red (right digit, wrong position) and green (right digit, right position) hits you had",
        instruction3: "• Click \"Solve/Next\" for the next suggestion",
        redLabel: "Red Hits",
        greenLabel: "Green Hits",
        roundLabel: "Rounds",
        codeLabel: "Code to Enter:",
        redButtonsLabel: "Red Hits:",
        greenButtonsLabel: "Green Hits:",
        red0: "0 Red", red1: "1 Red", red2: "2 Red", red3: "3 Red", red4: "4 Red",
        green0: "0 Green", green1: "1 Green", green2: "2 Green", green3: "3 Green",
        solveButton: "🔍 Solve/Next",
        restartButton: "🔄 Restart",
        alertWin: "The number must be:",
        alertError: "Something went wrong - no answer found"
    },
    fr: {
        title: "🔐 Codebreaker",
        instructionsTitle: "Comment jouer:",
        instruction1: "• L'ordinateur propose un code à 4 chiffres",
        instruction2: "• Indiquez combien de touches rouges (bon chiffre, mauvaise position) et vertes (bon chiffre, bonne position) vous avez eues",
        instruction3: "• Cliquez sur \"Résoudre/Suivant\" pour la suggestion suivante",
        redLabel: "Touches Rouges",
        greenLabel: "Touches Vertes",
        roundLabel: "Tours",
        codeLabel: "Code à Saisir:",
        redButtonsLabel: "Touches Rouges:",
        greenButtonsLabel: "Touches Vertes:",
        red0: "0 Rouge", red1: "1 Rouge", red2: "2 Rouge", red3: "3 Rouge", red4: "4 Rouge",
        green0: "0 Vert", green1: "1 Vert", green2: "2 Vert", green3: "3 Vert",
        solveButton: "🔍 Résoudre/Suivant",
        restartButton: "🔄 Redémarrer",
        alertWin: "Le nombre doit être:",
        alertError: "Quelque chose s'est mal passé - aucune réponse trouvée"
    }
};

var red = 0;
var green = 0;
var currentLanguage = 'de';
var game;

class Code {
    constructor(code) {
        this.num = code;
    }

    guessRed(guess) {
        var intern = this.num.toString();
        var ext = guess.toString();
        var alpha = intern.split('');
        var beta = ext.split('');
        var numRed = 0;

        for (var col = 0; col < alpha.length; col++) {
            var testAlpha = alpha[col];
            for (var row = 0; row < beta.length; row++) {
                var testBeta = beta[row];
                if (row !== col && testBeta === testAlpha) {
                    numRed++;
                }
            }
        }
        return numRed;
    }

    guessGreen(guess) {
        var intern = this.num.toString();
        var ext = guess.toString();
        var alpha = intern.split('');
        var beta = ext.split('');
        var numGreen = 0;

        for (var col = 0; col < alpha.length; col++) {
            var testAlpha = alpha[col];
            for (var row = 0; row < beta.length; row++) {
                var testBeta = beta[row];
                if (row === col && testBeta === testAlpha) {
                    numGreen++;
                }
            }
        }
        return numGreen;
    }

    isEliminated(otherCode) {
        if (this.guessRed(otherCode) === 0 && this.guessGreen(otherCode) === 0) {
            return true;
        }
        if (this.guessGreen(otherCode) === 4) {
            return true;
        }
        return false;
    }

    getNum() {
        return this.num;
    }
}

class CodebreakerGame {
    constructor() {
        this.list = [];
        this.generateCode();
    }

    generateCode() {
        this.list = [];
        
        for (var i = 1111; i <= 9876; i++) {
            var alpha = i.toString().split('');
            var beta = i.toString().split('');
            var numRed = 0;

            for (var col = 0; col < alpha.length; col++) {
                var testAlpha = alpha[col];
                for (var row = 0; row < beta.length; row++) {
                    var testBeta = beta[row];
                    if ((row !== col && testBeta === testAlpha) || beta[row] === '0') {
                        numRed++;
                    }
                }
            }

            if (numRed === 0) {
                this.list.push(new Code(i));
            }
        }
    }

    solve(red, green, usedCode) {
        var isAllEqual = true;

        for (var k = 0; k < this.list.length; k++) {
            if (this.list[k].getNum() === usedCode) {
                this.list.splice(k, 1);
                break;
            }
        }

        if (this.list.length === 1) {
            var answer = this.list[0].getNum();
            document.getElementById('codeToEnter').value = answer.toString();
            var t = translations[currentLanguage];
            alert(t.alertWin + " " + answer);
            return;
        }

        var removeList = [];
        for (var i = 0; i < this.list.length; i++) {
            var element = this.list[i];
            var shouldRemove = false;
            if (element.guessGreen(usedCode) !== green) shouldRemove = true;
            if (element.guessRed(usedCode) !== red) shouldRemove = true;
            if (shouldRemove) removeList.push(element);
        }

        for (var i = 0; i < removeList.length; i++) {
            for (var j = 0; j < this.list.length; j++) {
                if (this.list[j] === removeList[i]) {
                    this.list.splice(j, 1);
                    break;
                }
            }
        }

        if (this.list.length === 1) {
            var answer = this.list[0].getNum();
            document.getElementById('codeToEnter').value = answer.toString();
            var t = translations[currentLanguage];
            alert(t.alertWin + " " + answer);
            return;
        }

        if (this.list.length === 0) {
            var t = translations[currentLanguage];
            alert(t.alertError);
            return;
        }

        var bestChoice = this.list[0].getNum();
        var bestScore = 0;

        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].isEliminated(bestChoice)) {
                bestScore++;
            }
        }

        for (var i = 0; i < this.list.length; i++) {
            var guess = this.list[i].getNum();
            var score = 0;
            if (score < bestScore) isAllEqual = false;
            
            for (var j = 0; j < this.list.length; j++) {
                if (this.list[j].isEliminated(guess)) {
                    score++;
                }
            }
            
            if (score > bestScore) {
                bestScore = score;
                bestChoice = guess;
                isAllEqual = false;
            }
        }

        if (bestScore <= 1 || (isAllEqual && this.list.length > 1)) {
            bestScore = 500;
            for (var i = 0; i < this.list.length; i++) {
                var guess = this.list[i].getNum();
                var score = 0;
                for (var j = 0; j < this.list.length; j++) {
                    score += (this.list[j].guessGreen(guess) + this.list[j].guessRed(guess));
                }
                if (score < bestScore) {
                    bestScore = score;
                    bestChoice = guess;
                }
            }
        }

        document.getElementById('codeToEnter').value = bestChoice.toString();
    }
}

function updateCounters() {
    document.getElementById('redCount').textContent = red.toString();
    document.getElementById('greenCount').textContent = green.toString();
}

function setRed(value) {
    console.log("setRed called with:", value);
    red = value;
    updateCounters();
    
    var buttons = document.querySelectorAll('.red-button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('selected');
    }
    document.getElementById('red' + value).classList.add('selected');
}

function setGreen(value) {
    console.log("setGreen called with:", value);
    green = value;
    updateCounters();
    
    var buttons = document.querySelectorAll('.green-button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('selected');
    }
    document.getElementById('green' + value).classList.add('selected');
}

function solveNext() {
    console.log("solveNext called");
    var countElement = document.getElementById('roundCount');
    var count = parseInt(countElement.textContent);
    count++;
    countElement.textContent = count.toString();

    var codeString = document.getElementById('codeToEnter').value;
    var usedCode = parseInt(codeString);

    game.solve(red, green, usedCode);
    
    red = 0;
    green = 0;
    updateCounters();
    
    var selected = document.querySelectorAll('.selected');
    for (var i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected');
    }
}

function restart() {
    console.log("restart called");
    game = new CodebreakerGame();
    red = 0;
    green = 0;
    document.getElementById('roundCount').textContent = '0';
    document.getElementById('codeToEnter').value = '1357';
    updateCounters();
    
    var selected = document.querySelectorAll('.selected');
    for (var i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected');
    }
}

function changeLanguage() {
    console.log("changeLanguage called");
    var select = document.getElementById('languageSelect');
    currentLanguage = select.value;
    
    var t = translations[currentLanguage];
    
    document.getElementById('title').textContent = t.title;
    document.getElementById('instructionsTitle').textContent = t.instructionsTitle;
    document.getElementById('instruction1').textContent = t.instruction1;
    document.getElementById('instruction2').textContent = t.instruction2;
    document.getElementById('instruction3').textContent = t.instruction3;
    document.getElementById('redLabel').textContent = t.redLabel;
    document.getElementById('greenLabel').textContent = t.greenLabel;
    document.getElementById('roundLabel').textContent = t.roundLabel;
    document.getElementById('codeLabel').textContent = t.codeLabel;
    document.getElementById('redButtonsLabel').textContent = t.redButtonsLabel;
    document.getElementById('greenButtonsLabel').textContent = t.greenButtonsLabel;
    
    document.getElementById('red0').textContent = t.red0;
    document.getElementById('red1').textContent = t.red1;
    document.getElementById('red2').textContent = t.red2;
    document.getElementById('red3').textContent = t.red3;
    document.getElementById('red4').textContent = t.red4;
    document.getElementById('green0').textContent = t.green0;
    document.getElementById('green1').textContent = t.green1;
    document.getElementById('green2').textContent = t.green2;
    document.getElementById('green3').textContent = t.green3;
    document.getElementById('solveButton').textContent = t.solveButton;
    document.getElementById('restartButton').textContent = t.restartButton;
}

window.onload = function() {
    console.log("Window loaded, initializing game...");
    game = new CodebreakerGame();
    updateCounters();
    console.log("Game ready!");
};