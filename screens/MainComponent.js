// import { useState } from 'react';
// import {
//     Text,
//     View,
//     ScrollView,
//     StyleSheet,
//     Switch,
//     Button,
//     Modal
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker';

// const ReservationScreen = () => {
//     const [campers, setCampers] = useState(1);
//     const [hikeIn, setHikeIn] = useState(false);
//     const [date, setDate] = useState(new Date());
//     const [showCalendar, setShowCalendar] = useState(false);
//     const [showModal, setShowModal] = useState(false);

//     const onDateChange = (event, selectedDate) => {
//         const currentDate = selectedDate || date;
//         setShowCalendar(Platform.OS === 'ios');
//         setDate(currentDate);
//     };

//     const handleReservation = () => {
//         console.log('campers:', campers);
//         console.log('hikeIn:', hikeIn);
//         console.log('date:', date);
//         setShowModal(!showModal);
//     };

//     const resetForm = () => {
//         setCampers(1);
//         setHikeIn(false);
//         setDate(new Date());
//         setShowCalendar(false);
//     };

//     return (
//         <ScrollView>
//             <View style={styles.formRow}>
//                 <Text style={styles.formLabel}>Number of Campers:</Text>
//                 <Picker
//                     style={styles.formItem}
//                     selectedValue={campers}
//                     onValueChange={(itemValue) => setCampers(itemValue)}
//                 >
//                     <Picker.Item label='1' value={1} />
//                     <Picker.Item label='2' value={2} />
//                     <Picker.Item label='3' value={3} />
//                     <Picker.Item label='4' value={4} />
//                     <Picker.Item label='5' value={5} />
//                     <Picker.Item label='6' value={6} />
//                 </Picker>
//             </View>
//             <View style={styles.formRow}>
//                 <Text style={styles.formLabel}>Hike In?</Text>
//                 <Switch
//                     style={styles.formItem}
//                     value={hikeIn}
//                     trackColor={{ true: '#5637DD', false: null }}
//                     onValueChange={(value) => setHikeIn(value)}
//                 />
//             </View>
//             <View style={styles.formRow}>
//                 <Text style={styles.formLabel}>Date:</Text>
//                 <Button
//                     onPress={() => setShowCalendar(!showCalendar)}
//                     title={date.toLocaleDateString('en-US')}
//                     color='#5637DD'
//                     accessibilityLabel='Tap me to select a reservation date'
//                 />
//             </View>
//             {showCalendar && (
//                 <DateTimePicker
//                     style={styles.formItem}
//                     value={date}
//                     mode='date'
//                     display='default'
//                     onChange={onDateChange}
//                 />
//             )}
//             <View style={styles.formRow}>
//                 <Button
//                     onPress={() => handleReservation()}
//                     title='Search Availability'
//                     color='#5637DD'
//                     accessibilityLabel='Tap me to search for available campsites to reserve'
//                 />
//             </View>
//             <Modal
//                 animationType='slide'
//                 transparent={false}
//                 visible={showModal}
//                 onRequestClose={() => setShowModal(!showModal)}
//             >
//                 <View style={styles.modal}>
//                     <Text style={styles.modalTitle}>
//                         Search Campsite Reservations
//                     </Text>
//                     <Text style={styles.modalText}>
//                         Number of Campers: {campers}
//                     </Text>
//                     <Text style={styles.modalText}>
//                         Hike-In?: {hikeIn ? 'Yes' : 'No'}
//                     </Text>
//                     <Text style={styles.modalText}>
//                         Date: {date.toLocaleDateString('en-US')}
//                     </Text>
//                     <Button
//                         onPress={() => {
//                             setShowModal(!showModal);
//                             resetForm();
//                         }}
//                         color='#5637DD'
//                         title='Close'
//                     />
//                 </View>
//             </Modal>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     formRow: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         flex: 1,
//         flexDirection: 'row',
//         margin: 20
//     },
//     formLabel: {
//         fontSize: 18,
//         flex: 2
//     },
//     formItem: {
//         flex: 1
//     },
//     modal: {
//         justifyContent: 'center',
//         margin: 20
//     },
//     modalTitle: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         backgroundColor: '#5637DD',
//         textAlign: 'center',
//         color: '#fff',
//         marginBottom: 20
//     },
//     modalText: {
//         fontSize: 18,
//         margin: 10
//     }
// });

// export default ReservationScreen;

import { Image, Platform, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import DirectoryScreen from "./DirectoryScreen";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";
import ContactScreen from "./ContactScreen";
import { Icon } from "react-native-elements";
import logo from "../assets/images/logo.png";
import { useEffect } from "react";
import { fetchPartners } from '../features/partners/partnersSlice';
import { fetchCampsites } from '../features/campsites/campsitesSlice';
import { fetchPromotions } from '../features/promotions/promotionsSlice';
import { fetchComments } from '../features/comments/commentsSlice';
import { useDispatch } from 'react-redux';

const Drawer = createDrawerNavigator();

const screenOptions = {
  headerTintColor: "#fff",
  headerStyle: { backgroundColor: "#5637DD" },
};

const HomeNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: "Home",
          headerLeft: () => (
            <Icon
              name="home"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const AboutNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="info-circle"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const ContactNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={({ navigation }) => ({
          title: "Contact Us",
          headerLeft: () => (
            <Icon
              name="address-card"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const DirectoryNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Directory" screenOptions={screenOptions}>
      <Stack.Screen
        name="Directory"
        component={DirectoryScreen}
        options={({ navigation }) => ({
          title: "Campsite Directory",
          headerLeft: () => (
            <Icon
              name="list"
              type="font-awesome"
              iconStyle={styles.stackIcon}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="CampsiteInfo"
        component={CampsiteInfoScreen}
        options={({ route }) => ({
          title: route.params.campsite.name,
        })}
      />
    </Stack.Navigator>
  );
};

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={styles.drawerHeader}>
      <View style={{ flex: 1 }}>
        <Image source={logo} style={styles.drawerImage} />
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.drawerHeaderText}>NuCamp</Text>
      </View>
    </View>
    <DrawerItemList {...props} labelStyle={{ fontWeight: "bold" }} />
  </DrawerContentScrollView>
);

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchCampsites());
      dispatch(fetchPromotions());
      dispatch(fetchPartners());
      dispatch(fetchComments());
  }, [dispatch]);


  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
      }}
    >
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={CustomDrawerContent}
        drawerStyle={{ backgroundColor: "#CEC8FF" }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            title: "Home",
            drawerIcon: ({ color }) => (
              <Icon
                name="home"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Directory"
          component={DirectoryNavigator}
          options={{
            title: "Campsite Directory",
            drawerIcon: ({ color }) => (
              <Icon
                name="list"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="About"
          component={AboutNavigator}
          options={{
            title: "About",
            drawerIcon: ({ color }) => (
              <Icon
                name="info-circle"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Contact"
          component={ContactNavigator}
          options={{
            title: "Contact Us",
            drawerIcon: ({ color }) => (
              <Icon
                name="address-card"
                type="font-awesome"
                size={24}
                iconStyle={{ width: 24 }}
                color={color}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: "#5637DD",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    height: 60,
    width: 60,
  },
  stackIcon: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 24,
  },
});

export default Main;
