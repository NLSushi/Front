import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomTopbar from '../../components/CustomTopbar';
import CustomInput from '../../components/CustomInput';

import { useForm } from 'react-hook-form';

import axios from 'axios'; 

const SearchScreen = () => {

    const { control, handleSubmit, watch } = useForm()
    const [ word, setWord ] = useState('')
    const [ autocomplete, setAutocomplete ] = useState('')
    const [ keyword, setKeyword ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const navigation = useNavigation();

    const onBackPressed = () => {
        navigation.navigate('Home');
    }

    const onProfilePressed = () => {
        navigation.navigate('MyPage');
    }

    const onSearchPressed = () => {
        navigation.push('SearchResult', {keyword: word});
    }

    const onChangeText = (value) => {

        setWord(value)
        setAutocomplete(null)
        setLoading(true)

        axios.get('http://ec2-3-39-14-90.ap-northeast-2.compute.amazonaws.com:8081/api/autocomplete', {
            params: {
                input: value
            }
        })
        .then((response) => {
            //console.warn(response.data.data)
            setAutocomplete(response.data.data)
            //console.warn(autocomplete)
            
        })
        .catch(function (error) {
            console.warn(error);
        })

        console.warn(autocomplete)
        setLoading(false)

    }

    if (loading) return <View style={[styles.default]}><Text style={{margin: 25, color: '#FFFFFF', fontSize: 20}}>로딩 중..</Text></View>;

    return (
        <View style={styles.default}>
            <CustomTopbar
                leftText="❮"
                onPressLeft={onBackPressed}
            />
            <View style={styles.searchContainer}>
                <View style={styles.input}>
                    <TextInput
                        value={word}
                        onChangeText={onChangeText}
                        placeholder="키워드를 입력해주세요"
                    />
                </View> 
                <Pressable 
                    onPress={onSearchPressed} 
                    style={styles.searchButton}
                >
                    <Text>검색</Text>
                </Pressable>
            </View>      
            {/* {autocomplete.map(user => (
                <Pressable  
                    key={user.id} 
                >
                    <Text>{user.tag}</Text>
                </Pressable>
            ))} */}
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
    input: {
        backgroundColor: '#FFFFFF',
        width: '83%',
        height: 48,
        paddingLeft: 15,
        borderRadius: 5,
        marginBottom: 18,
        alignSelf: 'center',
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