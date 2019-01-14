import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator, ToastAndroid } from 'react-native';
// import bluetooth from 'react-native-ble-manager'
import Icons from 'react-native-vector-icons/FontAwesome5'
import Bluetooth from 'react-native-bluetooth-serial'

class HomeView extends Component {

  state = {
    isEnabled: false,
    isLoading: true,
    isPaired: false,
    discovering: false
  }

  discovering(ble){
     //Find The ID of ScoreBoard
     let temp = []
     temp = ble.map((val) => val.id)
     if (!temp.includes("00:18:E4:34:E7:AF")) {
       //Connect the ScoreBoard
       this.setState({discovering: true})
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
     else{
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
    Bluetooth.on('error', (err) => console.log(`Error: ${err.message}`))
    Bluetooth.on('connectionLost', () => {
      this.setState({
        isLoading: true
      })
      ToastAndroid.show('interrupted connection,please reconnect', ToastAndroid.SHORT)
      this.initialized()
    })

    this.initialized()


    // Alert.alert(
    //   'Check Connection',
    //   // 'My Alert Msg',
    //   [
    //     {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
    //     {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    //     {text: 'OK', onPress: () => console.log('OK Pressed')},
    //   ],
    //   { cancelable: false }
    // )

    //scan device
  }

  render() {
    return (
      <View style={styles.container}>


        <View style={styles.btn}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Tennis')}>
            <View style={styles.iconStyle}>
              <Icons name={'table-tennis'} size={80} color='green' />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('BasketBall')}>
            <View style={styles.iconStyle}>
              <Icons name={'basketball-ball'} size={80} color='green' />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('VolleyBall')}>
            <View style={styles.iconStyle}>
              <Icons name={'volleyball-ball'} size={80} color='green' />
            </View>
          </TouchableOpacity>
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

export default HomeView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  btn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  iconStyle: {
    width: 160,
    height: 160,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black'
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
