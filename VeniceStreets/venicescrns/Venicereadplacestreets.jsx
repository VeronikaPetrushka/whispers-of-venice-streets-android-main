import { burger, read, shrd } from "../venicecnsts/venisestyles";
import venicereadloading from "../venicecnsts/venicereadloading";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Veniceburgerstreets from "../venicecmns/Veniceburgerstreets";
import WebView from "react-native-webview";
import { useState, useEffect, useRef } from "react";
import { 
    burgerMenu,
    decor, 
    share, 
    veniceSave, 
    veniceSaved, 
    womenWait 
} from "../venicecnsts/venicessts";
import { 
    View, 
    Image, 
    Text, 
    TouchableOpacity, 
    Share,
    Alert,
    Animated
} from "react-native";

const STORAGE_KEY = 'VENICE_SAVED_PLACES';

const Venicereadplacestreets = ({ place }) => {
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);
    const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!loading) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }).start();
        }
    }, [loading]);

    useEffect(() => {
        const loadSavedStatus = async () => {
            try {
                const savedPlaces = await AsyncStorage.getItem(STORAGE_KEY);
                if (savedPlaces) {
                    const parsedPlaces = JSON.parse(savedPlaces);
                    setIsSaved(parsedPlaces.some(p => p.venicePlace === place.venicePlace));
                }
            } catch (error) {
                console.error('Failed to load saved places:', error);
            }
        };

        loadSavedStatus();
    }, [place.venicePlace]);

    const shareRecommenedPlace = async () => {
        try {
            const shareOptions = {
                title: 'Share this Venice place',
                message: `Check out this place in Venice: ${place.venicePlace}\n\n${place.veniceDesc}`,
                subject: 'Venice Recommendation'
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
            Alert.alert('Error', 'Failed to share place');
            console.error('Error sharing:', error);
        }
    };

    const toggleSavedRecommendStorage = async () => {
        try {
            let savedPlaces = [];
            const storedPlaces = await AsyncStorage.getItem(STORAGE_KEY);
            
            if (storedPlaces) {
                savedPlaces = JSON.parse(storedPlaces);
            }

            if (isSaved) {
                savedPlaces = savedPlaces.filter(p => p.venicePlace !== place.venicePlace);
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedPlaces));
                setIsSaved(false);
                Alert.alert('Success', 'Place removed from saved');
            } else {
                savedPlaces.push(place);
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedPlaces));
                setIsSaved(true);
                Alert.alert('Success', 'Place saved successfully');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to update saved places');
            console.error('Error saving place:', error);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={shrd.container}>

            <Veniceburgerstreets 
                close={() => setOpenBurgerMenu(false)} 
                visible={openBurgerMenu}
            />

            <View style={[
                { 
                    width: '100%'
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
            </View>

            {loading ? (
                <View style={{ width: '100%', flexGrow: 1 }}>
                    <View style={{
                        position: 'absolute', 
                        alignSelf: 'center', 
                        bottom: 550,
                        width: 183,
                        height: 94,
                        backgroundColor: 'transparent'
                    }}>
                        <WebView 
                            source={{ html: venicereadloading }}
                            style={{ flex: 1, backgroundColor: 'transparent' }}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            startInLoadingState={true}
                            containerStyle={{ backgroundColor: 'transparent' }}
                        />
                    </View>
                    <Image
                        source={womenWait}
                        style={{
                            width: 308, 
                            height: 460, 
                            position: 'absolute', 
                            alignSelf: 'center', 
                            bottom: 0
                        }}
                    />
                </View>
            ) : (
                <Animated.View 
                    style={[
                        read.card, 
                        { 
                            opacity: fadeAnim,
                            transform: [{
                                translateY: fadeAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [20, 0]
                                })
                            }],
                            width: '90%',
                            alignSelf: 'center',
                            marginTop: 30
                        }
                    ]}
                >
                    <Image
                        source={place.veniceImage}
                        style={read.image}
                    />
                    <Text style={[read.placeName, {marginLeft: 16}]}>{place.venicePlace}</Text>

                    <Image
                        source={decor}
                        style={{ width: '100%', height: 60, resizeMode: 'contain' }}
                    />

                    <Text style={read.description}>{place.veniceDesc}</Text>

                    <View style={[shrd.row, {justifyContent: 'flex-end', padding: 16}]}>
                        <TouchableOpacity 
                            onPress={shareRecommenedPlace}
                            style={[read.button, {marginRight: 20}]}
                        >
                            <Image source={share} style={read.smallButton} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={toggleSavedRecommendStorage}
                            style={read.button}
                        >
                            <Image
                                source={isSaved ? veniceSaved : veniceSave}
                                style={read.smallButton}
                            />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}
        </View>
    )
};

export default Venicereadplacestreets;