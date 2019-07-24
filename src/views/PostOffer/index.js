import { Platform } from 'react-native'

const Header = Platform.select({
  ios: () => require('./post.ios'),
  android: () => require('./post.ios'),
  web: () => require('./post.web'),
})();

export default Header.default