import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {observer} from 'mobx-react/native';
import {Body} from 'react-game-kit/native';
import {GLOBALS} from '../globals';
import PropTypes from 'prop-types';
import Matter from 'matter-js'
@observer
class Enemy extends Component {
  getPosition() {
    // this.posLeft = this.props.store.backgroundPosition - this.props.index;
    // console.log(this.props.index)
    // console.log(this.props.position.bottom)
    // this.props.store.background.position.x+this.props.position.left;
    // this.props.store.background.position.y-this.props.position.bottom
    return {
      left: this.props.store.background.position.x+this.props.position.left,
      bottom: this.props.store.background.position.y+this.props.position.bottom,

    }
  }
  static contextTypes = {
    loop: PropTypes.object,
  };

  update = () => {
    // tick logic
    // console.log(this.props.index)
    this.props.store.enemy[this.props.index].position.x = this.props.store.background.position.x+this.props.position.left;
    this.props.store.enemy[this.props.index].position.y = this.props.store.background.position.y-this.props.position.bottom
    // this.enemy.body.position=this.props.store.enemy[this.props.index].position
    // Matter.Body.setPosition(this.enemy.body, this.props.store.enemy[this.props.index].position)
    // console.log('x',this.props.store.enemy[this.props.index].position.x)
    // console.log('y',this.props.store.enemy[this.props.index].position.y)
  };

  componentDidMount() {
    this.context.loop.subscribe(this.update);
    this.props.store.enemy.push(
      {
        position: {
          x: this.props.store.background.position.x+this.props.position.left,
          y: this.props.store.background.position.y+this.props.position.bottom
        }
      }
    )
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
  }
  render() {
    return (
      <Body
        shape="rectangle"
        args={[
          this.props.store.background.position.x+this.props.position.left,
          this.props.store.background.position.y-this.props.position.bottom,
          100,
          100
        ]}
        friction={0}
        frictionStatic={0}
        restitution={0}
        ref={(b) => { this.enemy = b; }}
        >
        <View style={[this.getPosition(), styles.container]}>
          <Text>
            Enemy
          </Text>
        </View>
      </Body>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'red',
    position: 'absolute',
  },
});

module.exports = Enemy;
