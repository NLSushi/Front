import React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomTopbar from '../../components/CustomTopbar';

import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';

import axios from 'axios'; 

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const SignUpScreen = () => {
    
    const navigation = useNavigation();

    const { control, handleSubmit, watch } = useForm();
    const pwd = watch('password');

    const onSignUpPressed = async (data) => {

        const { username, password, email } = data;
        
        try {
            await Auth.signUp({
                username,
                password,
                attributes: {email, preferred_username: username}
            });

            axios.post("http://ec2-3-39-14-90.ap-northeast-2.compute.amazonaws.com:8081/api/signup", {
                userId: username
            })
            .then((response) => {
                //console.warn(response);
            })
            .catch((response) => {
                console.warn(response);
            });

            navigation.navigate('ConfirmEmail');

        } catch (e) {

            Alert.alert('Error', e.message);
            
        }
        
    }

    const onExitPressed = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.default}>
            <CustomTopbar
                rightText='X'
                onPressRight={onExitPressed}
            />
            <Text style={styles.signUpText}>회원가입</Text>

            <Text style={styles.inputText}>Username</Text>
            <CustomInput
                name="username"
                control={control}
                placeholder="영문 3자 이상"
                rules={{
                    required: 'Username을 입력해주세요',
                    minLength: {
                        value: 3,
                        message: '3자 이상 입력해주세요'
                    },
                    maxLength: {
                        value: 18,
                        message: '18자 이하로 입력해주세요'
                    }
                }}
            />

            <Text style={styles.inputText}>Email</Text>
            <CustomInput
                name="email"
                control={control}
                placeholder="인증 가능한 이메일 주소"
                rules={{
                    pattern: {value: EMAIL_REGEX, message: '이메일 형식으로 입력해주세요'}
                }}
            />

            <Text style={styles.inputText}>Password</Text>
            <CustomInput
                name="password"
                placeholder="8자 이상"
                control={control}
                rules={{
                    required: '비밀번호를 입력해주세요',
                    minLength: {
                        value: 8,
                        message: '8자 이상 입력해주세요'
                    }
                }}
                secureTextEntry
            />

            <Text style={styles.inputText}>Confirm Password</Text>
            <CustomInput
                name="password-repeat"
                placeholder="비밀번호를 다시 입력해주세요"
                control={control}
                rules={{
                    validate: value =>
                    value === pwd || '일치하지 않습니다'
                }}
                secureTextEntry
            />

            <View style={{marginBottom: 15}} />

            <CustomButton
                onPress={handleSubmit(onSignUpPressed)}
                text="Sign Up"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    default: {
        flex: 1,
        backgroundColor: '#7382B5',
        fontFamily: 'Roboto'
    },
    signUpText: {
        marginTop: '10%',
        marginLeft: '9%',
        marginBottom: 25,
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '700'
    },
    inputText: {
        marginLeft: '9%',
        marginBottom: 3,
        color: '#FFFFFF',
        fontWeight: '500',
        fontSize: 14
    }
})

export default SignUpScreen;

