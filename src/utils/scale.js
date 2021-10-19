import {Dimensions, PixelRatio} from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

// naren (test 1)
const width1 = 360.0;
const height1 = 672.0;

// ankur (test 2)
const width2 = 392.7;
const height2 = 737.1;

//sanjeev (test 3)
const width3 = 411.4;
const height3 = 860.9;

export const scaleFont = size => size * PixelRatio.getFontScale();
export const fontSize = size => size / PixelRatio.getFontScale();

// add your own functions to return the proportions

export const getWidth1 = width => Math.floor((width * screenWidth) / width1);
export const getHeight1 = height =>
  Math.floor((height * screenHeight) / height1);

export function getWidth3(width) {
  return Math.floor((width * screenWidth) / width3);
}
export function getWidth2(width) {
  return Math.floor((width * screenWidth) / width2);
}

export function getHeight3(height) {
  return Math.floor((height * screenHeight) / height3);
}

export function getHeight2(height) {
  return Math.floor((height * screenHeight) / height2);
}

export function getExactWidth3(width) {
  return (width * screenWidth) / width3;
}

export function getExactHeight3(height) {
  return (height * screenHeight) / height3;
}

export function scale(fontSize) {
  return getWidth2(fontSize) / PixelRatio.getFontScale();
}
