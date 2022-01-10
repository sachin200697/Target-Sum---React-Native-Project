import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet, TouchableOpacity } from 'react-native';

export default function MainButton ( props ) {
	let disableStyle = {};
	if ( props.disable )
	{
		disableStyle = styles.isSelected
	}
	return (
		<TouchableOpacity onPress={props.onPress}>
			<View>
				<Text style={{ ...styles.buttonText, ...disableStyle }}>{props.children}</Text>	
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		
	},
	buttonText: {
		fontSize: 30,
		borderWidth: 1,
		padding: 15,
		margin: 15	,
		backgroundColor: '#7900FF',
		color: 'white',
		borderRadius:5,
	},
	isSelected: {
		opacity: 0.3,
	}
});
