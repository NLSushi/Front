import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Image, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

// HomeScreen 에서 반복적으로 사용되는 news box
const CustomNews = ({ news, category, horizontal }) => {

    const navigation = useNavigation();
    const [username, setUsername] = useState('')

    // HomeScreen에서 먼저 user check 한 후 route로 DetailScreen에 id 전달
    const checkUser = async () => {
        try {

            const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
            setUsername(authUser.username)

        } catch (e) {
            setUser(null);
        }
    }

    return (
        <ScrollView 
            style={styles.scrollContainer} 
            horizontal={horizontal} 
            showsHorizontalScrollIndicator={false}
        >
            {news.filter(user => user.category == category).map(user => (
                <Pressable  
                    key={user.id} 
                    style={styles.newsContainer}
                    activeOpacity='1' 
                    onPress={function() { checkUser(); navigation.navigate('Detail', {id: user.id, username: username});}}
                >
                    <View style={styles.companyHeader}>
                        <Text style={styles.companyText}>{user.company}</Text>
                    </View>
                    <View style={styles.article}>
                        <Text style={styles.artTitle}>{user.title}</Text>
                        <Image style={styles.artImage} source={{uri: user.img}}/>
                        <View style={styles.artContentContainer}>
                            <Text style={styles.artContent}>{user.article_extractive}</Text>
                            <Text style={styles.artInfo}>{user.writer}</Text>
                        </View>
                    </View>
                </Pressable>
            ))}
        </ScrollView>  
    )

}

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 10,
        marginTop: 10,
    },
    newsContainer: {
        width: 320,
        marginRight: 8,
    },
    companyHeader: {
        backgroundColor: '#E5EBFF',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        justifyContent: 'center',
        padding: 14
    },
    companyText: {
        fontWeight: '700',
        color: '#545454',
        fontSize: 14
    },
    article: {
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        padding: 14,
    },
    artTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: '#545454',
    },
    artImage: {
        height: 150,
        marginTop: 8
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

export default CustomNews;