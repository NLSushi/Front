import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// 대부분의 화면에서 사용하는 topbar 
// 화면에 따라 좌우 아이콘이 다르기 때문에 leftText와 rightText 값 모두 받음
// (없는 경우에는 파라미터로 전달하지 않으면 됨)
const CustomTopbar = ({ leftText, rightText, onPressLeft, onPressRight }) => {
    return (
        <View style={styles.container}>
                <Pressable onPress={onPressLeft}>
                    <Text style={styles.text}>{leftText}</Text>
                </Pressable>
                <Pressable onPress={onPressRight}>
                    <Text style={styles.text}>{rightText}</Text>
                </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#7382B5'
    },
    text: {
        marginVertical: 13,
        marginHorizontal: 23,
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: '500'
    },
})

export default CustomTopbar;