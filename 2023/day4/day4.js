const fs = require('fs');
fs.readFile('data.txt', 'utf8', (err, data) => {
    let lines = data.split('\n').slice(0, -1);

    let sum = 0;
    let cards = [];

    for (let line of lines) {
        let card = new Card(line);
        cards.push(card);
        if (card.amountWon != 0) {
            sum += Math.pow(2, card.amountWon - 1);
        }
    }
    console.log(sum)
    let didChange = true;
    while (didChange) {
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].accounted) {
                continue;
            }

            for (let j = i + 1; (j < i + 1 + cards[i].amountWon && j < cards.length); j++) {
                cards[j].copies += cards[i].copies;
            }
            cards[i].accounted = true;
            didChange = true;
        }
        didChange = false;

    }
    console.log(cards);
    let sum2 = 0;
    for (let card of cards) {
        sum2 += card.copies;
    }
    console.log(sum2)

})


class Card {


    index = 0;
    winning = [];
    owning = [];
    accounted = false;
    amountWon = 0;
    copies = 1;

    constructor(line) {
        this.accounted = false;
        this.amountWon = 0;

        let [name, cards] = line.split(': ');
        this.index = parseInt(name.split(' ')[1]);
        let winningString = cards.split('|')[0];
        if (winningString[0] == ' ') {
            winningString = winningString.slice(1);
        }

        let owningString = cards.split('|')[1];
        winningString.split(' ').slice(0, -1).forEach((card) => {
            if (card == '') {
            } else {
                this.winning.push(parseInt(card));
            }
        });
        owningString.split(' ').slice(1).forEach((card) => {
            if (card == '') {
            } else {

                this.owning.push(parseInt(card));
            }

        });
        for (let own of this.owning) {
            if (this.winning.includes(own)) {
                this.amountWon++;
            }
        }





    }

}
