import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './scrreens/app/login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from './scrreens/app/chat';
const Stack = createNativeStackNavigator();




export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='login' screenOptions={{ headerShown: true }} >
          <Stack.Screen name='login' component={Login}  />
          <Stack.Screen name='chat' component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',


  },
});
