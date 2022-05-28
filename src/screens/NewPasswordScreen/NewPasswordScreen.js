import React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';

const NewPasswordScreen = () => {

    const navigation = useNavigation();

    const { control, handleSubmit } = useForm();

    // signin으로 돌아가는 버튼
    const onBackToLoginPressed = async (data) => {
        try {

            await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
            navigation.navigate('SignIn');

        } catch (e) {

            Alert.alert("Error", e.message);
            
        }
        
    }

    return (
        <View style={styles.default}>
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>비밀번호 재설정</Text>
                <Text style={styles.headerTextS}>이메일 주소로 전달된 인증코드를 입력한 후,</Text>
                <Text style={styles.headerTextS}>비밀번호를 변경해주세요.</Text>
            </View>

            <CustomInput 
                name="username"
                control={control}
                placeholder='Username' 
                rule={{
                    required: 'Username을 입력해주세요'
                }}
            />

            <CustomInput
                name="code"
                placeholder="Code"
                control={control}
                rule={{
                    required: 'Code를 입력해주세요'
                }}
            />

            <CustomInput
                name="password"
                placeholder="New Password"
                control={control}
                secureTextEntry
                rules={{
                    required: '비밀번호를 입력해주세요',
                    minLength: {
                        value: 8,
                        message: '8자 이상 입력해주세요'
                    }
                }}
            />

            <CustomButton
                onPress={handleSubmit(onBackToLoginPressed)}
                text="Back to Login"
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
    headerTextContainer: {
        marginTop: '23%',
        marginLeft: '9%',
        marginBottom: 20
    },
    headerText: {
        fontSize: 25,
        fontWeight: '600',
        color: '#FFFFFF',
        lineHeight: 29.3,
        marginBottom: 16,
    },
    headerTextS: {
        fontSize: 12,
        fontWeight: '300',
        color: '#FFFFFF',
        marginTop: 2,
        color: '#EEEEEE'
    },
});

export default NewPasswordScreen;