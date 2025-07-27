import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity, ScrollView, Animated } from "react-native";
import { burger, cards, info, map, read, shrd } from "../venicecnsts/venisestyles";
import { burgerMenu, buttonDecorLeft, buttonDecorRight, decor, firework } from "../venicecnsts/venicessts";
import Veniceburgerstreets from "../venicecmns/Veniceburgerstreets";
import { useState, useRef, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from "react-native-linear-gradient";

const STORAGE_KEY = 'VENICE_SAVED_PLACES';

const Venicesavedstreets = () => {
    const navigation = useNavigation();
    const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
    const [savedPlaces, setSavedPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const cardAnimations = useRef([]);

    useEffect(() => {
        const loadSavedPlaces = async () => {
            try {
                const storedPlaces = await AsyncStorage.getItem(STORAGE_KEY);
                if (storedPlaces) {
                    const parsedPlaces = JSON.parse(storedPlaces);
                    setSavedPlaces(parsedPlaces);
                }
            } catch (error) {
                console.error('Failed to load saved places:', error);
            } finally {
                setLoading(false);
            }
        };

        loadSavedPlaces();
    }, []);

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
        if (savedPlaces.length > 0) {
            cardAnimations.current = savedPlaces.map(() => new Animated.Value(0));
            
            const animations = cardAnimations.current.map((anim, index) => {
                return Animated.spring(anim, {
                    toValue: 1,
                    friction: 8,
                    tension: 60,
                    delay: index * 150,
                    useNativeDriver: true,
                });
            });

            Animated.stagger(100, animations).start();
        } else {
            cardAnimations.current = [];
        }
    }, [savedPlaces]);

    if (loading) {
        return (
            <View style={[shrd.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: 'white' }}>Loading saved places...</Text>
            </View>
        );
    }

    const getCardAnimation = (idx) => {
        if (!cardAnimations.current || !cardAnimations.current[idx]) {
            return {
                scale: 1,
                opacity: 1
            };
        }
        
        return {
            scale: cardAnimations.current[idx].interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
            }),
            opacity: cardAnimations.current[idx].interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
            })
        };
    };

    return (
        <View style={shrd.container}>
            <Veniceburgerstreets 
                close={() => setOpenBurgerMenu(false)} 
                visible={openBurgerMenu}
            />

            <View style={{ width: '100%' }}>
                <TouchableOpacity
                    onPress={() => setOpenBurgerMenu(true)}
                    style={burger.menuButton}
                >
                    <Image
                        source={burgerMenu}
                        style={burger.menuIcon}
                    />
                </TouchableOpacity>

                <Text style={burger.title}>Saved places</Text>
            </View>

            <Image 
                source={firework} 
                style={{
                    width: 160,
                    height: 160,
                    position: 'absolute',
                    bottom: '40%',
                    alignSelf: 'center'
                }}
            />

            <ScrollView 
                style={{ width: '100%', paddingHorizontal: 16, paddingTop: 50 }}
                showsVerticalScrollIndicator={false}
            >
                {savedPlaces.length > 0 ? (
                    savedPlaces.map((place, idx) => {
                        const animation = getCardAnimation(idx);

                        return (
                            <Animated.View
                                key={idx}
                                style={{
                                    width: '100%',
                                    opacity: animation.opacity,
                                    transform: [{ scale: animation.scale }],
                                }}
                            >
                                <View style={[
                                    map.card,
                                    {
                                        marginBottom: 50,
                                    }
                                ]}>

                                    <Image source={decor} style={{width: '100%', height: 100, resizeMode: 'contain', position: 'absolute', zIndex: 10, top: -50}} />

                                    <Image 
                                        source={place.veniceImage} 
                                        style={map.cardImg} 
                                    />
                                    
                                    <View style={{width: '60%'}}>

                                        <Text style={read.placeName}>{place.venicePlace}</Text>
                                        <View style={shrd.line} />
                                        <Text
                                            style={[read.description, {marginBottom: 30}]}
                                            numberOfLines={2}
                                            ellipsizeMode='tail'
                                        >
                                            {place.veniceDesc}
                                        </Text>
                                        
                                        <View style={{width: 100, alignSelf: 'center'}}>
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
                                                onPress={() => navigation.navigate('VenicereadplaceStreets', { place })}
                                                activeOpacity={0.7}
                                            >
                                                <LinearGradient
                                                    style={info.gradient}
                                                    colors={['#CB9920', '#FCCB00', '#FDF3C3']}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 0 }}
                                                >
                                                    <Text style={[info.buttonText, {fontSize: 14}]}>
                                                        Read more
                                                    </Text>
                                                </LinearGradient>
                                            </TouchableOpacity>

                                        </View>

                                    </View>
                                </View>
                            </Animated.View>
                        );
                    })
                ) : (
                    <View style={{ alignItems: 'center', padding: 20 }}>
                        <Text style={{ 
                            color: 'white', 
                            fontSize: 18, 
                            textAlign: 'center',
                            marginBottom: 20
                        }}>
                            You haven't saved any places yet
                        </Text>
                        <Text style={{ 
                            color: 'rgba(255,255,255,0.7)', 
                            textAlign: 'center',
                            fontSize: 14
                        }}>
                            When you save places in Venice, they'll appear here
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default Venicesavedstreets;