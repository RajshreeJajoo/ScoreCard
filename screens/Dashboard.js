import {View, Text, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import ScoreCardDashboard from './ScoreCardDashboard';
const Dashboard = () => {
  const [wish, setWish] = useState();
  useEffect(() => {
    const date = new Date();
    const currentTime = date.getHours();
    if (currentTime >= 0 && currentTime < 12) {
      setWish('Good Morning!');
    } else if (currentTime >= 12 && currentTime < 17) {
      setWish('Good Afternoon!');
    } else {
      setWish('Good Evening!');
    }
  }, []);
  return (
    <>
      <View style={{marginTop: '10%', marginLeft: '6%'}}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black'}}>
          {wish}
        </Text>
      </View>
      <View>
        <ScoreCardDashboard />
      </View>
    </>
  );
};

const style = StyleSheet.create({});
export default Dashboard;




// import {View, Text, StyleSheet,TextInput,Button,Linking} from 'react-native';
// import {useEffect, useState} from 'react';

// import ScoreCardDashboard from './ScoreCardDashboard';
// const Dashboard = () => {
//   const [name, setName] = useState();
//   const [password,setPassword] = useState();

//   const setUserName=(event)=>{
//     setName(event)
//   }

//   const setPasswordText=(event)=>{
//     setPassword(event)
//  }
//   const setSubmitButton=()=>{
//     (name && password) && 
//     Linking.openURL('https://www.google.com')
//   }
  
//   return (
//     <>
//       <View style={{marginTop: '10%'}}>
//         <Text style={{textAlign:'center',margin:20}}>Login page</Text>

//         <View style={{borderColor:'black',borderWidth:1,margin:10,padding:5}}>
//         <TextInput placeholder='Enter the username' value={name} onChangeText={(e)=>setUserName(e)}/>
//         </View>

//         <View style={{borderColor:'black',borderWidth:1,margin:10,padding:5}}>
//         <TextInput secureTextEntry placeholder='Enter the password' value={password} onChangeText={(e)=>setPasswordText(e)}/>
//         </View>
        
//            <View style={{backgroundColor:'blue',margin:20,borderRadius:20}}>
//           <Button title = "Sumbit" onPress={()=>setSubmitButton()}/>


// </View>
        

        
//       </View>
//     </>
//   );
// };

// const style = StyleSheet.create({});
// export default Dashboard;
