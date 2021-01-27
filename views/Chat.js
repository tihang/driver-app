import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import BackNavigation from '../utils/BackNavigation';

export default function Chat({ route, navigation }) {
   const [modalVisible, setModalVisible] = useState(false);
   const toggleOverlay = () => {
      setModalVisible(!modalVisible);
   };
   return (
      <SafeAreaView style={{ flex: 1 }}>
         <View>
            <BackNavigation route={route} navigation={navigation} />
            <Button title="Start a conversation" onPress={toggleOverlay} />
            <Overlay isVisible={modalVisible} onBackdropPress={toggleOverlay}>
               <Text>Coming soon. We are actively working on chat feature.</Text>
            </Overlay>
         </View>
      </SafeAreaView>
   );
}
