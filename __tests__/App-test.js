/**
 * @format
 */

import 'react-native';
import React from 'react';
import FeedScreen from '../src/screens/FeedScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Feed renders correctly', () => {
  renderer.create(<FeedScreen />);
});
