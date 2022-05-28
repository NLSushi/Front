import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

// SignIn, SignUp 에서 사용되는 button 으로 자주 사용돼서 따로 분리
// onPress 와 text 를 파라미터로 받아옴
const CustomButton = ({ onPress, text }) => {
    return (
        <Pressable
            onPress={ onPress }
            style={styles.container}
        >
            <Text style={styles.text}>
                {text}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '83%',
        height: 45,
        alignItems: 'center',
        marginBottom: 11,
        borderRadius: 5,
        backgroundColor: '#E5EBFF',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#545454',
        fontWeight: '700',
        fontSize: 15
    }
})

export default CustomButton;
