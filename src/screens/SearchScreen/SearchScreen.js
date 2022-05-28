import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomTopbar from '../../components/CustomTopbar';

import axios from 'axios'; 

const SearchScreen = () => {

    const [ word, setWord ] = useState('')
    const [ autocomplete, setAutocomplete ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const navigation = useNavigation();

    // 뒤로 가기 버튼을 눌렀을 경우
    const onBackPressed = () => {
        navigation.navigate('Home');
    }

    // 검색 버튼을 눌렀을 경우
    const onSearchPressed = () => {
        navigation.push('SearchResult', {keyword: word});
    }

    // 입력값이 바뀔 때마다
    const onChangeText = (value) => {

        setWord(value)
        setAutocomplete(null)
        setLoading(true)

        // input 값을 기준으로 자동완성 결과 받아오기
        axios.get('http://ec2-3-39-14-90.ap-northeast-2.compute.amazonaws.com:8081/api/autocomplete', {
            params: {
                input: value
            }
        })
        .then((response) => {
            // 자동완성 결과값들을 autocomplete 에 저장
            setAutocomplete(response.data.data)
        })
        .catch(function (error) {
            console.warn(error)
        })

        setLoading(false)

    }

    // 입력값이 바뀔 때마다 실행
    useEffect(() => {
        onChangeText(word)
    }, [word])

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
                        autoFocus={true}
                    />
                </View> 
                <Pressable 
                    onPress={onSearchPressed} 
                    style={styles.searchButton}
                >
                    <Text>검색</Text>
                </Pressable>
            </View>  

            <View style={styles.searchResultContainer}>
                {autocomplete ? autocomplete.map(user => (
                    <Pressable  
                        key={user.id} 
                        style={styles.searchResult}
                        onPress={() => setWord(user.tag)}
                    >
                        <Text>{user.tag}</Text>
                    </Pressable>
                )) : <View></View>}
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
    searchResultContainer: {
        marginLeft: '6%',
        marginRight: '21%',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
    },
    searchResult: {
        paddingLeft: 18,
        paddingVertical: 15,
    },
    input: {
        backgroundColor: '#FFFFFF',
        width: '83%',
        height: 48,
        paddingLeft: 15,
        borderRadius: 5,
        marginBottom: 5,
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