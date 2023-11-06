import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import ImageInput from "./ImageInput";

function ImageInputList({ imageUris = [], onRemoveImage, onAddImage }) {
    const scrollView = useRef();

    return (
        <View>
            <ScrollView
                ref={scrollView}
                horizontal
                onContentSizeChange={() => scrollView.current.scrollToEnd()}>
                <View style={styles.container}>
                    {imageUris.map((uri) => (
                        <ImageInput
                            key={uri}
                            imageUri={uri}
                            onChangeImage={() => onRemoveImage(uri)}
                        />
                    ))}
                    <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
    },
});

export default ImageInputList;
