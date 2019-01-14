import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, ToastAndroid } from 'react-native'
import { ButtonCounters } from "../components/Defaults"
import Bluetooth from 'react-native-bluetooth-serial'
// import Timer from '../components/Defaults/Timer/Timer'
import TimerV2 from '../components/Defaults/Timer/TimerV2'
import TimerV3 from '../components/Defaults/Timer/TimerV3'

const minute = 60000
const second = 1000
const DefaultTimer = minute * 12
class BasketBallView extends Component {
    state = {
        homeScore: 0,
        guestScore: 0,
        isEnabled: true,
        isLoading: false,
        isPaired: true,
        discovering: false
    }

    discovering(ble) {
        //Find The ID of ScoreBoard
        let temp = []
        temp = ble.map((val) => val.id)
        if (!temp.includes("00:18:E4:34:E7:AF")) {
            //Connect the ScoreBoard
            this.setState({ discovering: true })
            Bluetooth.discoverUnpairedDevices()
                .then((ble) => {
                    ToastAndroid.show('Device Discovered', ToastAndroid.SHORT)
                    console.log("discovered Devices", ble)
                    Bluetooth.connect("00:18:E4:34:E7:AF")
                        .then((ble) => {
                            console.log('connected', ble)
                            ToastAndroid.show('Device Connected', ToastAndroid.SHORT)
                            this.setState({
                                isLoading: false
                            })
                        })
                })
        }
        else {
            Bluetooth.connect("00:18:E4:34:E7:AF")
                .then((ble) => {
                    ToastAndroid.show('Device Connected', ToastAndroid.SHORT)
                    console.log('connected', ble)
                    this.setState({
                        isLoading: false
                    })
                })
        }
    }

    initialized() {

        if (this.state.isEnabled === false) {
            //Check if Enable
            Bluetooth.requestEnable()
                .then((ble) => {
                    console.log(ble)
                    // List Paired Device
                    Bluetooth.list()
                        .then((ble) => {
                            this.discovering(ble)

                        })
                        .catch((err) => {
                            ToastAndroid.show('List Error', ToastAndroid.SHORT)
                            console.log(err)
                        })

                })

        }
        else {
            this.discovering
        }

        console.log("check connection")
    }

    componentDidMount() {
        Bluetooth.on('bluetoothEnabled', () => this.setState({ isEnabled: true }))
        Bluetooth.on('bluetoothDisabled', () => {
            this.setState({ isEnabled: false })
        })
        Bluetooth.on('connectionSuccess', () => {
            this.setState({
                isLoading: false
            })
         })

        Bluetooth.on('connectionLost', () => {
            this.setState({
                isLoading: true
            })
            ToastAndroid.show('interrupted connection,please reconnect', ToastAndroid.SHORT)
            this.initialized()
        })
    }

    homeScoreRev = (val) => {
        if (val === 'plus') {
            this.setState({
                homeScore: this.state.homeScore + 1
            })
        }
        else if (val === 'minus') {
            if (this.state.homeScore === 0) {
                alert('ZERO NA PO')
            }
            else {
                this.setState({
                    homeScore: this.state.homeScore - 1
                })
            }

        }
    }

    guestScoreRev = (val) => {
        if (val === 'plus') {
            this.setState({
                guestScore: this.state.guestScore + 1
            })
        }
        else if (val === 'minus') {
            if (this.state.guestScore === 0) {
                alert('ZERO NA PO')
            }
            else {
                this.setState({
                    guestScore: this.state.guestScore - 1
                })
            }

        }
    }

    AddMinute = () =>{
        console.log(this.Timer)
        this.Timer.setState({interval: this.Timer.state.interval + minute })
    }

    MinMinute = () =>{
        if(this.Timer.state.interval < minute) return
        this.Timer.setState({interval:  this.Timer.state.interval - minute })
    }

    AddSecond = () =>{
        this.Timer.setState({interval: this.Timer.state.interval + second })
    }

    MinSecond = () =>{
        if(this.Timer.state.interval <= 0) return
        this.Timer.setState({interval: this.Timer.state.interval - second })
        
    }

    componentDidUpdate(){
        console.log('CHECK INTERVAL',this.Timer.state.interval)
        Bluetooth.write(this.state.guestScore.toString())
        .then((val) => console.log(val))
    }




    render() {
        console.log('time in minutes', this.state.timeMinutes)
        return (
            <View style={styles.container}>
                {/* uppper */}
                <View style={styles.upperview}>
                    <ButtonCounters type='home' plusIT={this.AddMinute.bind(this)} minusIT={this.MinMinute.bind(this)} />
                    <TimerV2 interval={60000} ref = { c => this.Timer = c}/>
                    <ButtonCounters type='home' plusIT={this.AddSecond.bind(this)} minusIT={this.MinSecond.bind(this)} />
                </View>
                {/* LOWER */}
                <View style={styles.lowerView}>
                    <ButtonCounters type='home' plusIT={this.homeScoreRev.bind(this,'plus')} minusIT={this.homeScoreRev.bind(this,'minus')} />
                    <View style={styles.gueststyle}>
                        <Text style={styles.guesttxt}>HOME</Text>
                        <Text style={styles.guesscrttxt}>{this.state.homeScore}</Text>
                    </View>
                    <View style={styles.midstyle}>
                        <Text style={styles.scoreset}>2nd</Text>
                        <TimerV3 interval={25000} ref = { c => this.Timer = c}/>
                    </View>
                    <View style={styles.homestyle}>
                        <Text style={styles.hometxt}>GUEST</Text>
                        <Text style={styles.homescrtxt}>{this.state.guestScore}</Text>
                    </View>
                    <ButtonCounters type='guest' plusIT={this.guestScoreRev.bind(this,'plus')} minusIT={this.guestScoreRev.bind(this,'minus')} />
                </View>
                {
                    this.state.isLoading
                    &&
                    <View style={styles.loading}>
                        <Text style={{ color: "white", fontSize: 20 }}>WAITING TO CONNECT</Text>
                        <ActivityIndicator size={80} color="green" />
                    </View>


                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    //upper
    upperview: {
        flex: .5,
        backgroundColor: "black",
        alignItems: "center",
        flexDirection:'row',
        justifyContent:'space-between'
    },
    //MID
    midstyle: {
        width: "20%",
        backgroundColor: "black",
        alignItems: 'center'
    },
    // lower
    lowerView: {
        flex: .5,
        backgroundColor: "black",
        flexDirection: "row",
    },
    gueststyle: {
        width: "30%",
        backgroundColor: "black",
        alignItems: 'center'
    },
    homestyle: {
        width: "30%",
        backgroundColor: "black",
        alignItems: 'center'
    },
    //text
    hometxt: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold'
    },
    homescrtxt:{
        color: 'white',
        fontSize: 80,
        fontWeight: 'bold'
    },
    guesscrttxt:{
        color: 'red',
        fontSize: 80,
        fontWeight: 'bold'
    },
    guesttxt: {
        color: 'red',
        fontSize: 50,
        fontWeight: 'bold'
    },
    timertxt: {
        color: 'yellow',
        fontSize: 150,
        fontWeight: 'bold'
    },
    scoreset: {
        color: 'yellow',
        fontSize: 50,
        fontWeight: 'bold'
    },
    shotclock:{ 
        color: 'yellow',
        fontSize: 80,
        fontWeight: 'bold'
    },
    loading: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,.8)',
      }


})
export default BasketBallView;