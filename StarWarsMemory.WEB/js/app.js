var memorywars = angular.module('memorywars', []);




memorywars.factory('memory', function () {

        var cardnames = ['boba', 'c3po', 'chewy', 'emperor', 'ewok', 'greedo',
    'han', 'jabba', 'leia', 'luke'];

    return new Memory(cardnames);
});

memorywars.controller('GameController', function GameController($scope, memory) {
    $scope.memory = memory;
});

function Card(name) {
    this.name = name;
    this.flipped = false;
}

Card.prototype.flip = function () {
    this.flipped = !this.flipped;
}

function Memory(cardnames) {
    var cards = createCards(cardnames);
    this.grid = makeGrid(cards);
    this.remaining = cardnames.length;

    this.flipCard = function (card) {
        if (card.flipped) {
            return;
        }

        card.flip();

        if (!this.first || this.second) {

            if (this.second) {
                this.first.flip();
                this.second.flip();
                this.first = this.second = undefined;
            }

            this.first = card;

        } else {

            if (this.first.name === card.name) {
                this.remaining--;
                this.first = this.second = undefined;
                if (this.remaining === 0) { alert('You win! The force is strong with you.'); }
            } else {
                this.second = card;
            }
        }
    }
}




function createCards(cardnames) {
    var cards = [];
    cardnames.forEach(function (name) {
        cards.push(new Card(name));
        cards.push(new Card(name));
    });

    return cards;
}

function removeCard(cards) {
    var i = Math.floor(Math.random() * cards.length);
    return cards.splice(i, 1)[0];
}


function makeGrid(cards) {
    var gridDimension = Math.sqrt(cards.length),
        grid = [];

    for (var row = 0; row < gridDimension; row++) {
        grid[row] = [];
        for (var col = 0; col < gridDimension; col++) {
            grid[row][col] = removeCard(cards);
        }
    }

    return grid;
}

