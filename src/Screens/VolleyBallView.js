import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ButtonCounters } from "../components/Defaults"

class VolleyBallView extends Component {
    state = {
        homeScore: 0,
        guestScore: 0
    }


    points = {

        homePoint: 0,
        guestPoint: 0,
        quarterCounter: 1,
        quarter: '1st',

        setScore: []

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

    setQuarter = (key) => {
        const setofQuarter = ['1st', '2nd', '3rd', '4th']

        return setofQuarter[key]
    }

    componentDidUpdate() {
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
                {/* //UPPER */}
                <View style={styles.Upper}>
                    <ButtonCounters type='home' plusIT={this.homeScoreRev.bind(this, 'plus')} minusIT={this.homeScoreRev.bind(this, 'minus')} />
                    <View style={styles.gueststyle}>
                        <View style={styles.guest}>
                            <Text style={styles.guesttxt}>HOME</Text>
                        </View>
                        <View style={styles.guestscr}>
                            <Text style={styles.guestscrtxt}>{this.state.homeScore}</Text>
                        </View>
                    </View>
                    <View style={styles.midstyle}>
                        <Text style={styles.scoreset}>{this.points.homePoint}-{this.points.guestPoint}</Text>
                        <Text style={styles.scoremtch}>{this.points.quarter}</Text>
                    </View>
                    <View style={styles.homestyle}>
                        <View style={styles.home}>
                            <Text style={styles.hometxt}>GUEST </Text>
                        </View>
                        <View style={styles.homescr}>
                            <Text style={styles.homescrtxt}>{this.state.guestScore}</Text>
                        </View>
                    </View>
                    <ButtonCounters type='guest' plusIT={this.guestScoreRev.bind(this, 'plus')} minusIT={this.guestScoreRev.bind(this, 'minus')} />
                </View>

                {/* LOWER */}
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
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "pink",
        flex: 1
    },
    Upper: {
        backgroundColor: "black",
        flex: .8,
        flexDirection: 'row'
    },
    //HOME
    homestyle: {
        width: "30%",
        backgroundColor: "black",
        alignItems: 'center'
    },
    home: {
    },
    //MID
    midstyle: {
        width: "20%",
        backgroundColor: "black",
        alignItems: 'center'
    },
    //GUEST
    gueststyle: {
        width: "30%",
        backgroundColor: "black",
        alignItems: "center"
    },
    guest: {
    },
    //LOWER
    lowerView: {
        flex: .2,
        backgroundColor: 'black',
        flexDirection: 'row',
    },
    setScoreStyle: {
        width: '25%',
        backgroundColor: 'black',
        alignItems: 'center'
    },
    //TEXT
    guesttxt: {
        color: 'red',
        fontSize: 35,
        fontWeight: 'bold'
    },
    guestscrtxt: {
        color: 'red',
        fontSize: 150,
        fontWeight: 'bold'
    },
    hometxt: {
        color: '#ffffff',
        fontSize: 35,
        fontWeight: 'bold'
    },
    homescrtxt: {
        color: '#ffffff',
        fontSize: 150,
        fontWeight: 'bold'
    },
    scoreset: {
        color: 'yellow',
        fontSize: 35,
        fontWeight: 'bold'
    },
    setText: {
        color: 'yellow',
        fontSize: 10,
        fontWeight: 'bold'
    },
    scoremtch: {
        color: 'yellow',
        fontSize: 35,
        fontWeight: 'bold'
    }

})
export default VolleyBallView;