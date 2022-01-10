import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import Game from './components/screens/Game';
import { useState } from 'react';

export default function App () {
	const [key, setKey] = useState( 1 )	
	const onResetGame = () => {
		setKey( key + 1 );
	}
	return (
		<View style={styles.screen}>
			<Header title='Target Sum' />
			<Game randomNumberCount={6} initialSeconds={10} key={key} onResetGame={onResetGame}/>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});
