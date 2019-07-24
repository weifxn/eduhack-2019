import { Platform } from 'react-native'

const Header = Platform.select({
  ios: () => require('./picker.ios'),
  android: () => require('./picker.ios'),
  web: () => require('./picker.web'),
})();

export default Header.default