import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Header(props) {
	return (
		<View style={styles.header} {...props}>
			<Text style={styles.headerTitle}>{props.title}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#80ED99',
		width: '100%',
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerTitle: {
		fontSize: 20,
		color: 'black',
		textShadowColor: '#1C7947',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 1,
	},
});
