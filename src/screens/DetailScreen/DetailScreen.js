import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Alert, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomTopbar from '../../components/CustomTopbar';

import axios from 'axios'; 
import { Auth } from 'aws-amplify';

import 'url-search-params-polyfill';

const DetailScreen = ({route}) => {

    const navigation = useNavigation();
    const id = route.params.id;

    const [news, setNews] = useState('');
    const [loading, setLoading] = useState('');
    const [heart, setHeart] = useState(true);
    const [user, setUser] = useState('');
    const [like, setLike] = useState('');
    const [addArticle, setAddArticle] = useState('');

    const fetchNews = async () => {
        try {

            setNews(null);
            setLoading(true);

            const response = await axios.get(
                'http://ec2-3-39-14-90.ap-northeast-2.compute.amazonaws.com:8081/api/article'
            );

            setNews(response.data.data);

            const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
            setUser(authUser.username)
            
        } catch (e) {
            Alert.alert('Error', e.message);
        }

        setLoading(false);

    }

    // 스크랩 상태 불러오기
    const fetchLike = async () => { 

        try {

            setLoading(true); 

            // userId가 user인 목록
            // const like = await axios.get(
            //     'http://ec2-3-39-14-90.ap-northeast-2.compute.amazonaws.com:8081/api/scrap/view',
            //     {params: {userId: user}}
            // )
            // .then(function(response) {
            //     return response;
            // })
            // .then(function(myJson) {
            //     console.log(JSON.stringify(myJson));
            // });


            fetch(`http://ec2-3-39-14-90.ap-northeast-2.compute.amazonaws.com:8081/api/scrap/view?userId=${encodeURIComponent(user)}`, {
                method: "GET"
            })
            .then((response) => {
                return setLike(response);
            })
            .catch((error) => {
                console.warn(error);
            }); 

            // const like = axios.get(
            //     'http://ec2-3-39-14-90.ap-northeast-2.compute.amazonaws.com:8081/api/scrap/view', {
            //     params: {
            //         userId: user
            //     }
            // })

            //console.warn(like)
            
            if(like.ok == true) {
                console.warn("트루임")
            } else {
                console.warn("false 임")
            }

        } catch (e) {
            Alert.alert('Error', e.message);
        }
            
        setLoading(false);

        // console.warn(like);

        // for 문으로 접근 -> 일치하는 값 있으면 setHeart(true)
        // if (like.data.data.id === id) setHeart(false) 
    }

    useEffect(() => {
        fetchNews();
        fetchLike();
    }, []);

    if (loading) return <View style={[styles.default]}><Text style={{margin: 25, color: '#FFFFFF', fontSize: 20}}>로딩 중..</Text></View>;
    if (!news) return null;

    const onBackPressed = () => {
        navigation.navigate('Home');
    }

    const onProfilePressed = () => {
        navigation.navigate('MyPage');
    }

    // heart 를 눌렀을 때 toggle 됨
    const toggleHeart = () => {
        setHeart(previousState => !previousState);
        //console.warn(heart);
        alert()
    }

    const alert = () => {

        if (heart == true) {
            Alert.alert(                    
                "스크랩 완료",                    
                "기사가 마이페이지에 추가되었습니다.",                        
                [                              
                    { text: "확인" },                                       
                ],
                { cancelable: false }
            )

            // username 과 article id 서버로 전송
            axios.post("http://ec2-3-39-14-90.ap-northeast-2.compute.amazonaws.com:8081/api/scrap", {
                userId: user,
                articleId: id
            })
            .then((response) => {
                console.warn(response)
                //setAddArticle(response.data.id);
            })
            .catch((response) => {
                console.warn(response);
            });

            console.warn(id)

        } else {
            Alert.alert(                    
                "스크랩 취소",                  
                "기사 스크랩이 취소되었습니다.",                       
                [                              
                    { text: "확인" },                                       
                ],
                { cancelable: false }
                
            )

            // username 과 article id 서버로 전송
            axios.delete("http://ec2-3-39-14-90.ap-northeast-2.compute.amazonaws.com:8081/api/unscrap", {
                data: {
                    userId: user,
                    articleId: id
                }
            })
            .then((response) => {
                console.warn(response);
            })
            .catch((response) => {
                console.warn(response);
            });

        }
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
                    <Pressable onPress={toggleHeart}>
                        {heart ?  <Text style={styles.heart}>♡</Text> : <Text style={styles.heart}>♥︎</Text>}
                    </Pressable>
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
    
    heart: {
        marginTop: 10,
        fontSize: 20,
        paddingHorizontal: 35,
        color: '#7382B5'
    },
    artContainer: {
        paddingHorizontal: 35,
        paddingBottom: 30,
        paddingTop: 10
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