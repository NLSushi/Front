import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomTopbar from '../../components/CustomTopbar';

import axios from 'axios'; 

const DetailScreen = ({route}) => {

    const navigation = useNavigation();
    const id = route.params.id;

    const [news, setNews] = useState('');
    const [loading, setLoading] = useState('');

    const fetchNews = async () => {
        try {

            setNews(null);
            setLoading(true);

            const response = await axios.get(
                'http://ec2-3-39-14-90.ap-northeast-2.compute.amazonaws.com/api/recent'
            );

            setNews(response.data.data);

            
        } catch (e) {
            Alert.alert('Error', e.message);
        }

        setLoading(false);

    }

    useEffect(() => {
        fetchNews();
    }, []);

    if (loading) return <View style={[styles.default]}><Text style={{margin: 25, color: '#FFFFFF', fontSize: 20}}>로딩 중..</Text></View>;
    if (!news) return null;

    const onBackPressed = () => {
        navigation.navigate('Home');
    }

    const onProfilePressed = () => {
        navigation.navigate('MyPage');
    }

    return (
        <View>
            <CustomTopbar
                leftText="❮"
                rightText='⚪️'
                onPressLeft={onBackPressed}
                onPressRight={onProfilePressed}
            />

                <ScrollView showVerticalScrollIndicator={false}>
                    {news.filter(user => user.id == id).map(user => (
                        <View key={user.id} style={styles.artContainer}>
                            <Text style={styles.title}>{user.title}</Text>
                            <Text style={styles.info}>{user.company} • {user.writer}</Text>
                            <Text style={styles.info}>{user.date}</Text>
                            <Image style={styles.image} source={{uri: user.img}}/>
                            <Text style={styles.hashtag}>{user.hashtag}</Text>
                            <Text style={styles.content}>{user.article_origin}</Text>
                        </View>
                    ))}
                    <View style={{marginTop: 50}}/>
                </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        fontFamily: 'Roboto',
        backgroundColor: '#FFFFFF'
    },
    artContainer: {
        paddingHorizontal: 35,
        paddingVertical: 30
    },
    title: {
        fontSize: 18,
        fontWeight: '800',
        lineHeight: 23,
        color: '#545454',
        marginBottom: 8
    },
    info: {
        fontWeight: '400',
        fontSize: 12,
        color: '#969696',
        textAlign: 'right',
    },
    image: {
        marginTop: 8,
        height: 200,
    },
    hashtag: {
        marginTop: 16,
        fontWeight: '700',
        fontSize: 14,
        color: '#545454'
    },
    content: {
        marginTop: 11,
        fontSize: 14,
        fontWeight: '400',
        color: '#545454',
        lineHeight: 19
    },
})

export default DetailScreen;