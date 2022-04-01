import React, {useState} from 'react';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';

const SignInScreen = () => {

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, formState: {errors} } = useForm();

    const onSignInPressed = async (data) => {
        
        // load가 이미 됐다면,
        if (loading) {
            return; 
        }

        // loading true로 바꾸고
        setLoading(true);

        try {
            // aws-amplify 에 있는 username & password -> response
            await Auth.signIn(data.username, data.password);
        } catch(e) {
            // If error occurs,
            Alert.alert('Oops', e.message);
        }
        // load 중단
        setLoading(false);
    }

    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    }

    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword');
    }

    const onSocialPressed = () => {
        navigation.navigate('Social');
    }

    return (
        <View style={styles.default}>
            <View style={styles.signInTextContainer}>
                <Text style={styles.signInText}>안녕하세요,</Text>
                <Text style={styles.signInText}>NEWSUM 입니다.</Text>
                <Text style={styles.signInTextS}>서비스 이용을 위해 로그인 해주세요.</Text>
            </View>
            <View>
                <CustomInput
                    name="username"
                    placeholder="Username"
                    control={control}
                    rules={{
                        required: 'Username을 입력해주세요'
                    }}
                />
                <CustomInput
                    name="password"
                    placeholder="Password"
                    control={control}
                    rules={{
                        required: 'Password is required',
                        minLength: { value: 8, message: '8자 이상 입력해주세요'}
                    }}
                    secureTextEntry
                />
                <CustomButton
                    onPress={handleSubmit(onSignInPressed)}
                    text="Sign In"
                />
                <View style={styles.line}/>
                <Pressable onPress={onSocialPressed}>
                <Image style={styles.image} source={require('../../assets/kakaoLogin.png')} />
                </Pressable>
                <View style={styles.otherButtonContainer}>
                    <Pressable onPress={onForgotPasswordPressed}>
                        <Text style={styles.otherButtonText}>비밀번호 찾기  </Text>
                    </Pressable>
                    <Text style={styles.otherButtonText}>|</Text>
                    <Pressable onPress={onSignUpPressed}>
                        <Text style={styles.otherButtonText}>  회원가입하기</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    default: {
        flex: 1,
        backgroundColor: '#7382B5',
        fontFamily: 'Roboto'
    },
    signInTextContainer: {
        marginTop: '23%',
        marginLeft: '9%'
    },
    signInText: {
        fontSize: 25,
        fontWeight: '500',
        color: '#FFFFFF',
        lineHeight: 29.3,
    },
    signInTextS: {
        fontSize: 12,
        fontWeight: '300',
        color: '#FFFFFF',
        marginTop: 5,
        marginBottom: 50,
        color: '#EEEEEE'
    },
    line: {
        width: '83%',
        alignSelf: 'center',
        borderBottomColor: '#FFFFFF',
        borderBottomWidth: 1,
        marginTop: 10
    },
    image: {
        alignSelf: 'center',
        marginTop: 20
    },
    otherButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15
    },
    otherButtonText: {
        fontWeight: '500',
        fontSize: 12,
        color: '#EEEEEE'
    }
});

export default SignInScreen;