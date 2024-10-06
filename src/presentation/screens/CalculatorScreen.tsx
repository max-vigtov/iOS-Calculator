import { Text, View } from "react-native"
import { styles } from "../../app-theme"

export const CalculatorScreen = () => {
  return (
    <View style={ styles.calculatorContainer}>

        <View style={{ paddingHorizontal: 30, paddingBottom: 20 }}>
            <Text style={ styles.mainResult }>1550</Text>
            <Text style={ styles.subResult }>15</Text>
        </View>    
    </View>
  )
}