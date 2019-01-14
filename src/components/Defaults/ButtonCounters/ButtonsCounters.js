import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export const ButtonCounters = props =>{
    return(
        <View style={styles.buttonCounters}>

                    {/* FOR INCREMENT */}
                    <TouchableOpacity onPress={props.plusIT}>
                        <View style={props.type === 'home' ? styles.homeButtonPlus : styles.guestButtonPlus}>
                            <Text style={props.type === 'home' ? styles.homeButtonTextPlus : styles.guestButtonTextPlus }>+</Text>
                        </View>
                    </TouchableOpacity>

                    {/* FOR DECREMENT */}

                    <TouchableOpacity onPress={props.minusIT}>
                        <View style={props.type === 'home' ? styles.homeButtonMinus : styles.guestButtonMinus}>
                            <Text style={props.type === 'home' ? styles.homeButtonTextMinus :  styles.guestButtonTextMinus}>-</Text>
                        </View>
                    </TouchableOpacity>
        </View>
    )
}



const styles = StyleSheet.create({
    buttonCounters: {
        width: '10%',
        justifyContent:'center',
        backgroundColor: 'transparent'
    },
    homeButtonPlus: {
        backgroundColor: 'transparent',
        borderColor: '#ff0000',
        borderWidth: 2,
        justifyContent:'center',
        alignItems:'center',
        height:100
    },
    homeButtonTextPlus: {
        color: '#ff0000',
        fontSize: 20,
        fontWeight: 'bold',
    },
    homeButtonMinus: {
        backgroundColor: 'transparent',
        borderColor: '#ff0000',
        borderWidth: 2,
        justifyContent:'center',
        alignItems:'center',
        height:60
    },
    homeButtonTextMinus: {
        color: '#ff0000',
        fontSize: 20,
        fontWeight: 'bold'
    },

    guestButtonPlus: {
        backgroundColor: 'transparent',
        borderColor: '#ffffff',
        borderWidth: 2,
        justifyContent:'center',
        alignItems:'center',
        height:100
    },
    guestButtonTextPlus: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    guestButtonMinus: {
        backgroundColor: 'transparent',
        borderColor: '#ffffff',
        borderWidth: 2,
        justifyContent:'center',
        alignItems:'center',
        height:60
    },
    guestButtonTextMinus: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold'
    }



});
