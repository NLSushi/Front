import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomTopbar from '../../components/CustomTopbar';
import CustomNews from '../../components/CustomNews/CustomNews';

import axios from 'axios'; 

import { Auth } from 'aws-amplify';

const HomeScreen = () => {

    const navigation = useNavigation();

    const [news, setNews] = useState('');
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('')

    // 가장 최근 뉴스 불러오기
    const fetchNews = async () => {

        try {

            setNews(null);
            setLoading(true);

            // get method 로 불러오기
            const response = await axios.get(
                'http://ec2-3-39-14-90.ap-northeast-2.compute.amazonaws.com:8081/api/recent'
            );

            // news 에 response data 추가
            setNews(response.data.data);

        } catch (e) {
            Alert.alert("Error", e.message);
        }

        setLoading(false);

    }

    // username 불러오기
    const checkUser = async () => {
        try {

            const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
            setUsername(authUser.username)

        } catch (e) {
            setUser(null);
        }
    }

    // 처음에 news 불러오는 함수 실행
    useEffect(() => {
        fetchNews();
    }, []);

    if (loading) return <View style={[styles.default]}><Text style={{margin: 25, color: '#FFFFFF', fontSize: 20}}>로딩 중..</Text></View>;
    if (!news) return null;

    // mypage 눌렀을 경우
    const onProfilePressed = () => {
        checkUser()
        navigation.navigate('MyPage', {username: username})
    }

    // search bar 눌렀을 경우
    const onSearchPressed = () => {
        navigation.navigate('Search');
    }

    return (
        <View style={styles.default}>

            <CustomTopbar
                leftText="NEWSUM"
                rightText='⚪️'
                onPressRight={onProfilePressed}
            />

            <View style={styles.contentContainer}>
                <Pressable
                    onPress={onSearchPressed}
                    style={styles.searchBar}
                    behavior="padding"
                    enabled
                >
                    <Text>키워드로 검색해보세요</Text>
                </Pressable>
                <ScrollView showsVerticalScrollIndicator={false} > 
                    <Text style={styles.categoryHeader}>정치 핫뉴스</Text>
                    <CustomNews
                        news={news}
                        category="politic"
                        horizontal={true}
                    />
                    <Text style={styles.categoryHeader}>경제 핫뉴스</Text>
                    <CustomNews
                        news={news}
                        category="economy"
                        horizontal={true}
                    />
                    <Text style={styles.categoryHeader}>사회 핫뉴스</Text>
                    <CustomNews
                        news={news}
                        category="society"
                        horizontal={true}
                    />

                </ScrollView>  
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
    searchBar: {
        height: 42,
        width: '94%',
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        paddingHorizontal: 12,
        marginBottom: 8,
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 7,
        fontFamily: 'Roboto',
        flexDirection: 'column',
        marginLeft: '5%',
    },
    categoryHeader: {
        marginTop: 16,
        fontSize: 15,
        fontWeight: '800',
        color: '#FFFFFF'
    },
    

})
export default HomeScreen;