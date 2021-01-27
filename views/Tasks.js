import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button } from 'react-native-elements';
import BackNavigation from '../utils/BackNavigation';

export default function Tasks({ route, navigation }) {
   return (
      <SafeAreaView style={{ flex: 1 }}>
         <View>
            <BackNavigation route={route} navigation={navigation} />
            <Button disabled title="You dont have any active orders" />
         </View>
      </SafeAreaView>
   );
}
