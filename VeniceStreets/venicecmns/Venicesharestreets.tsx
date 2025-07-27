import React from 'react';
import { ImageBackground, View, StyleProp, ViewStyle } from 'react-native';
import { background } from "../venicecnsts/venicessts";

interface VenicesharestreetsProps {
    veniceroute: React.ReactNode;
}

const Venicesharestreets: React.FC<VenicesharestreetsProps> = ({ veniceroute }) => {
    const backgroundStyle: StyleProp<ViewStyle> = { flex: 1 };
    
    return (
        <ImageBackground source={background} style={backgroundStyle}>
            <View style={{ flex: 1 }}>
                {veniceroute}
            </View>
        </ImageBackground>
    );
};

export default Venicesharestreets;