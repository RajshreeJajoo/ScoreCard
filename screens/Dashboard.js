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
