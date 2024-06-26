import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// context
import { useAuth } from '../contexts/useAuth';
// screen
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import MainStack from './MainStack';

const Stack = createNativeStackNavigator();

const RootStack = () => {
	const { isLoggedIn } = useAuth();
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
				initialRouteName="Welcome"
			>
				{!isLoggedIn ? (
					<>
						<Stack.Screen name="Welcome" component={Welcome} />
						<Stack.Screen name="Login" component={Login} />
						<Stack.Screen name="Signup" component={Signup} />
					</>
				) : (
					<Stack.Screen name="Main" component={MainStack} />
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default RootStack;
