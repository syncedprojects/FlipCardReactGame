import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StartGameButton from './StartGameButton';
import ProgressBar from './ProgressBar';
import Puzzle from './Puzzle';
import { won, lost } from '../actions/index';

class App extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };

    componentDidUpdate( prevProps, prevState ) {
        if ( this.props.cards.filter( ( card ) => ( card.outOfGame === false ) ).length === 0 && this.props.hasTimeElapsed === false ) {
            this.props.won();
        }
        if ( this.props.cards.filter( ( card ) => ( card.outOfGame === false ) ).length !== 0 && this.props.hasTimeElapsed === true ) {
            this.props.lost();
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div id="app-container" className="pt-5 pb-5 m-auto">
                            {
                                ( this.props.gameStatus === null && this.props.hasTimeElapsed === false ) ?
                                    <StartGameButton />
                                    :
                                    null
                            }
                            {
                                ( this.props.gameStatus === 'began' && this.props.hasTimeElapsed === false ) ?
                                    <div>
                                        <ProgressBar />
                                        <Puzzle />
                                    </div>
                                    :
                                    null
                            }
                            {
                                ( this.props.gameStatus === 'won' ) ?
                                    <div>
                                        <h4 className="text-center mb-4 text-success"><span role="img" aria-label="smiley">&#128578;</span> { `Congratulations, you won the game!` }</h4>
                                        <StartGameButton />
                                    </div>
                                    :
                                    null
                            }
                            {
                                ( this.props.gameStatus === 'lost' ) ?
                                    <div>
                                        <h4 className="text-center mb-4 text-danger"><span role="img" aria-label="smiley">&#128580;</span> { `You're out of time, but you can try again!` }</h4>
                                        <StartGameButton />
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = ( state ) => {
    return {
        gameStatus: state.gameStatus,
        hasTimeElapsed: state.hasTimeElapsed,
        cards: state.cards,
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        won: () => ( dispatch( won() ) ),
        lost: () => ( dispatch( lost() ) ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( App );