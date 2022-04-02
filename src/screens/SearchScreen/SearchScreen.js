import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomTopbar from '../../components/CustomTopbar';
import CustomInput from '../../components/CustomInput';

import { useForm } from 'react-hook-form';

const SearchScreen = () => {

    const { control, handleSubmit } = useForm();

    const navigation = useNavigation();

    const onBackPressed = () => {
        navigation.navigate('Home');
    }

    const onProfilePressed = () => {
        navigation.navigate('MyPage');
    }

    const onSearchPressed = (data) => {
        const {keyword} = data;
        console.warn(keyword);
        //navigation.push('SearchResult', d);
    }

    return (
        <View style={styles.default}>
            <CustomTopbar
                leftText="❮"
                rightText='⚪️'
                onPressLeft={onBackPressed}
                onPressRight={onProfilePressed}
            />
            <View style={styles.searchContainer}>
                <CustomInput
                    name="keyword"
                    placeholder="키워드로 검색해보세요"
                    control={control}
                    autoFocus={true}
                />

                <Pressable 
                    onPress={handleSubmit(onSearchPressed)} 
                    style={styles.searchButton}
                >
                    <Text>검색</Text>
                </Pressable>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    default: {
        flex: 1,
        backgroundColor: '#7382B5',
        fontFamily: 'Roboto'
    },
    searchContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginHorizontal: '6%'
    },
    searchButton: {
        height: 47, 
        borderRadius: 5, 
        justifyContent: 'center', 
        backgroundColor: '#E5EBFF', 
        paddingHorizontal: 15
    }
})

export default SearchScreen;