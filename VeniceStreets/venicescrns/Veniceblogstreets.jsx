import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity, ScrollView, Animated, Share } from "react-native";
import { burger, cards, info, read, shrd } from "../venicecnsts/venisestyles";
import { burgerMenu, buttonDecorLeft, buttonDecorRight, share } from "../venicecnsts/venicessts";
import Veniceburgerstreets from "../venicecmns/Veniceburgerstreets";
import veniceblog from "../venicecnsts/veniceblog";
import { useState, useRef, useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";

const Veniceblogstreets = () => {
    const navigation = useNavigation();
    const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const cardAnimations = useRef(veniceblog.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 6,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    useEffect(() => {
        const animations = veniceblog.map((_, index) => {
            return Animated.spring(cardAnimations[index], {
                toValue: 1,
                friction: 8,
                tension: 60,
                delay: index * 150,
                useNativeDriver: true,
            });
        });

        Animated.stagger(100, animations).start();
    }, []);

    const shareBlogItem = async (blog) => {
        try {
            const shareOptions = {
                title: blog.title,
                message: blog.content,
            };

            const result = await Share.share(shareOptions);

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('Shared with', result.activityType);
                } else {
                    console.log('Shared successfully');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Share dismissed');
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    return (
        <View style={shrd.container}>
            <Veniceburgerstreets 
                close={() => setOpenBurgerMenu(false)} 
                visible={openBurgerMenu}
            />

            <Animated.View style={[
                { 
                    width: '100%',
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                }
            ]}>
                <TouchableOpacity
                    onPress={() => setOpenBurgerMenu(true)}
                    style={burger.menuButton}
                >
                    <Image
                        source={burgerMenu}
                        style={burger.menuIcon}
                    />
                </TouchableOpacity>

                <Text style={burger.title}>Blog</Text>
            </Animated.View>

            <ScrollView 
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {veniceblog.map((blog, idx) => {
                    const cardScale = cardAnimations[idx].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1],
                    });

                    const cardOpacity = cardAnimations[idx].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.5, 1],
                    });

                    return (
                        <Animated.View
                            key={idx}
                            style={[
                                cards.container,
                                {
                                    opacity: cardOpacity,
                                    transform: [{ scale: cardScale }],
                                    marginBottom: 20,
                                    marginHorizontal: 20,
                                    overflow: 'hidden',
                                    backgroundColor: '#000',
                                    padding: 13,
                                    width: '90%'
                                }
                            ]}
                        >
                            <Animated.Text 
                                style={[
                                    read.placeName,
                                    {
                                        transform: [{
                                            translateX: cardAnimations[idx].interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [-50, 0]
                                            })
                                        }]
                                    }
                                ]}
                            >
                                {blog.title}
                            </Animated.Text>

                            <View style={[shrd.row, { justifyContent: 'flex-start' }]}>
                                <Animated.View 
                                    style={{
                                        marginLeft: 10,
                                        marginRight: 30,
                                        opacity: cardAnimations[idx],
                                        transform: [{
                                            translateY: cardAnimations[idx].interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [30, 0]
                                            })
                                        }]
                                    }}
                                >
                                   <Image 
                                        source={buttonDecorLeft} 
                                        style={[info.buttonDecor, {
                                            left: -16,
                                            top: -16,
                                            width: 38,
                                            height: 38
                                        }]} 
                                    />
                                    <Image 
                                        source={buttonDecorRight} 
                                        style={[info.buttonDecor, {
                                            right: -16,
                                            top: -16,
                                            width: 38,
                                            height: 38
                                        }]} 
                                    />
                                    <TouchableOpacity
                                         style={[info.button, {width: 100, height: 23}]}
                                        onPress={() => navigation.navigate('VenicereadblogStreets', { blog })}
                                        activeOpacity={0.7}
                                    >
                                        <LinearGradient
                                            style={info.gradient}
                                            colors={['#CB9920', '#FCCB00', '#FDF3C3']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                        >
                                            <Animated.Text 
                                                style={[
                                                    info.buttonText,
                                                    {
                                                        opacity: cardAnimations[idx],
                                                        transform: [{
                                                            scale: cardAnimations[idx].interpolate({
                                                                inputRange: [0, 1],
                                                                outputRange: [0.8, 1]
                                                            })
                                                        }],
                                                        fontSize: 14
                                                    }
                                                ]}
                                            >
                                                Read more
                                            </Animated.Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </Animated.View>
                                
                                <Animated.View
                                    style={{
                                        opacity: cardAnimations[idx],
                                        transform: [{
                                            scale: cardAnimations[idx].interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [0.5, 1]
                                            })
                                        }]
                                    }}
                                >
                                    <TouchableOpacity 
                                        onPress={() => shareBlogItem(blog)}
                                        activeOpacity={0.6}
                                    >
                                        <Image 
                                            source={share} 
                                            style={read.smallButton} 
                                        />
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>
                        </Animated.View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default Veniceblogstreets;