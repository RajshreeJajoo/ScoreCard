import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screens/Dashboard';
import React from 'react';
import ScoreCardDashboard from '../screens/ScoreCardDashboard';
import ScoreCard from '../screens/ScoreCard';
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} 
      options={{
        headerShown: false,
      }}/>
       <Stack.Screen name="ScoreCardDashboard" component={ScoreCardDashboard}  options={{
        headerShown: false,
      }}/>
      <Stack.Screen name="ScoreCard" component={ScoreCard}  
      options={{
        headerShown: true,
      }} 
      
      /> 


    </Stack.Navigator>
  );
}


export default MyStack;