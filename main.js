const prompt = require('prompt-sync')({sigint: true});

//Global variables
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(twoDArray) {
        this._playField = twoDArray;
        this._playerXY = Field.locatePlayer(twoDArray);
    }

    //Getters
    get playField() {
        return this._playField
    }

    get playerXY() {
        return this._playerXY
    }

    //Instance methods
    print() {
        console.log(this.playField.join(''));
    }

    //Static methods
    static randNum() {
        return Math.floor(Math.random() * 8);
    }
    //Randomly generates and returns a 4x7 field with one and only one hat and one and only one starting location for the player
    static randField() {
        const blankField = [
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
            ['', '', '', ''],
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
                } else if (i === 6 && hatCount === 0) {
                    hatCount++;
                    return hat;
                } else if (i > 6 && playerCount === 0) {
                    playerCount++;
                    return pathCharacter;
                } else {
                    return hole;
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
    static locatePlayer(twoDArray) {
        for (let row of twoDArray) {
            if (row.includes(pathCharacter)) {
                return [twoDArray.indexOf(row), row.indexOf(pathCharacter)]
            }
        }
    }
}



const playSpace = new Field(Field.randField());
console.log(playSpace);
console.log(typeof playSpace.playerXY);