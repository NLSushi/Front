import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomInput from '../../components/CustomInput';
import CustomTopbar from '../../components/CustomTopbar';
import CustomButton from '../../components/CustomButton';

import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';

const ForgotPasswordScreen = () => {

    const navigation = useNavigation();

    const { control, handleSubmit } = useForm();

    const onExitPressed = () => {
        navigation.goBack();
    }

    const onSendPressed = async (data) => {
        
        try {

            await Auth.forgotPassword(data.username);
            navigation.navigate('NewPassword');

        } catch (e) {

            alert.alert('Error', e.message);

        }
        
    }

    return (
        <View style={styles.default}>
            <CustomTopbar
                rightText='X'
                onPressRight={onExitPressed}
            />
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>비밀번호 찾기</Text>
                <Text style={styles.headerTextS}>Username을 입력해주세요.</Text>
                <Text style={styles.headerTextS}>이메일 주소로 인증코드 전달 드리겠습니다.</Text>
            </View>

            <CustomInput
                name="username"
                control={control}
                placeholder="Username"
                rules={{
                    required: 'Username을 입력해주세요'
                }}
            />

            <CustomButton
                onPress={handleSubmit(onSendPressed)}
                text="Send"
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
    headerTextContainer:{
        marginTop: '10%',
        marginLeft: '9%',
        marginBottom: 25,
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 20
    },
    headerTextS: {
        fontSize: 12,
        fontWeight: '300',
        color: '#FFFFFF',
        marginTop: 2,
        color: '#EEEEEE'
    },
})

export default ForgotPasswordScreen;