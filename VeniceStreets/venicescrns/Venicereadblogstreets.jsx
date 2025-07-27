import { useState, useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Animated, Share } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { burger, cards, info, read, shrd } from "../venicecnsts/venisestyles";
import { burgerMenu, buttonDecorLeft, buttonDecorRight, decor } from "../venicecnsts/venicessts";
import Veniceburgerstreets from "../venicecmns/Veniceburgerstreets";

const Venicereadblogstreets = ({ blog }) => {
    const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const cardScaleAnim = useRef(new Animated.Value(0.95)).current;
    const buttonRotateAnim = useRef(new Animated.Value(0)).current;

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
        Animated.spring(cardScaleAnim, {
            toValue: 1,
            friction: 5,
            tension: 40,
            useNativeDriver: true,
        }).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(buttonRotateAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(buttonRotateAnim, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: true,
                })
            ])
        ).start();
    }, []);

    const shareBlogItem = async () => {
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

    const buttonInterpolate = buttonRotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '5deg']
    });

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

            <Animated.View style={[
                read.card,
                {
                    transform: [{ scale: cardScaleAnim }],
                    opacity: fadeAnim,
                    paddingTop: 60
                }
            ]}>
                <Image source={decor} style={info.decor} />

                <Animated.Text 
                    style={[
                        read.placeName,
                        {
                            transform: [{
                                translateX: fadeAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-50, 0]
                                })
                            }],
                            width: '90%',
                            marginLeft: 16
                        }
                    ]}
                >
                    {blog.title}
                </Animated.Text>

                <View style={shrd.line} />

                <Animated.Text 
                    style={[
                        read.description,
                        {
                            opacity: fadeAnim,
                            transform: [{
                                translateY: fadeAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [20, 0]
                                })
                            }],
                            marginBottom: 40
                        }
                    ]}
                >
                    {blog.content}
                </Animated.Text>

                <Animated.View
                    style={{
                        transform: [{ rotate: buttonInterpolate }],
                        width: 140,
                        alignSelf: 'center',
                        marginBottom: 20
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
                        style={[info.button, {width: 140, height: 32}]}
                        onPress={shareBlogItem}
                        activeOpacity={0.7}
                    >
                        <LinearGradient
                            style={info.gradient}
                            colors={['#CB9920', '#FCCB00', '#FDF3C3']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={[info.buttonText, {fontSize: 17}]}>
                                Share
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        </View>
    );
};

export default Venicereadblogstreets;