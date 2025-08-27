import { Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';

export default function BotonGenerico({ title, onPress, bottonStyle, backgroundColor, textColor }: { title: string; onPress: () => void, bottonStyle: StyleProp<ViewStyle>, backgroundColor: string, textColor: string }) {
   
    return (
        <TouchableOpacity onPress={onPress} style={[bottonStyle, { 
        backgroundColor: backgroundColor,
        padding: 10,
        height: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    }]}>
      <Text style={{ color: textColor }}>{title}</Text>
    </TouchableOpacity>
  );
}