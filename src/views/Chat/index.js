import { Platform } from 'react-native'

const Header = Platform.select({
  ios: () => require('./chat.ios'),
  android: () => require('./chat.ios'),
  web: () => require('./chat.web'),
})();

export default Header.default