import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
import App from '../components/App';
import initialState from '../initialState';
import Puzzle from '../components/Puzzle';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';

configure( { adapter: new Adapter() } );
const store = createStore( rootReducer, initialState, applyMiddleware( thunk ) );

/**
 * @link: https://reacttraining.com/react-router/web/api/withRouter
 * Create a new component that is "connected" (to borrow redux terminology) to the router.
 */
const AppWithRouter = withRouter( App );
describe( 'App integration test:', () => {
    const wrapper = mount(
        // to access updated match, location and history props ALL the application must be wrapped in BrowserRouter
        <Provider store={ store }>
            <BrowserRouter>
                <AppWithRouter />
            </BrowserRouter>
        </Provider>
    );

    it( 'app should display without crashing', () => {
        expect( wrapper ).toHaveLength( 1 );
    } );

    describe( 'user clicks `Start Game` button:', () => {
        const startGameButton = wrapper.find( 'button' ).first();
        startGameButton.simulate( 'click' );
        
        it( 'should start the game and display puzzle', () => {
            expect(
                wrapper.contains( <Puzzle /> )
            ).toBe( true );
        } );

        describe( 'assume that user lost the game:', () => {
            const AppComponent = wrapper.find( 'App' ).instance();
            AppComponent.props.lost();
            const gameStatus = AppComponent.props.gameStatus;

            it( 'the game should end', () => {
                expect(
                    gameStatus
                ).toBe( 'lost' );
            } );
        } );

        describe( 'again user clicks `Start Game` button:', () => {
            startGameButton.simulate( 'click' );
            
            it( 'should start the game and display puzzle', () => {
                expect(
                    wrapper.contains( <Puzzle /> )
                ).toBe( true );
            } );

            describe( 'assume that user won the game:', () => {
                const AppComponent = wrapper.find( 'App' ).instance();
                AppComponent.props.won();
                const gameStatus = AppComponent.props.gameStatus;

                it( 'the game should end', () => {
                    expect(
                        gameStatus
                    ).toBe( 'won' );
                } );
            } );
        } );
    } );
} );