import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';
import Proptypes from 'prop-types'; // to define the type of props
import MainButton from '../MainButton';

export default function Game ( props ) {
	// maintaining auto width of device
	const [deviceWidth, setDeviceWidth] = useState(
		Dimensions.get( 'window' ).width,
	);

	useEffect( () => {
		let dimentionsEventListener = Dimensions.addEventListener( 'change', () =>
			setDeviceWidth( Dimensions.get( 'window' ).width ),
		);
		return () => {
			// dimentionsEventListener.remove();
		};
	}, [Dimensions] );

	// we need to use randomNumbers as state because if the components rerenders (when user press buttens then
	// selected state will change that causes rerender) then randomNumbers remains same 
	// so if we do not use state then every time component rerenders then randomNumbers will automatically regenerated.
	const [randomNumbers, setRandomNumbers] = useState( Array.from( { length: props.randomNumberCount } ).map(
		() => 10 + Math.floor( 40 * Math.random() ) )
	);
	const target = randomNumbers
		.slice( 0, props.randomNumberCount - 2 )
		.reduce( ( sum, current ) => sum + current, 0 );
	
	const [selected, setSelected] = useState( [] );
	const onSelected = ( index ) => {
		console.log( selected, isSelected( index ) );
		if ( !isSelected( index ) && calculateGameStatus() === 'PLAY' )
			setSelected( [...selected, index] );
	}
	const isSelected = ( index ) => {
		return selected.indexOf( index ) >= 0;
	}
	const [remainingSeconds, setRemainingSeconds] = useState( props.initialSeconds );
	useEffect( () => {
		const intervalId = setInterval(
			() => {
				if ( remainingSeconds === 0 )
				{
					clearInterval( intervalId )
					calculateGameStatus()
					return
				}
				setRemainingSeconds(remainingSeconds-1)
			},
			1000
		)
		return () => {
			clearInterval( intervalId );
		}
	})
	

	
	// game status 
	const [gameStatus, setGameStatus] = useState( 'PLAY' )
	const calculateGameStatus = () => {
		let sum = 0;
		sum = selected.reduce( ( total, element ) => total + randomNumbers[element], 0 )
		
		if ( sum > target || remainingSeconds===0 ) return 'OVER'
		if ( sum < target ) return 'PLAY';
		if ( sum === target ) return 'WIN';
	}

	///we can also implement this functionlality (useEffect) using 
	/*
		componentWillUpdate(nextProp, nextState){
			if(nextState.selected !== this.state.selected || nextState.remainingSeconds===0){
				calsulateGameState(nextState.selected)	//
			}
		}

	*/
	useEffect(() => {
		setGameStatus( calculateGameStatus )		
	}, [selected, remainingSeconds])
	const renderRandomNumbers = () => {
		return randomNumbers.map( ( number, index ) => {
			return <MainButton key={index} disable={isSelected( index ) || gameStatus !== 'PLAY'} onPress={() => onSelected( index )}>{number}</MainButton>;
		} );
	};

	// adding a timer to finish the game,
	// example of componentDidMount
	const styles = StyleSheet.create({
		sumContainer: {
			width: 50,
			borderWidth: 2,
			marginVertical: 30,
			height: 50,
			alignItems: 'center',
			justifyContent: 'center',
			marginHorizontal: deviceWidth / 2 - 25,
			backgroundColor: 'rgba(144,144,144, 0.3)',
			borderRadius: 5,
		},
		sumText: {
			fontSize: 17,
		},
		buttonContainerView: {
			// flex: 1,
			alignItems: 'center',
		},
		buttonContainer: {
			width: deviceWidth * 0.7,
			flexDirection: 'row',
			flexWrap: 'wrap',
			// borderTopWidth: 1,
			alignItems: 'center',
			justifyContent: 'space-around',
		},
		GAME_PLAY: {
			backgroundColor:'rgba(144,144,144, 0.3)' 
		},
		GAME_WIN: {
			backgroundColor: 'green',
		},
		GAME_OVER: {
			backgroundColor: 'red',
		},
		timeLeftView: {
			marginVertical: 10,
			alignItems: 'center',
		},
		timeLeftViewText: {
			fontSize: 20,
			color: 'red',
		},
		button: {
			padding: 20,
			fontSize: 20,
			marginVertical: 20
		}
	});

	return (
		<View>
			<View style={{...styles.sumContainer, ...styles[`GAME_${gameStatus}`] }}>
				<Text style={styles.sumText}>{target}</Text>
			</View>
			<View style={styles.buttonContainerView}>
				<View style={styles.buttonContainer}>{renderRandomNumbers()}</View>
			</View>
			<View style={styles.timeLeftView}>
				<Text style={styles.timeLeftViewText}>{`Time Left: ${remainingSeconds}`}</Text>
			</View>

			<View style={{...styles.buttonContainer, width: '100%'}}>
				{gameStatus !== 'PLAY' && <Button title='Play Again' onPress={props.onResetGame} />}
			</View>
		</View>
	);
}

//every react component has a propTypes property that refets to the original props
Game.propTypes = {
	randomNumberCount: Proptypes.number.isRequired, // to insure that randomNumberCount should be a number
};

/*
Game : We have a sum target and some random numbers. From these random numbers a player need to choose the 
numbers that will generate sum equal to the target.

Game Login: We will generate an array of random numbers and then will take sum of some numbers form this array.
This sum is our target.


Play Again: To provide this functionality, we need to reset all the states but it is teadious as there are may
state maintain in the game.
So instead of resetting all the states, we can simply re-render the component and to do this:
first give a key prop and resetKey prop to Game component, and when we need to restart the game then we will
simply execute resetKey function. This resetKey function will change the key by increasing 1. Now key has 
changed so react will think that this is new component, so it will rerender it.



*/
