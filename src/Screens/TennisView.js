import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, ToastAndroid } from 'react-native'
import Bluetooth from 'react-native-bluetooth-serial'

import { ButtonCounters } from '../components/Defaults'
let inc= 0
class TennisView extends Component {

    state = {
        homeScore: 0,
        guestScore: 0,
        isEnabled: true,
        isLoading: false,
        isPaired: true,
        discovering: false
    }


    points = {

        homePoint: 0,
        guestPoint: 0,
        quarterCounter: 1,
        quarter: '1st',

        setScore: []

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
            // let send = "0"
            // switch(inc){
            //     case 0:
            //     send = "1"
            //     return
            //     case 1:
            //     send = "2"
            //     return
            //     case 3:
            //     send = "3"
            //     return
            //     default:
            //     send = 9
                
            // }
            // inc++;
            
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

    setQuarter = (key) => {
        const setofQuarter = ['1st', '2nd', '3rd', '4th']

        return setofQuarter[key]
    }

    componentDidUpdate() {
        Bluetooth.write(this.state.homeScore.toString())
            .then((val) => console.log('PLUST IT', val))
        if (this.state.guestScore >= 24 && this.state.homeScore >= 24) {
            if (this.state.guestScore === this.state.homeScore) {
                alert("duece")
            }
            else if (this.state.guestScore > this.state.homeScore && (this.state.guestScore - this.state.homeScore) === 1) {
                alert("advantage guest")
            }
            else if (this.state.homeScore > this.state.guestScore && (this.state.homeScore - this.state.guestScore) === 1) {
                alert("advantage home")
            }
            else if (this.state.guestScore > this.state.homeScore && (this.state.guestScore - this.state.homeScore) === 1) {
                this.points.guestPoint = this.points.guestPoint + 1
                this.points.quarter = this.setQuarter(this.points.quarterCounter++)
                this.points.setScore.push(this.state.guestScore + '-' + this.state.homeScore)
            }
            else if (this.state.homeScore > this.state.guestScore && (this.state.homeScore - this.state.guestScore) === 2) {
                this.points.homePoint = this.points.homePoint + 1
                this.points.quarter = this.setQuarter(this.points.quarterCounter++)
                this.points.setScore.push(this.state.homeScore + '-' + this.state.guestScore)
            }
        }
        else {
            if (this.state.homeScore === 25) {
                this.points.homePoint = this.points.homePoint + 1
                this.points.quarter = this.setQuarter(this.points.quarterCounter++)
                this.points.setScore.push(this.state.homeScore + '-' + this.state.guestScore)
            }
            else if (this.state.guestScore === 25) {
                this.points.guestPoint = this.points.guestPoint + 1
                this.points.quarter = this.setQuarter(this.points.quarterCounter++)
                this.points.setScore.push(this.state.guestScore + '-' + this.state.homeScore)
            }
        }
    }


    render() {
        return (
            <View style={styles.container}>


                {/* THIS IS UPPER VIEW */}
                <View style={styles.upperView}>

                    <ButtonCounters type='home' plusIT={this.homeScoreRev.bind(this, 'plus')} minusIT={this.homeScoreRev.bind(this, 'minus')} />

                    <View style={styles.homeStyle}>
                        <Text style={styles.homeText}>HOME</Text>
                        <Text style={styles.numScoreHome}>{this.state.homeScore}</Text>
                    </View>


                    <View style={styles.middle}>
                        <Text style={styles.scoreset}>{this.points.homePoint}-{this.points.guestPoint}</Text>
                        <Text style={styles.scoremtch}>{this.points.quarter}</Text>
                    </View>


                    <View style={styles.guestStyle}>
                        <Text style={styles.guestText}>GUEST</Text>
                        <Text style={styles.numScoreGuest}>{this.state.guestScore}</Text>
                    </View>

                    <ButtonCounters type='guest' plusIT={this.guestScoreRev.bind(this, 'plus')} minusIT={this.guestScoreRev.bind(this, 'minus')} />


                </View>

                {/* THIS IS LOWER VIEW */}

                <View style={styles.lowerView}>
                    <View style={styles.setScoreStyle}>
                        <Text style={styles.setText}>SET 1</Text>
                        <Text style={styles.setText}>{this.points.setScore[0]}</Text>
                    </View>
                    <View style={styles.setScoreStyle}>
                        <Text style={styles.setText}>SET 2</Text>
                        <Text style={styles.setText}>{this.points.setScore[1]}</Text>
                    </View>
                    <View style={styles.setScoreStyle}>
                        <Text style={styles.setText}>SET 3</Text>
                        <Text style={styles.setText}>{this.points.setScore[2]}</Text>
                    </View>
                    <View style={styles.setScoreStyle}>
                        <Text style={styles.setText}>SET 4</Text>
                        <Text style={styles.setText}>{this.points.setScore[3]}</Text>
                    </View>

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

export default TennisView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        flexDirection: 'column',
        //   justifyContent:'space-evenly'
    },
    upperView: {
        flex: .8,
        backgroundColor: 'black',
        flexDirection: 'row',
    },
    lowerView: {
        flex: .2,
        backgroundColor: 'black',
        flexDirection: 'row',
    },
    homeStyle: {
        width: '30%',
        backgroundColor: 'black',
        alignItems: 'center'
    },
    guestStyle: {
        width: '30%',
        backgroundColor: 'black',
        alignItems: 'center'
    },
    middle: {
        width: '20%',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    setScoreStyle: {
        width: '25%',
        backgroundColor: 'black',
        alignItems: 'center'

    },

    // PARA SA TEXT
    homeText: {
        color: '#ff0000',
        fontSize: 35,
        fontWeight: 'bold'
    },
    guestText: {
        color: '#ffffff',
        fontSize: 35,
        fontWeight: 'bold'
    },
    numScoreHome: {
        color: '#ff0000',
        fontSize: 150,
        fontWeight: 'bold'
    },
    numScoreGuest: {
        color: '#ffffff',
        fontSize: 150,
        fontWeight: 'bold'
    },
    middleText: {
        fontSize: 40,
        color: 'yellow',
    },
    setText: {
        fontSize: 10,
        color: 'yellow',
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



});
