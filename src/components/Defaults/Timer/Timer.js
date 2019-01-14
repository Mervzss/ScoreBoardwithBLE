import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import moment from 'moment'

class Timer extends Component {

    isClick = false
    state ={
        time: 100,
    }


    countdownPress(){
        
        this.isClick = !this.isClick
        if(this.isClick && this.state.time > 0){}
        else{clearInterval(this._interval) 
            return} 
        this._interval = setInterval(() => {
            console.log('interval')
                this.setState({
                    time: this.state.time -1,
                    })
          }
          , 1000);
          console.log('end')
    }


      
    render() {
        

        return (
            <TouchableWithoutFeedback onPress = {this.countdownPress.bind(this)}>
            <Text style={styles.timertxt}>{this.state.time}</Text>
            </TouchableWithoutFeedback>
        )
    }
}

export default Timer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timertxt: {
        color: 'yellow',
        fontSize: 150,
        fontWeight: 'bold'
    },
})