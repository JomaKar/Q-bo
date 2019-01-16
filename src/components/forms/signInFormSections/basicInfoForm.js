import React from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text} from 'react-native';

import { FieldInput } from '../../common';


const BasicInfoForm = ({ onFilling, account }) => {

	const internalClick = (accountSelected) => onSelection(accountSelected);

	const fillingMail = text => {
		account.email = text.toLowerCase();
		onFilling(account);
	}

	const fillingPassword = pass => { 
		account.password = pass.toLowerCase();
		onFilling(account);
	}

	return (
		<View style={styles.formWrapper}>
			<FieldInput label="Correo electrónico" placeholder="email" callback={fillingMail} value={account.email} hideText={false} />
			<FieldInput label="Contraseña" placeholder="password" callback={fillingPassword} value={account.password} hideText={true} />
		</View>
	);
};

const styles = {
	formWrapper: {
		width: '100%',
		padding: 18
	}
}

export default BasicInfoForm;