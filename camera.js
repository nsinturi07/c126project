import React, { Component } from 'react'
import { Button, Text, Touchable, TouchableOpacity, View, Platform } from 'react-native'

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export class PickImage extends Component {
    state={image:null}
    getPermissionAsync = async () => {
        if (Platform.OS !== "web") {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
          }
        }
      };

    componentDidMount(){
        this.getPermissionAsync()
    }
    uploadImage=async(uri)=>{
        var data= new FormData()
        let filename = uri.split("/")[uri.split("/").length - 1]
    let type = `image/${uri.split('.')[uri.split('.').length - 1]}`
    var fileToUpload={
        uri:uri,
        name:filename,
        type:type
    }
    data.append("digit", fileToUpload)
    fetch("https://c88d-2600-1700-550-b760-f95f-44e5-e837-5c4e.ngrok.io ", {
      method:"POST",
      body:data,
      headers:{
        "content-type":"multipart/form-data"
      }
    })
    .then(response=>response.json())
    }
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            this.setState({ image: result.data });
           // console.log(result.uri)
            this.uploadImage(result.uri);
          }
      };
    render() {
        return (
            
            <View>
            <Button
            title="image"
            onPress={this.PickImage}
            />

            </View>
        )
    }
}

export default PickImage
