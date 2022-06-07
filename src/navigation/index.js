import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import MyPageScreen from '../screens/MyPageScreen';
import DetailScreen from '../screens/DetailScreen';
import SearchScreen from '../screens/SearchScreen';
import SearchResultScreen from '../screens/SearchResultScreen';

import { Auth, Hub } from 'aws-amplify';

const Stack = createStackNavigator();

const Navigation = () => {

    const [user, setUser] = useState(undefined);

    // 로그인 여부에 따라 보이는 화면 다르게 하기
    const checkUser = async () => {
        
        try {

            const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
            setUser(authUser);

        } catch (e) {

            setUser(null);

        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    // 로그인 또는 로그아웃을 했는데 화면 refresh를 하지 않으면 
    // 로그인아웃이 반영되지 않는 문제 -> automatically redirect 하기 위해
    useEffect(() => {
        const listener = (data) => {
            if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
                checkUser();
            }
        }

        Hub.listen('auth', listener);
        return () => Hub.remove('auth', listener);

    }, []);

    if (user === undefined) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator />
            </View>
        )
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* if user is defined */}
                {user ? (
                    <>
                    <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
                    <Stack.Screen name="Search" component={SearchScreen} options={{headerShown: false}} />
                    <Stack.Screen name="MyPage" component={MyPageScreen} options={{headerShown: false}} />
                    <Stack.Screen name="Detail" component={DetailScreen} options={{headerShown: false}} />
                    <Stack.Screen name="SearchResult" component={SearchResultScreen} options={{headerShown: false}} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}} />
                        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}} />
                        <Stack.Screen name="NewPassword" component={NewPasswordScreen} options={{headerShown: false}} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown: false}} />
                        <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} options={{headerShown: false}} />      
                    </>              
                )}
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default Navigation;