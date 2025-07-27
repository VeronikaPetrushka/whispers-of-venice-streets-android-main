import { useNavigation } from "@react-navigation/native";
import { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, Easing, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import veniceinfo from "../venicecnsts/veniceinfo";
import { buttonDecorLeft, buttonDecorRight, decor } from "../venicecnsts/venicessts";
import { info, shrd } from "../venicecnsts/venisestyles";

const Veniceinfostreets = () => {
    const navigation = useNavigation();
    const [currentVeniceIndex, setCurrentVeniceIndex] = useState(0);

    const imageAnim = useRef(new Animated.Value(0)).current;
    const decorAnim = useRef(new Animated.Value(0)).current;
    const textAnim1 = useRef(new Animated.Value(0)).current;
    const textAnim2 = useRef(new Animated.Value(0)).current;
    const textAnim3 = useRef(new Animated.Value(0)).current;
    const textAnim4 = useRef(new Animated.Value(0)).current;
    const buttonAnim = useRef(new Animated.Value(0)).current;
    const buttonDecorLeftAnim = useRef(new Animated.Value(0)).current;
    const buttonDecorRightAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        imageAnim.setValue(0);
        decorAnim.setValue(0);
        textAnim1.setValue(0);
        textAnim2.setValue(0);
        textAnim3.setValue(0);
        textAnim4.setValue(0);
        buttonAnim.setValue(0);
        buttonDecorLeftAnim.setValue(0);
        buttonDecorRightAnim.setValue(0);

        Animated.sequence([
            Animated.timing(imageAnim, {
                toValue: 1,
                duration: 600,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true,
            }),
            
            Animated.parallel([
                Animated.spring(decorAnim, {
                    toValue: 1,
                    friction: 5,
                    useNativeDriver: true,
                }),
                Animated.spring(textAnim1, {
                    toValue: 1,
                    friction: 5,
                    delay: 100,
                    useNativeDriver: true,
                }),
            ]),
            
            currentVeniceIndex === 1 ? Animated.stagger(150, [
                Animated.spring(textAnim2, {
                    toValue: 1,
                    friction: 5,
                    useNativeDriver: true,
                }),
                Animated.spring(textAnim3, {
                    toValue: 1,
                    friction: 5,
                    useNativeDriver: true,
                }),
                Animated.spring(textAnim4, {
                    toValue: 1,
                    friction: 5,
                    useNativeDriver: true,
                }),
            ]) : Animated.delay(0),
            
            Animated.parallel([
                Animated.spring(buttonDecorLeftAnim, {
                    toValue: 1,
                    friction: 5,
                    useNativeDriver: true,
                }),
                Animated.spring(buttonDecorRightAnim, {
                    toValue: 1,
                    friction: 5,
                    useNativeDriver: true,
                }),
                Animated.spring(buttonAnim, {
                    toValue: 1,
                    friction: 5,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, [currentVeniceIndex]);

    const imageTranslateX = imageAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [300, 0]
    });

    const decorScale = decorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1]
    });

    const textTranslateY1 = textAnim1.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 0]
    });

    const textTranslateY2 = textAnim2.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 0]
    });

    const textTranslateY3 = textAnim3.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 0]
    });

    const textTranslateY4 = textAnim4.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 0]
    });

    const buttonScale = buttonAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0.8, 1.1, 1]
    });

    const buttonDecorLeftTranslateX = buttonDecorLeftAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, 0]
    });

    const buttonDecorRightTranslateX = buttonDecorRightAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0]
    });

    const handleNext = () => {
        if (currentVeniceIndex < 2) {
            setCurrentVeniceIndex(prev => prev + 1);
        } else {
            navigation.navigate('VenicerecommendStreets');
        }
    };

    return (
        <View style={shrd.container}>
            <Animated.Image
                source={veniceinfo[currentVeniceIndex].image}
                style={{ 
                    width: 320, 
                    height: currentVeniceIndex === 1 ? 320 : '50%',
                    transform: [{ translateX: imageTranslateX }],
                    opacity: imageAnim,
                    alignSelf: 'center',
                    marginBottom: currentVeniceIndex === 1 ? 40 : 0
                }}
            />

            <View style={info.textContainer}>
                <Animated.Image 
                    source={decor} 
                    style={[
                        info.decor,
                        { 
                            transform: [{ scale: decorScale }],
                            opacity: decorAnim
                        }
                    ]} 
                />

                <Animated.Text 
                    style={[
                        info.text, 
                        {marginBottom: 20},
                        { 
                            transform: [{ translateY: textTranslateY1 }],
                            opacity: textAnim1
                        }
                    ]}
                >
                    {veniceinfo[currentVeniceIndex].desc[0]}
                </Animated.Text>

                {currentVeniceIndex === 1 && (
                    <Animated.Text 
                        style={[
                            info.text,
                            { 
                                transform: [{ translateY: textTranslateY2 }],
                                opacity: textAnim2
                            }
                        ]}
                    >
                        {veniceinfo[currentVeniceIndex].desc[1]}
                    </Animated.Text>
                )}

                {currentVeniceIndex === 1 && (
                    <View style={{width: '100%'}}>
                        <Animated.Text 
                            style={[
                                info.text,
                                { 
                                    transform: [{ translateY: textTranslateY3 }],
                                    opacity: textAnim3
                                }
                            ]}
                        >
                            {veniceinfo[currentVeniceIndex].desc[2]}
                        </Animated.Text>
                        <Animated.Text 
                            style={[
                                info.text,
                                { 
                                    transform: [{ translateY: textTranslateY4 }],
                                    opacity: textAnim4
                                }
                            ]}
                        >
                            {veniceinfo[currentVeniceIndex].desc[3]}
                        </Animated.Text>
                    </View>
                )}

                <View style={{ position: 'absolute', alignSelf: 'center', bottom: 40}}>
                    <Image 
                        source={buttonDecorLeft} 
                        style={[
                            info.buttonDecor,
                            {left: -20}
                        ]} 
                    />
                    <Image 
                        source={buttonDecorRight} 
                        style={[
                            info.buttonDecor, 
                            {right: -20},
                        ]} 
                    />
                    <Animated.View style={{ transform: [{ scale: buttonScale }], alignSelf: 'center' }}>
                        <TouchableOpacity
                            style={info.button}
                            onPress={handleNext}
                            activeOpacity={0.7}
                        >
                            <LinearGradient
                                style={info.gradient}
                                colors={['#CB9920', '#FCCB00', '#FDF3C3']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={info.buttonText}>
                                    {veniceinfo[currentVeniceIndex].button}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </View>
    );
};

export default Veniceinfostreets;