import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, Image, View, Button } from 'react-native';

import Logo from '../assets/brand-logo.png';

export default function LoginView({ navigation }) {
   const [username, onChangeUsername] = React.useState('');
   const [password, onChangePassword] = React.useState('');

   return (
      <SafeAreaView style={styles.wrapper}>
         <View style={styles.headingContainer}>
            <View style={styles.container}>
               <Image style={styles.logo} source={Logo} />
               <Text style={styles.heading}>Driver</Text>
            </View>

            <TextInput
               style={styles.inputStyle}
               onChangeText={(text) => onChangeUsername(text)}
               value={username}
               autoCapitalize="none"
               placeholder="Username"
            />

            <TextInput
               style={styles.inputStyle}
               onChangeText={(text) => onChangePassword(text)}
               value={password}
               secureTextEntry
               autoCapitalize="none"
               placeholder="Password"
            />
            <View style={styles.loginBtn}>
               <Button
                  title="Log In"
                  color="white"
                  onPress={() => navigation.navigate('Dashboard')}
               />
            </View>
            <View style={styles.signupBtn}>
               <Button title="Sign Up" />
            </View>
            <StatusBar />
         </View>
      </SafeAreaView>
   );
}

// TODO: Use Styled Component classes
const styles = StyleSheet.create({
   wrapper: {
      flex: 1,
      backgroundColor: '#fff',
   },
   container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
   headingContainer: {
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
   },
   logo: {
      width: 300,
      height: 200,
   },
   heading: {
      color: '#829298',
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 30,
   },
   inputStyle: {
      height: 50,
      width: 270,
      margin: 10,
      borderColor: '#829298',
      borderWidth: 0.5,
      borderRadius: 4,
      padding: 10,
   },
   loginBtn: {
      marginTop: 16,
      paddingVertical: 8,
      borderRadius: 1,
      backgroundColor: '#94778B',
      color: 'white',
      textAlign: 'center',
      fontSize: 30,
      width: 200,
      fontWeight: 'bold',
   },
   signupBtn: {
      marginTop: 20,
   },
});
