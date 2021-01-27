import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text } from 'react-native-elements';
import { BarChart, XAxis } from 'react-native-svg-charts';

import BackNavigation from '../utils/BackNavigation';

export default function Payments({ route, navigation }) {
   const fill = '#70c1b3';
   const data = [100, 0, 150, 102, 140, 250, 50];
   const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

   return (
      <SafeAreaView>
         <View>
            <BackNavigation route={route} navigation={navigation} />
            <Text style={{ textAlign: 'center' }}>This Week</Text>
            <BarChart
               style={{ height: 300 }}
               data={data}
               showGrid={false}
               animate
               svg={{ fill }}
               contentInset={{ top: 30, bottom: 10 }}
            />
            <XAxis
               data={data}
               formatLabel={(value, index) => week[index]}
               contentInset={{ left: 30, right: 30 }}
               svg={{ fontSize: 13, fontWeight: '600', fill: 'black' }}
            />
            <XAxis
               data={data}
               formatLabel={(value, index) => `$${data[index]}`}
               contentInset={{ left: 30, right: 30 }}
               svg={{ fontSize: 10, fill: 'black' }}
            />
         </View>
      </SafeAreaView>
   );
}
