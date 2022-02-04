const prompt = require('prompt-sync')({sigint: true});

//Global variables
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(twoDArray) {
        this._playField = twoDArray;
        this._playerX = Field.locatePlayerX(twoDArray);
        this._playerY = Field.locatePlayerY(twoDArray);
    }

    //Getters
    get playField() {
        return this._playField;
    }

    get playerX() {
        return this._playerX;
    }

    get playerY() {
        return this._playerY;
    }

    //Instance methods
    print() {
        const displayString = this.playField.map(function(row){
            return row.join('');
        }).join('\n');
        console.log(displayString);
    }

    move(playerDirection) {
        switch (playerDirection.toLowerCase()) {
            case 'n' || 'north':
                this._playerX--;
                break;
            case 'e' || 'east':
                this._playerY++;
                break;
            case 's' || 'south':
                this._playerX++;
                break;
            case 'w' || 'west':
                this._playerY--;
                break;
            default:
                console.log("Sorry, I can't seem to understand what you mean. \n Please enter a cardinal direction: n, e, s, or, w.")
        }
    }

    //Static methods
    static randNum() {
        return Math.floor(Math.random() * 9);
    }
    //Randomly generates and returns a 6x7 field with one and only one hat and one and only one starting location for the player
    static randField() {
        const blankField = [
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
        ]
        let hatCount = 0;
        let playerCount = 0;
        // Control flow
        const field = blankField.map(function(row){
            return row.map(function(square) {
                let i = Field.randNum();
                if (i < 4) {
                    return fieldCharacter;
                } else if (i === 5) {
                    return hole;
                } else if (i > 5 && i < 8 && hatCount === 0) {
                    hatCount++;
                    return hat;
                } else if (i > 7 && playerCount === 0) {
                    playerCount++;
                    return pathCharacter;
                } else {
                    return fieldCharacter;
                }
            })
        })
        // Ensures that field contains player and hat
        if (playerCount === 0) {
            field[0][0] = pathCharacter;
        }
        if (hatCount === 0) {
            field[7][4] = hat;
        }

        return field;
    }
    // Returns player location from field randomly generated with randField()
    static locatePlayerY(twoDArray) {
        for (let row of twoDArray) {
            if (row.includes(pathCharacter)) {
                return row.indexOf(pathCharacter);
            }
        }
    }

    static locatePlayerX(twoDArray) {
        for (let row of twoDArray) {
            if (row.includes(pathCharacter)) {
                return twoDArray.indexOf(row);
            }
        }
    }
}

function playGame() {
    let gameOn = true;
    const playSpace = new Field(Field.randField());
    console.log('Welcome to find your hat! \n Your path is marked by "*". \n Avoid holes "O" and move with cardinal directions "n", "s", etc to find your hat! \n Press ctrl+c to exit the game.')
    while (gameOn === true) {
        
        playSpace.print();
        const playerDirection = prompt('Which way?');
        playSpace.move(playerDirection);
        if(playSpace._playField[playSpace._playerX][playSpace._playerY] === hole || playSpace._playField[playSpace._playerX][playSpace._playerY] === undefined){
            console.log("You've fallen to your death! Try again.")
            gameOn = false;
        } else if(playSpace._playField[playSpace._playerX][playSpace._playerY] === hat) {
            console.log("You've found your hat!");
            gameOn = false;
        } else {
            playSpace._playField[playSpace._playerX][playSpace._playerY] = pathCharacter;
        }
    }
}

playGame();

