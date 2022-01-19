import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import {NO_IMAGE_URL} from '../../utils/API_CONSTANTS';
const loadingImage = require('../../res/images/loadingImage.jpg');
export class ImageView extends Component {
  state = {
    image: NO_IMAGE_URL,
  };
  componentDidMount() {
    this.setState({image: this.props.src});
  }
  loadFallBack() {
    this.props.resizeMode = 'cover';
    this.setState({...this.state, image: NO_IMAGE_URL});
  }
  componentWillUpdate(nextProps, nextStates) {
    nextStates.image = nextProps.src;
  }
  render() {
    return (
      <Image
        defaultSource={loadingImage}
        source={
          typeof this.state.image === 'string'
            ? {uri: this.state.image}
            : this.state.image
        }
        style={this.props.style}
        resizeMode={this.props.resizeMode}
        onError={() => {
          this.loadFallBack();
        }}
      />
    );
  }
}

export default ImageView;
