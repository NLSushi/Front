import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomTopbar from '../../components/CustomTopbar';

import axios from 'axios'; 
import { Auth } from 'aws-amplify';

const MyPageScreen = ({route}) => {

    const navigation = useNavigation();

    const [username, setUsername] = useState(null)
    const [scrap, setScrap] = useState('');
    const [loading, setLoading] = useState(false);

    // 뒤로 가기 버튼 눌렀을 경우
    const onBackPressed = () => {
        navigation.goBack();
    }

    // 로그아웃 버튼 눌렀을 경우
    const onSignOutPressed = () => {
        Auth.signOut();
    }

    // user 에 route 된 값 넣기
    const fetchUser = async () => {
        setUsername(route.params.username)
    }

    // 스크랩 여부 확인
    const fetchLike = async () => {

        try {

            setScrap(null);
            setLoading(true);

            // username을 기준으로 스크랩된 기사들 불러오기
            const response = await axios.get(
                'http://ec2-3-39-14-90.ap-northeast-2.compute.amazonaws.com:8081/api/scrap/view', {
                    params: {
                        userId: username
                    }
                }
            );

            // scrap 에 response 데이터 넣기
            setScrap(response.data.data)

        } catch (e) {
            //Alert.alert("Error", e.message);
        }

        setLoading(false)

    }

    // 처음에 user 확인
    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        fetchLike()
    }, [username]);

    if (loading) return <View style={[styles.default]}><Text style={{margin: 25, color: '#FFFFFF', fontSize: 20}}>로딩 중..</Text></View>;
    if (!scrap) return null;

    return (
        <View style={styles.default}>
            <CustomTopbar
                leftText="❮"
                onPressLeft={onBackPressed}
            />
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.logo}>NEWSUM</Text>
                    <Text style={styles.welcome}>{username}님 환영합니다!</Text>
                    <View style={styles.moreContainer}>
                        <Pressable onPress={onSignOutPressed}>
                            <Text style={styles.moreText}>로그아웃</Text>
                        </Pressable>
                    </View>           
                </View>
                <View style={styles.artContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>내가 스크랩한 기사</Text>
                    </View>
                    {scrap.map(scrap => (
                        <Pressable 
                            style={styles.article} 
                            activeOpacity='0.8'
                            key={scrap.id}
                            onPress={function() {navigation.navigate('Detail', {id: scrap.id, username: username})}}
                        >
                            <Text style={styles.title}>{scrap.title}</Text>
                            <Image style={styles.image} source={{uri: scrap.img}}/>
                            <View style={styles.contentContainer}>
                                <View><Text style={styles.content}>{scrap.article_extractive}</Text></View>
                                <View><Text style={styles.info}>{scrap.writer}</Text></View>
                            </View>
                        </Pressable>
                    ))}
                </View>
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
    container: {
        marginTop: 5,
        marginHorizontal: '5%',
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        paddingVertical: 23,
        paddingHorizontal: 22,
    },
    logo: {
        fontFamily: 'Roboto Condensed',
        fontSize: 12,
        fontWeight: '700',
        color: '#7382B5'
    },
    welcome: {
        marginTop: 4,
        fontSize: 22,
        fontWeight: '600',
        color: '#545454',
    },
    moreContainer: {
        marginTop: 25,
        flexDirection: 'row'
    },
    moreText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#969696',
    },
    artContainer: {
        marginTop: 15,
        marginHorizontal: '5%'
    },
    headerContainer: {
        backgroundColor: '#E5EBFF',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        justifyContent: 'center',
        padding: 14
    },
    header: {
        fontWeight: '800',
        color: '#545454',
        fontSize: 14
    },
    article: {
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        paddingHorizontal: 14,
        paddingVertical: 14,
        marginBottom: 10
    },
    
    title: {
        fontSize: 14,
        fontWeight: '800',
        color: '#545454',
    },
    image: {
        height: 150,
        marginTop: 8
    },
    contentContainer: {
        marginTop: 8
    },
    content: {
        fontWeight: '300',
        fontSize: 13,
        color:'#545454',
        lineHeight: 18
    },
    info: {
        fontWeight: '400',
        fontSize: 12,
        color:'#8F8F8F',
        marginTop: 8
    },
})

export default MyPageScreen;