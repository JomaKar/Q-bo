import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Image, Text} from 'react-native';


class AccountsView extends Component{
	constructor(props){
		super(props);
		this.availableAccounts = this.availableAccounts.bind(this);
		this.internalClick = this.internalClick.bind(this);
	}

	internalClick(accountSelected){
		(accountSelected) ? this.props.onSelection(accountSelected) : this.props.onSelection({});
	}

	availableAccounts(){
		return this.props.accounts.map(acc => <TouchableOpacity style={styles.accountItm} onPress={() =>  this.internalClick(acc)} key={acc.keyId}>
					<Image style={styles.profileImg} source={require('../../../../assets/images/avatar.png')} resizeMode="cover" />
					<View style={styles.infoWrapper}>
						<Text style={styles.textName}>
							{acc.name}
						</Text>
						<Text style={styles.lastSession}>
							Último inicio: {acc.lastSession || 'Ayer'}
						</Text>
					</View>
				</TouchableOpacity>
		);
	}

	render(){ 

		return (
			<ScrollView style={styles.scrollView}>
				{this.availableAccounts()}
				<TouchableOpacity style={styles.accountItm} onPress={() => this.internalClick(null)}>
					<Image style={styles.profileImg} source={require('../../../../assets/images/avatar.png')} resizeMode="cover" />
					<View style={styles.infoWrapper}>
						<Text style={styles.textName}>
							Iniciar con otra cuenta
						</Text>
					</View>
				</TouchableOpacity>
			</ScrollView>
		);
	}
};

const styles = {
	scrollView: {
		backgroundColor: 'white',
		width: '100%',
		height: 222,
		padding: 18
	},
	accountItm: {
		flex: 1,
		height: 105,
		flexDirection: 'row',
		paddingBottom: 18,
		paddingTop: 17,
		borderBottomWidth: 1,
		borderColor: '#eee',
		paddingLeft: 10,
		paddingRight: 10
	},
	profileImg: {
		width: 70,
		height: 70,
		borderRadius: 35,
		marginRight: 15
	},
	infoWrapper: {
		height: 70,
		width: 145,
		justifyContent: 'center',
		alignItems: 'flex-start',
		flexDirection: 'column'
	},
	textName: {
		fontSize: 18,
		fontWeight: '600',
		marginBottom: 6,
		width: '100%',
		color: 'black'
	},
	lastSession: {
		fontSize: 12,
		fontWeight: '100',
		color: 'black'
	}
}

export default AccountsView;