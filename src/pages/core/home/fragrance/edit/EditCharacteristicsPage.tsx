import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import MiddleSlider from '@/src/components/stats/MiddleSlider'
import EditFragranceSlider from '@/src/components/fragrance/EditFragranceSlider'
import { useLocalSearchParams } from 'expo-router'
import useFragranceCharacteristics from '@/src/hooks/useFragranceCharacteristics'
import { AllureIcon, BalanceIcon, ComplexityIcon, LongevityIcon, SillageIcon } from '@/src/constants/Icons'
import FeedbackButton from '@/src/components/utils/FeedbackButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import SubmitButton from '@/src/components/utils/SubmitButton'

const EditCharacteristicsPage = () => {
  const fragranceId = Number(useLocalSearchParams().fragranceId)

  const { fragrance, loading, error, refresh } = useFragranceCharacteristics({ id: fragranceId })

  const characteristics = useMemo(() => ({
    gender: fragrance?.gender,
    longevity: fragrance?.longevity,
    sillage: fragrance?.sillage,
    complexity: fragrance?.complexity,
    balance: fragrance?.balance,
    allure: fragrance?.allure
  }), [fragrance])

  const [interacted, setInteracted] = useState(false)

  const handleInteracted = useCallback(() => {
    if (!interacted) {
      setInteracted(true)
    }
  }, [interacted])

  // TODO: Skeleton
  if (!fragrance || loading) {
    return null
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <ScrollView style={styles.editSlidesWrapper} showsVerticalScrollIndicator={false}>
        <EditFragranceSlider
          label='longevity'
          leftLabel='very short'
          rightLabel='very long'
          storedValue={characteristics.longevity}
          icon={<LongevityIcon />}
          style={styles.editSliderWrapper}
          onInteracted={handleInteracted}
        />
        <EditFragranceSlider
          label='sillage'
          leftLabel='intimate'
          rightLabel='expansive'
          storedValue={characteristics.sillage}
          icon={<SillageIcon />}
          style={styles.editSliderWrapper}
          onInteracted={handleInteracted}
        />
        <EditFragranceSlider
          label='complexity'
          leftLabel='simple'
          rightLabel='intricate'
          storedValue={characteristics.complexity}
          icon={<ComplexityIcon />}
          style={styles.editSliderWrapper}
          onInteracted={handleInteracted}
        />
        <EditFragranceSlider
          label='balance'
          leftLabel='unbalanced'
          rightLabel='harmonious'
          storedValue={characteristics.balance}
          icon={<BalanceIcon />}
          style={styles.editSliderWrapper}
          onInteracted={handleInteracted}
        />
        <EditFragranceSlider
          label='allure'
          leftLabel='unappealing'
          rightLabel='captivating'
          storedValue={characteristics.allure}
          icon={<AllureIcon />}
          style={styles.editSliderWrapper}
          onInteracted={handleInteracted}
        />
        <FeedbackButton />
      </ScrollView>
      {interacted && <SubmitButton />}
    </SafeAreaView>

  )
}

export default EditCharacteristicsPage

const styles = StyleSheet.create({
  editSlidesWrapper: {
    flex: 1,
    padding: 10
  },
  editSliderWrapper: {
    marginVertical: 10
  }
})
