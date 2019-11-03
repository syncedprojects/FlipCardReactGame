import uuid from 'uuid';

const initialState = {
    gameStatus: null, // won or lost
    hasTimeElapsed: false,
    cardPair: [],
    cards: [
        {
            'id': uuid.v4(),
            'face': 8,
            'hidden': true,
            'outOfGame': false,
        },
        {
            'id': uuid.v4(),
            'face': 1,
            'hidden': true,
            'outOfGame': false,
        },
        {
            'id': uuid.v4(),
            'face': 4,
            'hidden': true,
            'outOfGame': false,
        },
        {
            'id': uuid.v4(),
            'face': 6,
            'hidden': true,
            'outOfGame': false,
        },
        {
            'id': uuid.v4(),
            'face': 3,
            'hidden': true,
            'outOfGame': false,
        },
        {
            'id': uuid.v4(),
            'face': 8,
            'hidden': true,
            'outOfGame': false,
        },
        {
            'id': uuid.v4(),
            'face': 2,
            'hidden': true,
            'outOfGame': false,
        },
        {
            'id': uuid.v4(),
            'face': 4,
            'hidden': true,
            'outOfGame': false,
        },
        {
            'id': uuid.v4(),
            'face': 5,
            'hidden': true,
            'outOfGame': false,
        },
        {
            'id': uuid.v4(),
            'face': 2,
            'hidden': true,
            'outOfGame': false,
        },
        {
            'id': uuid.v4(),
            'face': 7,
            'hidden': true,
            'outOfGame': false,
        },
        {
            'id': uuid.v4(),
            'face': 1,
            'hidden': true,
            'outOfGame': false,
        },
        {
            'id': uuid.v4(),
            'face': 6,
            'hidden': true,
            'outOfGame': false,
        },
        {
            'id': uuid.v4(),
            'face': 3,
            'hidden': true,
            'outOfGame': false,
        },
        {
            'id': uuid.v4(),
            'face': 5,
            'hidden': true,
            'outOfGame': false,
        },
        {
            'id': uuid.v4(),
            'face': 7,
            'hidden': true,
            'outOfGame': false,
        },
    ],
};

export default initialState;