export function timeElapsed() {
    return {
        type: 'TIME_ELAPSED',
    };
}

export function shuffleCards() {
    return {
        type: 'SHUFFLE_CARDS',
    };
}

export function startGame() {
    return {
        type: 'START_GAME',
    };
}

export function flipCard( cardId ) {
    return {
        type: 'FLIP_CARD',
        payload: {
            cardId: cardId,
        }
    };
}

export function decideFate( cardId ) {
    return {
        type: 'DECIDE_FATE',
        payload: {
            cardId: cardId,
        }
    };
}

export function won( cardId ) {
    return {
        type: 'WON',
    };
}

export function lost( cardId ) {
    return {
        type: 'LOST',
    };
}