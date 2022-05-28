import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, ScrollView, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomTopbar from '../../components/CustomTopbar';
import CustomInput from '../../components/CustomInput';

import { useForm } from 'react-hook-form';
import axios from 'axios';

const SearchResultScreen = ({route}) => {

    const navigation = useNavigation();
    const keyword = route.params.keyword;

    const { control } = useForm();

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    // 검색 결과
    const fetchSearch = async () => {
        try {

            setSearch(null);
            setLoading(true);

            // hashtag라는 이름으로 keyword 전달
            axios.get('http://ec2-3-39-14-90.ap-northeast-2.compute.amazonaws.com:8081/api/search', {
                params: {
                    hashtag: keyword
                }
            })
            .then((response) => {
                // 해당 hashtag를 가지고 있는 기사 data
                setSearch(response.data.data)
            })
            .catch(function (error) {
                console.warn(error)
            })

        } catch (e) {
            Alert.alert("Error", e.message);
        }

        setLoading(false);

    }

    // 처음 실행
    useEffect(() => {
        fetchSearch();
    }, []);

    if (loading) return <View style={[styles.default]}><Text style={{margin: 25, color: '#FFFFFF', fontSize: 20}}>로딩 중..</Text></View>;
    if (!search) return null;

    // 뒤로 가기 버튼 눌렀을 경우
    const onBackPressed = () => {
        navigation.navigate('Home');
    }

    return (
        <View style={styles.default}>
            <CustomTopbar
                leftText="❮"
                onPressLeft={onBackPressed}
            />
            <View style={styles.searchContainer}>
                <CustomInput
                    name="keyword"
                    defaultValue={keyword}
                    control={control}
                    autoFocus={false}
                    editable={false}
                />
                <View style={styles.searchButton}>
                    <Text style={styles.searchText}>검색</Text>
                </View>
            </View> 
            <ScrollView>
                {/* 기사가 있을 경우와 없는 경우 */}
                {search.length == 0 ? <Text style={styles.noneText}>키워드에 해당되는 기사가 존재하지 않습니다.</Text> 
                    : search.map(user => (
                        <Pressable 
                            onPress={function() { navigation.navigate('Detail', {id: user.id});}} 
                            style={styles.searchArticle} 
                            activeOpacity='0.8'
                            key={user.id}
                        >
                            <Text style={styles.artTitle}>{user.title}</Text>
                            <Image style={styles.artImage} source={{uri: user.img}}/>
                            <View style={styles.artContentContainer}>
                                <Text style={styles.artContent}>{user.article_extractive}</Text>
                                <Text style={styles.artInfo}>{user.writer}</Text>
                            </View>
                        </Pressable>
                    ))
                }
            </ScrollView>
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
        backgroundColor: '#DDDDDD', 
        paddingHorizontal: 15
    },
    searchText: {
        color: '#CCCCCC'
    },
    searchArticle: {
        marginBottom: 10,
        marginHorizontal: '6%',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 4
    },
    noneText: {
        marginLeft: '10%',
        marginTop: 5,
        color: '#EEEEEE',
        fontSize: 14
    },
    artTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: '#545454',
    },
    artImage: {
        height: 150,
        marginTop: 8,
        backgroundColor: '#EEEEEE'
    },
    artContentContainer: {
        marginTop: 8
    },
    artContent: {
        fontWeight: '300',
        fontSize: 13,
        color:'#545454',
        lineHeight: 18
    },
    artInfo: {
        fontWeight: '400',
        fontSize: 12,
        color:'#8F8F8F',
        marginTop: 8
    },
})

export default SearchResultScreen;