import React from 'react';
import { connect } from 'react-redux';
import { timeElapsed } from '../actions/index';

class ProgressBar extends React.Component {
    constructor( props ) {
        super( props );

        this.interval = null;
        this.intervalMilliseconds = 500;
        this.progressStep = 1;
        this.maxProgress = 60;
        this.additionalProgress = parseInt( 1000 / this.intervalMilliseconds );

        this.state = {
            currentProgress: 0,
        };
    }

    componentDidMount() {
        this.interval = setInterval( () => (
            this.setState( ( prevState ) => {
                return {
                    currentProgress: prevState.currentProgress + this.progressStep,
                };
            } )
        ), this.intervalMilliseconds );
    }

    componentDidUpdate( prevProps, prevState ) {
        if ( prevState.currentProgress > this.maxProgress + this.additionalProgress ) {
            clearInterval( this.interval );
            this.props.timeElapsed();
        }
    }

    componentWillUnmount() {
        clearInterval( this.interval );
    }

    render() {
        const ariaValueNow = this.maxProgress - this.state.currentProgress;
        const width = parseInt( ( this.state.currentProgress / this.maxProgress ) * 100 );

        return (
            <div className="progress progress-striped active">
                <div className="progress-bar progress-bar-success bg-danger"
                    role="progressbar"
                    aria-valuemax={ this.maxProgress }
                    aria-valuemin={ 0 }
                    aria-valuenow={ ariaValueNow }
                    style={ { 'width': width + '%' } }></div>
            </div>
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
        timeElapsed: () => dispatch( timeElapsed() ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( ProgressBar );