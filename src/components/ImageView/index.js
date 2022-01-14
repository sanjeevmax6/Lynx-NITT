import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import {NO_IMAGE_URL} from '../../utils/API_CONSTANTS';
const loadingImage = require('../../res/images/loadingImage.jpg');
export class ImageView extends Component {
  state = {
    image: NO_IMAGE_URL,
    style: {},
  };
  componentDidMount() {
    this.setState({image: this.props.src, style: this.props.style});
  }
  loadFallBack() {
    this.setState({...this.state, image: NO_IMAGE_URL});
  }
  render() {
    return (
      <Image
        defaultSource={loadingImage}
        source={{uri: this.state.image}}
        style={this.state.style}
        resizeMode={this.props.resizeMode}
        onError={() => {
          this.loadFallBack();
        }}
      />
    );
  }
}

export default ImageView;
