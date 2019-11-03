import React from 'react';
import { connect } from 'react-redux';
import { startGame } from '../actions/index';

class StartGameButton extends React.Component {
    render() {
        return (
            <p className="text-center">
                <button className="btn btn-lg btn-danger" onClick={ this.props.startGame }>Start Game</button>
            </p>
        );
    }
};

const mapStateToProps = ( state ) => {
    return {
        //
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        startGame: () => dispatch( startGame() ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( StartGameButton );