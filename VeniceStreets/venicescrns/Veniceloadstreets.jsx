import { useNavigation } from "@react-navigation/native";
import { Animated, Easing, Image, View } from "react-native";
import { useEffect, useRef } from "react";
import { firework, fireworkBottom, fireworkTop, veniceLogo } from "../venicecnsts/venicessts";

const Veniceloadstreets = () => {
    const navigation = useNavigation();

    const fireworkAnim = useRef(new Animated.Value(0)).current;
    const fireworkTopAnim = useRef(new Animated.Value(0)).current;
    const fireworkBottomAnim = useRef(new Animated.Value(0)).current;
    const logoScaleAnim = useRef(new Animated.Value(0)).current;
    const logoRotateAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(fireworkAnim, {
                toValue: 1,
                duration: 800,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true,
            }),
            
            Animated.parallel([
                Animated.timing(fireworkTopAnim, {
                    toValue: 1,
                    duration: 600,
                    easing: Easing.out(Easing.back(1)),
                    useNativeDriver: true,
                }),
                
                Animated.timing(fireworkBottomAnim, {
                    toValue: 1,
                    duration: 600,
                    easing: Easing.out(Easing.back(1)),
                    useNativeDriver: true,
                }),
                
                Animated.parallel([
                    Animated.timing(logoScaleAnim, {
                        toValue: 1,
                        duration: 1000,
                        easing: Easing.out(Easing.exp),
                        useNativeDriver: true,
                    }),
                    Animated.timing(logoRotateAnim, {
                        toValue: 1,
                        duration: 1000,
                        easing: Easing.out(Easing.exp),
                        useNativeDriver: true,
                    }),
                ]),
            ]),
            
            Animated.delay(2000),
            
            Animated.parallel([
                Animated.timing(fireworkAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(fireworkTopAnim, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(fireworkBottomAnim, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(logoScaleAnim, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(logoRotateAnim, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]),
        ]).start(() => {
            navigation.navigate('VeniceinfoStreets');
        });
    }, []);

    const fireworkScale = fireworkAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1.5]
    });

    const fireworkTopPosition = fireworkTopAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 0]
    });

    const fireworkBottomPosition = fireworkBottomAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0]
    });

    const logoScale = logoScaleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.1, 1]
    });

    const logoRotate = logoRotateAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['0deg', '180deg', '360deg']
    });

    return (
        <View style={{ 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center',
        }}>
            <Image 
                source={firework} 
                style={{
                    width: 160,
                    height: 160,
                    position: 'absolute',
                }}
            />
            <Animated.View style={{ 
                flex: 1, 
                justifyContent: 'center', 
                alignItems: 'center',
                opacity: fadeAnim
            }}>
                <Animated.Image 
                    source={firework} 
                    style={{
                        width: 220,
                        height: 220,
                        position: 'absolute',
                        transform: [{ scale: fireworkScale }],
                        opacity: fireworkAnim
                    }}
                />

                <Animated.Image 
                    source={fireworkTop} 
                    style={{
                        width: '100%',
                        flexGrow: 1,
                        position: 'absolute',
                        top: 0,
                        transform: [{ translateY: fireworkTopPosition }],
                        resizeMode: 'cover'
                    }}
                />

                <Animated.Image 
                    source={veniceLogo} 
                    style={{
                        width: 190,
                        height: 190,
                        transform: [
                            { scale: logoScale },
                            { rotate: logoRotate }
                        ],
                        resizeMode: 'contain'
                    }}
                />

                <Animated.Image 
                    source={fireworkBottom} 
                    style={{
                        width: '100%',
                        flexGrow: 1,
                        position: 'absolute',
                        bottom: 0,
                        transform: [{ translateY: fireworkBottomPosition }],
                        resizeMode: 'cover'
                    }}
                />
            </Animated.View>
        </View>

    );
};

export default Veniceloadstreets;