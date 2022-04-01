import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView, Image, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomTopbar from '../../components/CustomTopbar';
import CustomNews from '../../components/CustomNews/CustomNews';

import axios from 'axios'; 

const HomeScreen = () => {

    const navigation = useNavigation();

    const [news, setNews] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchNews = async () => {
        try {

            setNews(null);
            setLoading(true);

            const response = await axios.get(
                'http://ec2-3-39-14-90.ap-northeast-2.compute.amazonaws.com:8081/api/article'
            );

            setNews(response.data.data);

        } catch (e) {
            Alert.alert("Error", e.message);
        }

        setLoading(false);

    }

    useEffect(() => {
        fetchNews();
    }, []);

    if (loading) return <View style={[styles.default]}><Text style={{margin: 25, color: '#FFFFFF', fontSize: 20}}>로딩 중..</Text></View>;
    if (!news) return null;

    const onProfilePressed = () => {
        navigation.navigate('MyPage');
    }

    const onSearchPressed = () => {
        //navigation.navigate('Search');
        console.warn('onSearchPressed');
    }

    const onArticlePressed = () => {
        navigation.navigate('Detail');
    }

    return (
        <View style={styles.default}>

            <CustomTopbar
                leftText="NEWSUM"
                rightText='⚪️'
                onPressRight={onProfilePressed}
            />

            <View style={styles.contentContainer}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <Pressable
                    onPress={onSearchPressed}
                    style={styles.searchBar}
                    behavior="padding"
                    enabled
                    >
                        <Text>키워드로 검색해보세요</Text>
                    </Pressable>
                    <Text style={styles.categoryHeader}>정치 핫뉴스</Text>
                    <CustomNews
                        news={news}
                        category="politic"
                    />
                    <Text style={styles.categoryHeader}>경제 핫뉴스</Text>
                    <CustomNews
                        news={news}
                        category="economy"
                    />
                    <Text style={styles.categoryHeader}>사회 핫뉴스</Text>
                    <CustomNews
                        news={news}
                        category="society"
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
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 7,
        fontFamily: 'Roboto',
        flexDirection: 'column',
        marginLeft: '5%',
    },
    categoryHeader: {
        marginTop: 14,
        fontSize: 15,
        fontWeight: '800',
        color: '#FFFFFF'
    },
    

})
export default HomeScreen;