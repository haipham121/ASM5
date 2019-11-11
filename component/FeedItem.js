import React, { Component } from 'react';
import { View, Text,StyleSheet,Image, TouchableOpacity, Linking } from 'react-native';
// import { Linking } from 'expo';

export default class FeedItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onPressReadMore = () =>{
        const {
            item:{url}
        } = this.props;
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

    render() {
        const {
           item:{title, urlToImage} 
        } = this.props;
        return (
            <View style={styles.card}>
                <Image source={{uri: urlToImage}} style={styles.image}/>
                <Text>{title}</Text>
                <TouchableOpacity style={styles.button} onPress={this.onPressReadMore}>
                    <Text style={styles.txtButton}>Read more</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    card:{
        flexDirection: "column",
        paddingHorizontal:15,
        paddingVertical:10
    },
    image:{
        width:400,
        height:200
    },
    button:{
        backgroundColor:'#3498db',
        paddingVertical:15,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:20,
        margin:10
    },
    txtButton:{
        fontSize:20,
        color:"#fff"
    }
})
