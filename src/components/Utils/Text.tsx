import styled from 'styled-components/native'
import { Colors } from '@/src/constants/Colors'

const TitleText = styled.Text`
  font-family: 'PalanquinDark-SemiBold';
  font-size: 32px;
  color: ${Colors.black};
`
export const ThemedText = styled.Text`
  font-family: 'PalanquinDark-Regular';
  color: ${Colors.black}
`

export default TitleText
