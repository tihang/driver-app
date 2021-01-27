import React from 'react';
import { Linking, SafeAreaView, View } from 'react-native';
import styled from 'styled-components';
import { Avatar, ListItem, Button } from 'react-native-elements';

import FeatherIcon from 'react-native-vector-icons/Feather';
import BackNavigation from '../utils/BackNavigation';

export default function Profile({ navigation }) {
   return (
      <SafeAreaView style={{ flex: 1 }}>
         <MainWrapper>
            <BackNavigation navigation={navigation} />
            <ProfileInfo>
               <Avatar
                  rounded
                  size="large"
                  source={{
                     uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                  }}
               />
               <ProfileName>Jane Doe</ProfileName>
               <ProfileDesc>Today&apos;s Earning: $120</ProfileDesc>
            </ProfileInfo>

            <View style={{ margin: 10 }}>
               <Button
                  type="clear"
                  title="Invite friends and get $50"
                  onPress={() =>
                     Linking.openURL(
                        `sms:&body=Hi. This is Jane from Deliveroo. Sign up now and use code 2YX9D for $50 bonus.`
                     )
                  }
               />
            </View>

            {/* PROFILE ACTIONS */}
            <View style={{ marginTop: 10 }}>
               <ListItem style={{ marginTop: 2 }}>
                  <FeatherIcon name="flag" size={20} />
                  <ListItem.Content>
                     <ListItem.Title>Announcement</ListItem.Title>
                  </ListItem.Content>
                  <FeatherIcon name="chevron-right" size={20} />
               </ListItem>

               <ListItem style={{ marginTop: 2 }}>
                  <FeatherIcon name="shopping-bag" size={20} />
                  <ListItem.Content>
                     <ListItem.Title>Order History</ListItem.Title>
                  </ListItem.Content>
                  <FeatherIcon name="chevron-right" size={20} />
               </ListItem>

               <ListItem style={{ marginTop: 2 }} onPress={() => navigation.navigate('Payments')}>
                  <FeatherIcon name="dollar-sign" size={20} />
                  <ListItem.Content>
                     <ListItem.Title>Payment History</ListItem.Title>
                  </ListItem.Content>
                  <FeatherIcon name="chevron-right" size={20} />
               </ListItem>

               <ListItem style={{ marginTop: 2 }}>
                  <FeatherIcon name="map" size={20} />
                  <ListItem.Content>
                     <ListItem.Title>Change Delivery Zone</ListItem.Title>
                  </ListItem.Content>
                  <FeatherIcon name="chevron-right" size={20} />
               </ListItem>
            </View>

            <View style={{ margin: 10 }}>
               <Button
                  type="clear"
                  title="Terms of service"
                  onPress={() => Linking.openURL(`https://deliveroo.co.uk/legal`)}
               />
            </View>

            <View style={{ margin: 'auto' }}>
               <Button
                  titleStyle={{ color: 'salmon' }}
                  type="clear"
                  title="Logout"
                  onPress={() => navigation.navigate('Login')}
               />
            </View>
         </MainWrapper>
      </SafeAreaView>
   );
}

const MainWrapper = styled.View``;

const ProfileInfo = styled.View`
   display: flex;
   justify-content: center;
   align-items: center;
`;

const ProfileName = styled.Text`
   font-weight: 600;
   font-size: 16px;
   padding-top: 6px;
`;

const ProfileDesc = styled.Text`
   font-weight: 200;
   font-size: 12px;
`;
