import { Platform, StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get('window');

export const FONT = {
  SORTS_MILL_GOUDY: Platform.select({
    ios: 'SortsMillGoudy',
    android: 'SortsMillGoudy-Regular',
  }),
};


export const shrd = StyleSheet.create({

  container: {
    width: '100%',
    height: '100%',
    paddingTop: height * 0.08
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },

  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#FCCB00',
    marginVertical: 10
  }

});


export const info = StyleSheet.create({

  decor: {
    width: 370,
    position: 'absolute',
    top: -40,
    alignSelf: 'center',
    resizeMode: 'contain'
  },

  textContainer: {
    flexGrow: 1,
    backgroundColor: '#000',
    paddingTop: 60,
    paddingHorizontal: 42,
    alignItems: 'center'
  },

  text: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    color: '#fff'
  },

  button: {
    width: 235,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center'
  },

  gradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonDecor: {
    position: 'absolute',
    bottom: 18,
    width: 55,
    height: 55
  },

  buttonText: {
    fontSize: 32,
    color: '#000',
    fontFamily: FONT.SORTS_MILL_GOUDY
  },

});


export const cards = StyleSheet.create({

  container: {
    width: '100%',
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#FCCB00',
    overflow: 'hidden',
    marginBottom: 12
  },

  placeImg: {
    width: '100%',
    height: 183,
    resizeMode: 'cover'
  },

  placeName: {
    position: 'absolute',
    bottom: 12,
    left: 13,
    fontSize: 24,
    color: '#fff',
    fontFamily: FONT.SORTS_MILL_GOUDY,
    lineHeight: 26,
    fontWeight: '400',
  }

});


export const read = StyleSheet.create({

  card: {
    width: '100%',
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#FCCB00',
    backgroundColor: '#000'
  },

  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 22,
    marginBottom: 15
  },

  placeName: {
    fontSize: 24,
    color: '#CB9920',
    fontWeight: '400',
    fontFamily: FONT.SORTS_MILL_GOUDY,
    lineHeight: 26,
    marginBottom: 15
  },

  description: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
    fontSize: 15,
    color: '#fff',
    fontFamily: FONT.SORTS_MILL_GOUDY,
    lineHeight: 22,
    fontWeight: '400',
  },

  smallButton: {
    width: 36,
    height: 33,
    resizeMode: 'contain'
  }

});


export const map = StyleSheet.create({

  card: {
    backgroundColor: '#000',
    paddingTop: 40,
    paddingBottom: 10,
    paddingLeft: 5,
    width: '100%',
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'flex-start', 
    justifyContent: 'space-between'
  },

  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10
  },

  closeIcon: {
    width: 23,
    height: 22,
    resizeMode: 'contain',
  },

  cardImg: {
    width: 131,
    height: 122,
    resizeMode: 'cover',
    borderRadius: 22
  }

});


export const burger = StyleSheet.create({

  menuButton: {
    width: 36,
    height: 33,
    position: 'absolute',
    top: 0,
    left: 20
  },

  menuIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  title: {
    fontSize: 24,
    color: '#CB9920',
    fontFamily: FONT.SORTS_MILL_GOUDY,
    lineHeight: 27,
    fontWeight: '400',
    marginBottom: 37,
    alignSelf: 'center'
  },

  icon: {
    width: 18,
    height: 22,
    resizeMode: 'contain',
    marginRight: 10
  },

  text: {
    fontSize: 20,
    color: '#fff',
    fontFamily: FONT.SORTS_MILL_GOUDY,
    lineHeight: 22,
    fontWeight: '400',
  },

  button: {
    width: '100%',
    padding: 7,
    paddingLeft: 100,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: '#FCCB00',
  }

});

export const darkMap = [
    {
        elementType: 'geometry',
        stylers: [{ color: '#1d2c4d' }]
    },
    {
        elementType: 'labels.text.fill',
        stylers: [{ color: '#8ec3b9' }]
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#1a3646' }]
    },
    {
        featureType: 'administrative.country',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#4b6878' }]
    },
    {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{ color: '#2d2d2d' }]
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{ color: '#3c3c3c' }]
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#383838' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }]
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }]
    }
];