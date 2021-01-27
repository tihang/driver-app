/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Switch, View } from 'react-native';
import { Avatar, Overlay, Button, Text } from 'react-native-elements';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';
import * as Permissions from 'expo-permissions';

import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function Dashboard({ navigation }) {
   const LATITUDE_DELTA = 0.0194375;
   const LONGITUDE_DELTA = 0.014375;

   // GO ONLINE OFFLINE FEATURE
   const [isEnabled, setIsEnabled] = useState(false);

   // AGREE TO TERMS MODAL
   const [visible, setVisible] = useState(false);
   const toggleOverlay = () => {
      setVisible(!visible);
   };

   // GET MAP REF (FOR anmiateToRegion)
   const mapRef = useRef(null);
   // MAP HELPER FUNCTION USING REF
   const animateToLocation = (locObj) => {
      mapRef.current.animateToRegion(
         {
            latitude: locObj.coords.latitude,
            longitude: locObj.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
         },
         900 // ANIMATION DURATION IN MS
      );
   };

   // GO ONLINE AND OFFLINE SWITCH
   const toggleSwitch = () => {
      setIsEnabled((previousState) => !previousState);
      setVisible((previousState) => !previousState);
   };

   // LOCATION
   const [location, setLocation] = useState({
      coords: {
         altitude: 12.580001831054688,
         altitudeAccuracy: 10,
         latitude: 40.7831,
         accuracy: 65,
         longitude: -73.9712,
         heading: -1,
         speed: -1,
      },
      timestamp: null,
   });
   const [errorMsg, setErrorMsg] = useState(null);

   useEffect(() => {
      let isSubscribed = true;
      (async () => {
         // ASK FOR LOCATION PERMISSION
         // const { status } = await Location.requestPermissionsAsync();
         const { status } = await Permissions.askAsync(Permissions.LOCATION);

         if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
         }
         // SET LOCATION TO PREV KNOWN LOCATION UNTIL WE GET ACCURATE POSITION
         const prevLocation = await Location.getLastKnownPositionAsync();
         if (isSubscribed) {
            setLocation(prevLocation);
            // ANIMATE TO PREV LOCATION FOR
            animateToLocation(prevLocation);
         }

         // GET CURRENT LOCATION
         const currentLoc = await Location.getCurrentPositionAsync({});
         if (isSubscribed) {
            setLocation(currentLoc);
            // ANIMATE TO LOCATION
            animateToLocation(currentLoc);
         }
      })();
      // CLEANUP FUNCTION IF COMPONENT UNMOUNTED
      // eslint-disable-next-line no-return-assign
      return () => (isSubscribed = false);
   }, []);

   // TODO: Redirect to another view which says turn on location
   let text = 'Waiting for permission';
   if (errorMsg) {
      text = errorMsg;
   } else if (location) {
      // text = JSON.stringify(location);
      text = '';
      // eslint-disable-next-line no-console
      // console.log(location);
   }

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <MainWrapper>
            <HeaderWrapper>
               <Avatar
                  rounded
                  source={{
                     uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                  }}
                  onPress={() => navigation.navigate('Profile')}
               />
               <ActiveSwitchWrapper>
                  <ActiveSwitchText>
                     {isEnabled ? 'Accepting Offers' : 'Go Online'}
                  </ActiveSwitchText>
                  <Switch
                     trackColor={{ false: '#4a4e69', true: '#4a4e69' }}
                     thumbColor={isEnabled ? '#74c69d' : '#e76f51'}
                     style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                     value={isEnabled}
                     onValueChange={toggleOverlay}
                  />
                  {/* CONFIRM TERMS OVERLAY */}
                  <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                     <View>
                        <Text style={{ margin: 30, textAlign: 'center', fontWeight: '600' }}>
                           By going Online/Offline you agree to our terms and conditions.
                        </Text>
                        {!isEnabled ? (
                           <Button
                              buttonStyle={{ backgroundColor: '#74c69d' }}
                              title="Go Online"
                              onPress={toggleSwitch}
                           />
                        ) : (
                           <Button
                              buttonStyle={{ backgroundColor: '#e76f51' }}
                              title="Go Offline"
                              onPress={toggleSwitch}
                           />
                        )}
                     </View>
                  </Overlay>
                  {/* TODO: REDIRECT IF LOCATION OFF STATUS */}
                  <Text>{text}</Text>
               </ActiveSwitchWrapper>
               <FeatherIcon
                  name="message-circle"
                  size={30}
                  color="#4a4e69"
                  onPress={() => navigation.navigate('Chat')}
               />
            </HeaderWrapper>
         </MainWrapper>
         {/* MAP AREA */}
         <View style={{ width: '100%', height: '100%' }}>
            <MapView
               ref={mapRef}
               style={{ width: '100%', height: '85%' }}
               showsUserLocation
               showsMyLocationButton
               minZoomLevel={12.4}
               initialRegion={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
               }}
            />
            <ControlsWrapper style={{ width: '100%', height: '15%' }}>
               <FeatherIcon name="list" size={30} onPress={() => navigation.navigate('Tasks')} />

               <FeatherIcon
                  onPress={() =>
                     // ACCESS MAPVIEW REF AND CHANGE VIEW TO CURRENT LOCATION
                     {
                        animateToLocation(location);
                        Haptics.selectionAsync();
                     }
                  }
                  name="navigation"
                  size={30}
               />
            </ControlsWrapper>
         </View>
      </SafeAreaView>
   );
}

const MainWrapper = styled.View``;

const HeaderWrapper = styled.View`
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   padding: 0px 14px;
`;

const ActiveSwitchWrapper = styled.View`
   display: flex;
   justify-content: center;
   align-items: center;
`;

const ActiveSwitchText = styled.Text`
   margin-bottom: 10px;
   font-weight: 600;
`;

const ControlsWrapper = styled.View`
   display: flex;
   justify-content: space-between;
   flex-direction: row;
   height: 100px;
   padding: 10px 20px;
`;
