import React from 'react';
import { Text, View, StyleSheet, Alert, Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';

const ConfirmEmailScreen = () => {

    const navigation = useNavigation();

    const { control, handleSubmit } = useForm();

    // username 과 인증코드 입력 후 button을 누르면
    const onConfirmPressed = async (data) => {

        try {

            await Auth.confirmSignUp(data.username, data.code);
            navigation.navigate('SignIn');

        } catch (e) {

            Alert.alert('Error', e.message);
        }

    }

    // 인증코드 재전송 버튼을 눌렀다면
    const onResendPressed = async () => {

        try {

            await Auth.resendSignUp(username);
            Alert.alert('인증코드 전송 완료', '인증코드가 이메일로 전송되었습니다');

        } catch (e) {

            Alert.alert('Error', e.message);

        }
    }

    return (
        <View style={styles.default}>
            <View style={styles.signInTextContainer}>
                <Text style={styles.signInText}>이메일 인증</Text>
                <Text style={styles.signInTextS}>이메일 인증을 위한 과정입니다.</Text>
                <Text style={styles.signInTextS}>이메일 주소로 전달된 인증코드를 입력해주세요.</Text>
            </View>

            <CustomInput
                name="username"
                placeholder="Username"
                control={control}
                rules={{
                    required: 'Username을 입력해주세요'
                }}
            />

            <CustomInput
                name="code"
                placeholder="Code"
                control={control}
                rules={{
                    required: 'Code를 입력해주세요'
                }}
            />

            <CustomButton
                onPress={handleSubmit(onConfirmPressed)}
                text="Confirm"
            />

            <Pressable onPress={onResendPressed}>
                <Text style={styles.otherButtonText}>인증코드 다시 받기</Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    default: {
        flex: 1,
        backgroundColor: '#7382B5',
        fontFamily: 'Roboto'
    },
    signInTextContainer: {
        marginTop: '23%',
        marginLeft: '9%',
        marginBottom: 20
    },
    signInText: {
        fontSize: 25,
        fontWeight: '600',
        color: '#FFFFFF',
        lineHeight: 29.3,
        marginBottom: 16,
    },
    signInTextS: {
        fontSize: 12,
        fontWeight: '300',
        color: '#FFFFFF',
        marginTop: 2,
        color: '#EEEEEE'
    },
    otherButtonText: {
        fontWeight: '500',
        fontSize: 12,
        color: '#EEEEEE',
        alignSelf: 'center'
    }
})

export default ConfirmEmailScreen;