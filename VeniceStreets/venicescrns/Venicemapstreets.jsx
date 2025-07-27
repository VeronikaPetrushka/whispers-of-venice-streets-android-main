import { useNavigation } from "@react-navigation/native";
import { burger, darkMap, info, map, read, shrd } from "../venicecnsts/venisestyles";
import { burgerMenu, buttonDecorLeft, buttonDecorRight, close, decor } from "../venicecnsts/venicessts";
import Veniceburgerstreets from "../venicecmns/Veniceburgerstreets";
import MapView, { Marker } from 'react-native-maps';
import venicerecommend from "../venicecnsts/venicerecommend";
import { View, Image, Text, TouchableOpacity, Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useState, useEffect, useRef } from "react";

const VenicePlace = ({ place, setReadplace }) => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(100)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 8,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const closeCard = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 100,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start(() => setReadplace(false));
    };

    return (
        <Animated.View style={[
            map.card, 
            { 
                position: 'absolute', 
                alignSelf: 'center', 
                bottom: 40, 
                width: '90%',
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
            }
        ]}>
            <Image source={decor} style={info.decor} />

            <TouchableOpacity
                style={map.closeButton}
                onPress={closeCard}
            >
                <Image source={close} style={map.closeIcon} />
            </TouchableOpacity>

            <Image source={place.veniceImage} style={map.cardImg} />
            <View style={{width: '60%'}}>

                <Text style={[read.placeName, {fontSize: 18, fontWeight: '500'}]}>{place.venicePlace}</Text>
                <View style={[shrd.line, {marginVertical: 5}]} />
                <Text
                    style={[read.description, {marginBottom: 30}]}
                    numberOfLines={1}
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
        </Animated.View>
    );
};

const Venicemapstreets = () => {
    const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
    const [selectedMapSight, setSelectedMapSight] = useState(null);
    const [readPlace, setReadplace] = useState(false);
    const mapRef = useRef(null);
    const markerAnimations = useRef(venicerecommend.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        const animateMarkers = () => {
            markerAnimations.forEach((anim, index) => {
                Animated.sequence([
                    Animated.delay(index * 100),
                    Animated.spring(anim, {
                        toValue: 1,
                        friction: 5,
                        useNativeDriver: true,
                    })
                ]).start();
            });
        };

        animateMarkers();
    }, [selectedMapSight]);

    const animateToLocation = (coordinates) => {
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: coordinates[0],
                longitude: coordinates[1],
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            }, 1000);
        }
    };

    const handleMarkerPress = (place, index) => {
        setSelectedMapSight(place);
        setReadplace(true);
        animateToLocation(place.veniceCoordinates);
        
        markerAnimations[index].setValue(0);
        Animated.spring(markerAnimations[index], {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={shrd.container}>
            <Veniceburgerstreets
                close={() => setOpenBurgerMenu(false)}
                visible={openBurgerMenu}
            />

            <Animated.View style={[{ width: '100%' }]}>
                <TouchableOpacity
                    onPress={() => setOpenBurgerMenu(true)}
                    style={burger.menuButton}
                >
                    <Image
                        source={burgerMenu}
                        style={burger.menuIcon}
                    />
                </TouchableOpacity>
                <Text style={burger.title}>Interactive map</Text>
            </Animated.View>

            <MapView
                ref={mapRef}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 45.4375,
                    longitude: 12.3358,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.009,
                }}
                provider="google"
                customMapStyle={darkMap}
            >
                {venicerecommend.map((place, index) => (
                    place.veniceCoordinates && (
                        <Marker
                            key={`marker-${index}`}
                            coordinate={{
                                latitude: place.veniceCoordinates[0],
                                longitude: place.veniceCoordinates[1]
                            }}
                            onPress={() => handleMarkerPress(place, index)}
                        >
                            <View style={{width: 20, height: 20, backgroundColor: '#FCCB00', borderRadius: 100, borderWidth: 2, borderColor: '#000'}}/>
                        </Marker>
                    )
                ))}
            </MapView>

            {selectedMapSight && readPlace && (
                <VenicePlace place={selectedMapSight} setReadplace={setReadplace} />
            )}
        </View>
    );
};

export default Venicemapstreets;