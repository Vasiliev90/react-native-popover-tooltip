// @flow

import type {
  StyleObj,
} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import * as React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ViewPropTypes,
  Image
} from 'react-native';
import PropTypes from 'prop-types';

export type Label = string | () => React.Node;
export const labelPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.func,
]);

type Props = {
  onPress: (userCallback: () => void) => void,
  onPressUserCallback: () => void,
  label: Label,
  isActive: bool,
  multipleSelection: bool,
  containerStyle: ?StyleObj,
  labelStyle: ?StyleObj,
};
class PopoverTooltipItem extends React.PureComponent<Props> {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    onPressUserCallback: PropTypes.func.isRequired,
    label: labelPropType.isRequired,
    isActive: PropTypes.bool.isRequired,
    multipleSelection: PropTypes.bool,
    containerStyle: ViewPropTypes.style,
    labelStyle: Text.propTypes.style,
  };
  static defaultProps = {
    labelStyle: null,
    containerStyle: null,
  };

  render() {
    const label = typeof this.props.label === 'string'
      ? <Text style={[this.props.labelStyle, {marginLeft: 10}]}>{this.props.label}</Text>
      : this.props.label();

    const isActive = this.props.isActive

    return (
      <View style={[styles.itemContainer, this.props.containerStyle]}>
        <TouchableOpacity style={styles.itemInnerContainer} onPress={this.onPress}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {label}
          </View>
          {isActive && <Image source={this.props.selectedIcon} style={styles.selectedIcon}/>}
        </TouchableOpacity>
      </View>
    );
  }

  onPress = () => {
    this.props.onPress(this.props.onPressUserCallback);
  }

}

const styles = StyleSheet.create({
  itemContainer: {
    // padding: 15
  },
  itemInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15
  },
  selectedIcon: {
    resizeMode: 'contain',
    width: 15,
    height: 15,
  },
});

export default PopoverTooltipItem;
