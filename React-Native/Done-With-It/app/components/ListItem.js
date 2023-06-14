import React from "react";
import { View, Image, StyleSheet, TouchableHighlight } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import colors from "../config/colors";
import AppText from "./AppText";
import ListItemDeleteAction from "./ListItemDeleteAction";

function ListItem({
    title,
    subTitle,
    image,
    IconComponent,
    onPress,
    handleDelete = null,
}) {
    return (
        <GestureHandlerRootView>
            <Swipeable
                renderRightActions={() =>
                    handleDelete && (
                        <ListItemDeleteAction onPress={handleDelete} />
                    )
                }>
                <TouchableHighlight
                    underlayColor={colors.light}
                    onPress={onPress}>
                    <View style={styles.container}>
                        {IconComponent}
                        {image && <Image style={styles.image} source={image} />}
                        <View style={styles.detailsContainer}>
                            <AppText style={styles.title} numberOfLines={1}>
                                {title}
                            </AppText>
                            {subTitle && (
                                <AppText
                                    style={styles.subTitle}
                                    numberOfLines={2}>
                                    {subTitle}
                                </AppText>
                            )}
                        </View>
                        <MaterialCommunityIcons
                            color={colors.medium}
                            name="chevron-right"
                            size={25}
                        />
                    </View>
                </TouchableHighlight>
            </Swipeable>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: colors.white,
        alignItems: "center",
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "center",
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    subTitle: {
        color: colors.medium,
    },
    title: {
        fontWeight: "500",
    },
});

export default ListItem;
