import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput, TextInputProps } from 'react-native-paper'
import useDebounce from '@/src/hooks/useDebounce'
import { useAppTheme } from '@/src/constants/Themes'

export interface SearchInputProps {
  debounce?: number
  inputProps?: TextInputProps
  style?: ViewStyle
  onSearch?: (term: string) => void
}

const SearchInput: React.FC<SearchInputProps> = (props: SearchInputProps) => {
  const { debounce = 500, inputProps, style, onSearch } = props
  const theme = useAppTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, debounce)

  const processSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm)
  }

  useEffect(() => {
    if (debouncedSearchTerm) {
      //
    }
  }, [debouncedSearchTerm, onSearch])

  return (
    <View style={StyleSheet.compose(styles.wrapper, style)}>
      <TextInput
        value={searchTerm}
        label='search accords'
        mode='outlined'
        returnKeyType='search'
        autoCapitalize='none'
        autoCorrect={false}
        outlineStyle={{ backgroundColor: theme.colors.surfaceDisabled, opacity: 0.8 }}
        outlineColor='transparent'
        left={<TextInput.Icon icon='magnify' />}
        onChangeText={processSearch}
        onSubmitEditing={() => onSearch?.(searchTerm)}
        {...inputProps}
      />
    </View>
  )
}

export default SearchInput

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10
  }
})
