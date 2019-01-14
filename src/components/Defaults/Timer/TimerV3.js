import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import moment from 'moment'

class TimerV3 extends Component {

    constructor(props){
        super(props)
        this.state={
            interval: this.props.interval
        }
        this.click = false
    }

    // Start the Count
    startCount = () =>{
        console.log('Start Count')
        console.log(this.click)
        this._interval = setInterval(() => {
            console.log('interval')
                this.setState({
                    interval: this.state.interval - 100,
                    })
                    if(this.state.interval <= 0) clearInterval(this._interval)
          }
          , 100);
          this.click = ! this.click
    }
    
    // Stop the Count
    stopCount = () =>{
        console.log('Stop Count')
        console.log(this.click)
        clearInterval(this._interval)
        this.setState({})
        this.click = ! this.click
    }


    resetCount = () =>{

    }

    render() {
        const pad = (val) => val < 10 ? '0' + val:val 
        const duration = moment.duration(this.state.interval)
        return (
            <TouchableWithoutFeedback onPress={ this.click ? this.stopCount.bind(this) : this.startCount.bind(this)}>
                <Text style={styles.timertxt}>{pad(duration.seconds())}
                {/* ,{duration.milliseconds() / 10} */}
                </Text>
            </TouchableWithoutFeedback>
        )
    }
}

export default TimerV3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timertxt: {
        color: 'yellow',
        fontSize: 90,
        fontWeight: 'bold'
    },
})
