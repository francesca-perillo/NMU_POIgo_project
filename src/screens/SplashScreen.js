import React, { useEffect, useRef } from 'react'
import {Animated, View, Dimensions} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '../config/colors';
import LoginScreen from './LoginScreen';

const SplashScreen = () => {


    const edges = useSafeAreaInsets();

    const startAnimation = useRef(new Animated.Value(0)).current;

    const scaleLogo = useRef(new Animated.Value(1)).current;
    const scaleTitle = useRef(new Animated.Value(1)).current;

    const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const moveTitle = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const upView = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;


    const contentTransition = useRef(new Animated.Value(Dimensions.get('window').height)).current;
    
    useEffect(() => {

        setTimeout(() => {

            // Parallel Animation...
            Animated.parallel([
                Animated.timing(
                    startAnimation,
                    {
                        // For same Height for non safe Area Devices...
                        toValue: -Dimensions.get('window').height + (edges.top + 70),
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleLogo,
                    {
                        toValue: 0.8,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleTitle,
                    {
                        // Scaling to 0.8
                        toValue: 1,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveLogo,
                    {
                        toValue: {
                            x: 0,
                            y: Dimensions.get('window').height * 1.53
                        },
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    moveTitle,
                    {
                        toValue: {
                            x: 0,
                            y: (Dimensions.get('window').height)
                        },
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    upView,
                    {
                        toValue: {
                            x: 0,
                            y: - Dimensions.get('window').height
                        },
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    contentTransition,
                    {
                        toValue: 0,
                        useNativeDriver: true
                    }
                )
            ])
                .start();

        }, 3000);

    }, [])

    return(
        <View style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        }}>
            <Animated.View style={{
                flex: 1,
                backgroundColor: 'rgba(255,255,255,0)',
                zIndex: 1,
                transform: [
                    { translateY: startAnimation }
                ]
            }}>
                <Animated.View style={{
                    flex: 1,
                    backgroundColor: colors.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [
                        { translateY: upView.y }
                    ]
                }}>
                    <Animated.Image source={require('../../assets/logo.png')}
                        style={{
                            width: 150,
                            height: 150,
                            overflow: 'visible',
                            transform: [
                                { translateX: moveLogo.x },
                                { translateY: moveLogo.y },
                                { scale: scaleLogo },

                            ]
                        }}/>
                    <Animated.Text style={{
                        fontSize: 40,
                        fontWeight: 'bold',
                        color: colors.dark_blue_palette,
                        shadowColor: colors.black,
                        transform: [
                            { translateY: moveTitle.y },
                            { scale: scaleTitle }
                        ]
                    }}>poiGo</Animated.Text>
                </Animated.View>
            </Animated.View>

            <Animated.View style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(255,255,255,0)',
                zIndex: 0,
                transform: [
                    { translateY: contentTransition }
                ]
            }}>
                <View>
                </View>
                <LoginScreen/>

            </Animated.View>
        </View>
        
    )
}

export default SplashScreen;