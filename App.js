import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import { Accelerometer, MapView, Marker } from 'expo'


export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      accelerometerData: {},
      jump: false,
      movement: 0,
      Power: false,
      defence: false,
      walk: true
    }
  }

  componentDidMount() {

    Accelerometer.addListener(accelerometerData => {
      {
        // console.log(accelerometerData, "*****");

        this.setState({ movement: accelerometerData.x * -300 })
      }
    })

  }

  jump() {
    this.setState({
      jump: true,
      walk: false,
      Power: false,
      defence: false

    })

    setTimeout(() => {
      this.setState({ jump: false, walk: true, Power: false, defence: false })
    }, 1500)
  }
  Power() {
    this.setState({
      Power: true,
      walk: false,
      jump: false,
      defence: false
    })

    setTimeout(() => {
      this.setState({ Power: false, walk: true, jump: false, defence: false })
    }, 2000)
  }
  defence() {
    this.setState({
      defence: true,
      walk: false,
      Power: false,
      jump: false
    })

    setTimeout(() => {
      this.setState({ defence: false, walk: true, Power: false, jump: false })
    }, 1500)
  }

  render() {
    const { jump, movement, Power, walk, defence } = this.state

    return (

      <View style={{ flex: 1 }}>
        <Text style={styles.heading}>Fighting</Text>
        <View style={{ flex: 1, height: 300, position: 'absolute', top: 170 }}>
          <Image source={require("./assets/bg.gif")} />

        </View>
        <View style={{ flex: 1, width: 300, position: 'absolute', top: 300, right: movement }}>
          {walk &&
            <View >
              <Image source={require("./assets/spidey-walk1.gif")} />
            </View>
          }
          {jump &&
            <View>
              <Image source={require("./assets/punch1.gif")} />
            </View>
          }
          {
            Power === true &&
            <View>
              <Image source={require("./assets/power1.gif")} />
            </View>
          }
          {
            defence &&
            <View>
              <Image source={require("./assets/defence.gif")} />
            </View>
          }
        </View>
        <View style={styles.container}>
          <Text style={styles.btn} onPress={() => this.jump()}>  Punch </Text>
          <Text style={styles.btn} onPress={() => this.Power()}>  Power</Text>
          <Text style={styles.btn} onPress={() => this.defence()}>Defence</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 400,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  btn: {
    backgroundColor: '#0080ff',
    height: 20,
    width: 65,
    alignItems: 'baseline',
    justifyContent: 'center',
    fontSize: 17,
    color: '#fff',
  },
  heading: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 60,
    fontSize: 50,
    fontWeight: 'bold',
    color: '#001a33',
    textAlign: 'center'
  }
});
