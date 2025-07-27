import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity, ScrollView, Animated } from "react-native";
import { burger, cards, shrd } from "../venicecnsts/venisestyles";
import { burgerMenu, firework } from "../venicecnsts/venicessts";
import venicerecommend from "../venicecnsts/venicerecommend";
import Veniceburgerstreets from "../venicecmns/Veniceburgerstreets";
import { useState, useRef, useEffect } from "react";

const Venicerecommendstreets = () => {
    const navigation = useNavigation();
    const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;
    const cardAnimations = useRef(venicerecommend.map(() => new Animated.Value(0))).current;

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
        const animations = venicerecommend.map((_, index) => {
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

                <Text style={burger.title}>Recommended places</Text>
            </Animated.View>

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
                style={{width: '100%', paddingHorizontal: 20}}
                showsVerticalScrollIndicator={false}
            >
                {venicerecommend.map((place, idx) => {
                    const cardScale = cardAnimations[idx].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                    });

                    const cardOpacity = cardAnimations[idx].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                    });

                    return (
                        <Animated.View
                            key={idx}
                            style={{
                                opacity: cardOpacity,
                                transform: [{ scale: cardScale }]
                            }}
                        >
                            <TouchableOpacity
                                style={cards.container}
                                onPress={() => navigation.navigate('VenicereadplaceStreets', { place })}
                                activeOpacity={0.7}
                            >
                                <Image
                                    source={place.veniceImage}
                                    style={cards.placeImg}
                                />
                                <Text style={cards.placeName}>{place.venicePlace}</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    );
                })}
                <View style={{height: 100}} />
            </ScrollView>
        </View>
    );
};

export default Venicerecommendstreets;