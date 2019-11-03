import React from 'react';
import { connect } from 'react-redux';
import { shuffleCards, flipCard, decideFate } from '../actions/index';

class Puzzle extends React.Component {
    constructor( props ) {
        super( props );

        this.onCardClick = this.onCardClick.bind( this );

        this.props.shuffleCards();
    }

    onCardClick( cardId ) {
        this.props.flipCard( cardId );
        setTimeout( () => {
            this.props.decideFate( cardId );
        }, 250 );
    }

    render() {
        return (
            <div className="d-flex justify-content-between flex-wrap">
                {
                    this.props.cards.map( ( item, index ) => (
                        <React.Fragment key={ index }>
                        {
                            ( item.outOfGame === true ) ?
                                <div className="mt-3" style={ { 'width': '70px', 'height': '70px' } }></div>
                                :
                                <div className="card mt-3" onClick={ () => this.onCardClick( item.id ) }>
                                    <div className="card-body text-center">
                                        { item.hidden === true ? '' : item.face }
                                    </div>
                                </div>
                        }
                        </React.Fragment>
                    ) )
                }
            </div>
        );
    }
};

const mapStateToProps = ( state ) => {
    return {
        cards: state.cards,
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        shuffleCards: () => ( dispatch( shuffleCards() ) ),
        flipCard: ( cardId ) => dispatch( flipCard( cardId ) ),
        decideFate: ( cardId ) => dispatch( decideFate( cardId ) ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Puzzle );