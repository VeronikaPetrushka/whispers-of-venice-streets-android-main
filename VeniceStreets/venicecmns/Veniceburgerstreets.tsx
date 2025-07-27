import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import { Modal, Text, Image, TouchableOpacity, Animated, Easing, Dimensions } from "react-native";
import { burger } from "../venicecnsts/venisestyles";
import venicemenu from "../venicecnsts/venicemenu";
import { burgerMenu } from "../venicecnsts/venicessts";
import { useEffect, useRef, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";

const { height } = Dimensions.get('window');

type RootStackParamList = {
    VenicerecommendStreets: undefined;
    VenicesavedStreets: undefined;
    VenicemapStreets: undefined;
    VeniceblogStreets: undefined;
};

type VeniceburgerstreetsProps = {
    close: () => void;
    visible: boolean;
};

const Veniceburgerstreets: React.FC<VeniceburgerstreetsProps> = ({ close, visible }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute();
    const isFocused = useIsFocused();
    
    const [activeStreet, setActiveStreet] = useState(route.name);
    const slideAnim = useRef(new Animated.Value(-300)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const overlayRef = useRef(null);

    useEffect(() => {
        if (isFocused) {
            setActiveStreet(route.name);
        }
    }, [isFocused, route.name]);

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 400,
                    easing: Easing.out(Easing.back(1)),
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            slideAnim.setValue(-300);
            fadeAnim.setValue(0);
        }
    }, [visible]);

    const handleNavigation = (routeName: keyof RootStackParamList) => {
        Animated.sequence([
            Animated.timing(slideAnim, {
                toValue: 10,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start(() => {
            close();
            navigation.navigate(routeName);
        });
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="none"
            onRequestClose={close}
        >

            <Animated.View 
                style={[
                    { 
                        transform: [{ translateY: slideAnim }],
                        opacity: fadeAnim,
                        backgroundColor: '#000',
                        paddingTop: height * 0.08
                    }
                ]}
            >
                <Animated.View
                    style={{
                        transform: [{
                            rotate: slideAnim.interpolate({
                                inputRange: [-300, 0],
                                outputRange: ['-180deg', '0deg']
                            })
                        }]
                    }}
                >
                    <TouchableOpacity
                        onPress={close}
                        style={burger.menuButton}
                    >
                        <Image
                            source={burgerMenu}
                            style={burger.menuIcon}
                        />
                    </TouchableOpacity>
                </Animated.View>

                <Text style={burger.title}>Menu</Text>

                {venicemenu.map((item, idx: number) => (
                    <TouchableOpacity
                        key={idx}
                        style={burger.button}
                        onPress={() => handleNavigation(item.venice as keyof RootStackParamList)}
                        activeOpacity={0.7}
                    >
                        <Animated.View style={{
                            transform: [{
                                scale: slideAnim.interpolate({
                                    inputRange: [-300, 0],
                                    outputRange: [0.5, 1],
                                    extrapolate: 'clamp'
                                })
                            }]
                        }}>
                            <Image
                                source={item.icon}
                                style={[
                                    burger.icon,
                                    activeStreet === item.venice && { tintColor: '#FCCB00' }
                                ]}
                            />
                        </Animated.View>
                        <Animated.Text
                            style={[
                                burger.text,
                                activeStreet === item.venice && { color: '#FCCB00' },
                                {
                                    transform: [{
                                        translateX: slideAnim.interpolate({
                                            inputRange: [-300, 0],
                                            outputRange: [-50, 0],
                                            extrapolate: 'clamp'
                                        })
                                    }],
                                    opacity: slideAnim.interpolate({
                                        inputRange: [-300, 0],
                                        outputRange: [0, 1],
                                        extrapolate: 'clamp'
                                    })
                                }
                            ]}
                        >
                            {item.street}
                        </Animated.Text>
                    </TouchableOpacity>
                ))}
            </Animated.View>
        </Modal>
    );
};

export default Veniceburgerstreets;