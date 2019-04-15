import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import api from '../../services/api'

import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import styles from './styles'
import logo from '../../assets/logo.png'

export default class Home extends Component {
    state = {
        newBox: '',
    }

    async componentDidMount() {
        const box = await AsyncStorage.getItem('@Rocketbox:box')

        !!box && this.props.navigation.navigate('Box')
    }

    handleSignin = async () => {
        const response = await api.post('boxes', {
            title: this.state.newBox,
        })

        await AsyncStorage.setItem('@Rocketbox:box', response.data._id)

        this.props.navigation.navigate('Box')
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={logo} />
                <TextInput
                    style={styles.input}
                    placeholder={'Create a new Box'}
                    placeholderTextColor={'#999'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    underlineColorAndroid={'transparent'}
                    value={this.state.newBox}
                    onChangeText={text => this.setState({ newBox: text })}
                />
                <TouchableOpacity onPress={this.handleSignin} style={styles.button}>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
