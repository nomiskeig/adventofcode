const fs = require('fs');

const HandKind = {
    FIVE: "FIVE",
    FOUR: "FOUR",
    FULL_HOUSE: "FULL_HOUSE",
    THREE: "THREE",
    TWO_PAIR: "TWO_PAIR",
    ONE_PAIR: "ONE_PAIR",
    HIGH_CARD: "HIGH_CARD"

}
const CardValue = {
    'A': 13,
    'K': 12,
    'Q': 11,
    'J': 10,
    'T': 9,
    '9': 8,
    '8': 7,
    '7': 6,
    '6': 5,
    '5': 4,
    '4': 3,
    '3': 2,
    '2': 1,
};
const CardValue2 = {
    'A': 14,
    'K': 13,
    'Q': 12,
    'J': 1,
    'T': 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2,
};

const part2 = true;
fs.readFile('data.txt', 'utf8', (err, data) => {
    let lines = data.split('\n').slice(0, -1);

    console.log(lines)
    let cards = []

    for (let line of lines) {
        cards.push(new Hand(line))

    }

    cards.sort(function(a, b) {
        //console.log(a.type, b.type)
        if (a.type == b.type) {
            for (let i = 0; i < a.cards.length; i++) {
                if (a.cards[i] != b.cards[i]) {
                    //console.log("returning " + result)
                    if (part2) {

                        return CardValue2[a.cards[i]] - CardValue2[b.cards[i]]
                    }
                    return CardValue[a.cards[i]] - CardValue[b.cards[i]]
                }

                //console.log("same")
                //console.log(a)
                //console.log(b)
                //console.log("end same")

            }
        }
        else {
        }
        if (a.type == HandKind.FIVE && b.type != HandKind.FIVE) {
            return 1
        }

        if (a.type == HandKind.FOUR && b.type != HandKind.FIVE && b.type != HandKind.FOUR) {
            return 1
        };
        if (a.type == HandKind.FULL_HOUSE && b.type != HandKind.FIVE && b.type != HandKind.FOUR && b.type != HandKind.FULL_HOUSE) {
            return 1
        }
        if (a.type == HandKind.THREE && b.type != HandKind.FIVE && b.type != HandKind.FULL_HOUSE && b.type != HandKind.FOUR && b.type != HandKind.THREE) {
            return 1
        }
        if (a.type == HandKind.TWO_PAIR && b.type != HandKind.FIVE && b.type != HandKind.FULL_HOUSE && b.type != HandKind.FOUR && b.type != HandKind.THREE && b.type != HandKind.TWO_PAIR) {
            return 1
        }
        if (a.type == HandKind.ONE_PAIR && b.type == HandKind.HIGH_CARD && b.type != HandKind.ONE_PAIR) {
            return 1
        }
        //console.log("returning -1: " + a.type + " " +  b.type)
        return -1;


    })

    //console.log(cards)
    for (let card of cards) {
        let joker = false;
        let amount = 0;
        for (let i = 0; i < card.cards.length; i++) {

            if (card.cards[i] == 'J') {
                amount++;
                joker = true;
            }
        }
        if (joker && amount >= 1) {
            //console.log(card)
        }
    }

    let result = 0;
    for (let i = 0; i < cards.length; i++) {
        result += cards[i].bid * (i + 1)
    }
    console.log(result)
})

class Hand {

    constructor(line) {
        this.cards = line.split(' ')[0].split('');
        this.bid = parseInt(line.split(' ')[1]);
        this.type = part2 ? this.getType(true) : this.getType(false);
        //this.oldType = this.getType(false)

    }
    getType(part2) {
        //part2 = false;
        let cards = {}
        for (let card of this.cards) {
            if (cards[card] == undefined) {
                cards[card] = 0
            }
            cards[card] += 1
        }
        let sortable = [];
        for (var key in cards) {
            sortable.push([key, cards[key]]);
        }
        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });
        //console.log(sortable)



        //console.log(value)
        //

        if (1 == 0) {
            let hasJoker = false;
            let jokerIndex = 0;
            let amountJokers = 0;
            for (const [key2, value2] of sortable) {
                if (key2 == 'J') {
                    hasJoker = true;
                    jokerIndex = sortable.indexOf([key2, value2])
                    amountJokers = value2;
                }
            }
            if (hasJoker) {
                sortable.splice(jokerIndex, 1)
                if (sortable.length > 0) {
                    sortable[0][1] += amountJokers;
                }
                else {
                    console.log("sortable" + sortable)
                    console.log(this.cards, this.bid)
                    sortable.push(['J', amountJokers])
                }
            }
        }
        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });

        let value = sortable[0][1];
        key = sortable[0][0];
        if (value == 5) {
            return HandKind.FIVE
        }
        if (value == 4) {
            if (part2) {
                for (const [key2, value2] of sortable) {
                    if (key2 == 'J') {
                        return HandKind.FIVE
                    }
                }
            }
            return HandKind.FOUR

        }
        if (value == 3) {
            let hasPair = false;
            for (const [key2, value2] of sortable) {
                if (value2 == 2) {
                    hasPair = true;
                }
            }
            if (hasPair) {
                if (part2) {
                    for (const [key2, value2] of sortable) {
                        if (key2 == 'J') {
                            return HandKind.FIVE
                        }
                    }
                }
                return HandKind.FULL_HOUSE

            } else {
                if (part2) {
                    for (const [key2, value2] of sortable) {
                        if (key2 == 'J') {
                            return HandKind.FOUR
                        }
                    }
                }
                return HandKind.THREE
            }

        }
        if (value == 2) {
            //console.log(this.cards)
            let hasOtherPair = false;
            for (const [key2, value2] of sortable) {
                if (value2 == 2 && key2 != key) {
                    hasOtherPair = true;
                }
            }
            if (!hasOtherPair) {
                if (part2) {
                    for (const [key2, value2] of sortable) {
                        if (key2 == 'J') {
                            return HandKind.THREE
                        }
                    }
                }
                return HandKind.ONE_PAIR
            } else {
                if (part2) {
                    for (const [key2, value2] of sortable) {
                        if (key2 == 'J' && value2 == 2) {
                            return HandKind.FOUR
                        }

                        if (key2 == 'J' && value2 == 1) {
                            return HandKind.FULL_HOUSE
                        }
                    }
                }
                return HandKind.TWO_PAIR

            }
        }

        if (part2) {
            for (const [key2, value2] of sortable) {
                if (key2 == 'J') {
                    //console.log("returning one pair")
                    //console.log(this.cards)
                    return HandKind.ONE_PAIR
                }
            }
        }
        //console.log("returning high card")
        return HandKind.HIGH_CARD

    }

}
