import initialState from '../initialState';

/**
 * @link: https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
 */
function shuffle( array ) {
    for ( let i = array.length - 1; i > 0; i-- ) {
        const j = Math.floor( Math.random() * i );
        const temp = array[ i ];
        array[ i ] = array[ j ];
        array[ j ] = temp;
    }
}

function rootReducer( state = initialState, action ) {
    let newState = Object.assign( {}, state );
    switch ( action.type ) {
        case 'SHUFFLE_CARDS':
            shuffle( newState.cards );
            return newState;
        case 'START_GAME':
            newState = Object.assign( {}, initialState );
            newState.gameStatus = 'began';
            return newState;
        case 'TIME_ELAPSED':
            newState.hasTimeElapsed = true;
            return newState;
        case 'FLIP_CARD':
            if ( newState.cardPair.length === 2 ) {
                return newState;
            }
            newState.cards = newState.cards.map( ( card ) => ( card.id === action.payload.cardId ? Object.assign( {}, card, { hidden: ! card.hidden } ) : card ) );
            const filteredCards = newState.cards.filter( ( card ) => ( card.id === action.payload.cardId ) );
            if ( filteredCards[ 0 ].hidden === true ) {
                newState.cardPair = newState.cardPair.filter( ( card ) => ( card.id !== filteredCards[ 0 ].id ) );
            }
            /* ensure that cards are open and one card must not be added twice */
            if ( filteredCards[ 0 ].hidden === true || ( typeof undefined !== typeof newState.cardPair[ 0 ] && newState.cardPair[ 0 ].id === action.payload.cardId ) ) {
                return newState;
            }
            newState.cardPair = newState.cardPair.concat( filteredCards[ 0 ] );
            return newState;
        case 'DECIDE_FATE':
            if ( newState.cardPair.length === 2 ) {
                if ( newState.cardPair[ 0 ].face === newState.cardPair[ 1 ].face ) {
                    newState.cards = newState.cards.map( ( card ) => ( card.id === newState.cardPair[ 0 ].id || card.id === newState.cardPair[ 1 ].id ? Object.assign( {}, card, { outOfGame: true } ) : card ) );
                }
                newState.cards = newState.cards.map( ( card ) => ( Object.assign( {}, card, { hidden: true } ) ) );
                newState.cardPair = [];
            }
            return newState;
        case 'WON':
            newState.gameStatus = 'won';
            return newState;
        case 'LOST':
            newState.gameStatus = 'lost';
            return newState;
        default:
            return state;
    }
}

export default rootReducer;