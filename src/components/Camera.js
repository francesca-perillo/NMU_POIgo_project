import React, { useEffect, useState } from "react";
import { View, StyleSheet, Modal, TouchableOpacity, Dimensions, Platform } from "react-native";
import { Camera, PermissionStatus } from 'expo-camera';

const CameraCapture = ({ onCapturePhoto }) => {
    const [camera, setCamera] = useState(null);
    // Screen Ratio and image padding
    const [imagePadding, setImagePadding] = useState(0);
    const [ratio, setRatio] = useState('4:3');  // default is 4:3
    const { height, width } = Dimensions.get('window');
    const screenRatio = height / width;
    const [isRatioSet, setIsRatioSet] = useState(false);

    const checkCameraPermission = async () => {
        const { status } = await Camera.requestPermissionsAsync()

        console.log('status', status)

        if (status !== PermissionStatus.GRANTED)
            console.log("Access denied")
    }

    // set the camera ratio and padding.
    // this code assumes a portrait mode screen
    const prepareRatio = async () => {
        let desiredRatio = '4:3';  // Start with the system default
        // This issue only affects Android
        if (Platform.OS === 'android') {
            const ratios = await camera.getSupportedRatiosAsync();

            // Calculate the width/height of each of the supported camera ratios
            // These width/height are measured in landscape mode
            // find the ratio that is closest to the screen ratio without going over
            let distances = {};
            let realRatios = {};
            let minDistance = null;
            for (const ratio of ratios) {
                const [ratioA, ratioB] = ratio.split(':');
                const realRatio = parseInt(ratioA) / parseInt(ratioB);
                realRatios[ratio] = realRatio;
                // ratio can't be taller than screen, so we don't want an abs()
                const distance = screenRatio - realRatio;
                distances[ratio] = realRatio;
                if (minDistance == null) {
                    minDistance = ratio;
                } else {
                    if (distance >= 0 && distance < distances[minDistance]) {
                        minDistance = ratio;
                    }
                }
            }
            // set the best match
            desiredRatio = minDistance;
            //  calculate the difference between the camera width and the screen height
            const remainder = Math.floor(
                (height - realRatios[desiredRatio] * width) / 2
            );
            // set the preview padding and preview ratio
            setImagePadding(remainder);
            setRatio(desiredRatio);
            // Set a flag so we don't do this 
            // calculation each time the screen refreshes
            setIsRatioSet(true);
        }
    };

    // the camera must be loaded in order to access the supported ratios
    const setCameraReady = async () => {
        if (!isRatioSet) {
            await prepareRatio();
        }
    };

    useEffect(() => {
        checkCameraPermission();
    }, []);

    const takePicture = async () => {
        if (!camera) return;

        const options = {
            quality: 0,
            base64: true,
            fixOrientation: true,
            width: 180, 
            height: 180, 
        };

        const photo = await camera.takePictureAsync(options);
        onCapturePhoto(photo);
    };
        
    if (!onCapturePhoto)
        onCapturePhoto = () => { }

    return (
        <Modal>
            <Camera
                ref={setCamera}
                onCameraReady={setCameraReady}
                ratio={ratio}
                style={styles.camera}
            >
                <View style={styles.buttonCameraContainer}>
                    <View style={styles.buttonCameraView}>
                        <TouchableOpacity style={styles.buttonCamera} onPress={takePicture} />
                    </View>
                </View>
            </Camera>
        </Modal>
    );
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
    buttonCameraContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        padding: 20,
        justifyContent: 'space-between'
    },
    buttonCameraView: {
        alignSelf: 'center',
        flex: 1,
        alignItems: 'center'
    },
    buttonCamera: {
        width: 70,
        height: 70,
        bottom: 0,
        borderRadius: 50,
        backgroundColor: '#fff'
    }
});

export default CameraCapture;