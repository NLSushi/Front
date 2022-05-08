import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react/cjs/react.production.min';

import { Auth } from 'aws-amplify';

const CustomTopbar = ({ leftText, rightText, onPressLeft, onPressRight }) => {

    // const [user, setUser] = useState('')

    // const checkUser = async () => {
    //     try {
    //         const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
    //         setUser(authUser.username);

    //         console.warn(user)
    //     } catch (e) {
    //         setUser(null);
    //     }
    // };
    
    // useEffect(() => {
    //     checkUser()
    // }, []);

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