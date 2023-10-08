import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Button, Card} from 'react-native-paper';
import {useState} from 'react';
import Slider from 'react-native-slider';

const ScoreCard = ({route}) => {
  const [scoredetail, setDetail] = useState(route.params.detail);
  const [modifyScore,setModifyScore] = useState(scoredetail.scoreInPercentage)
  return (
    <>
      <View style={{margin: '3%', backgroundColor: 'white'}}>
        <Card style={{backgroundColor: 'white'}}>
          <Card.Title
            title={scoredetail.firstName}
            subtitle= {scoredetail.section.charAt(0).toUpperCase() + scoredetail.section.slice(1)}
            left={props => (
              <Avatar.Text
                {...props}
                size={40}
                label={scoredetail.firstName[0].toUpperCase()}
                backgroundColor={
                  scoredetail.section === 'science' ? '#FA661B' : '#FBB03B'
                }
              />
            )}
          />
          <Card.Content>
            <Text style={style.textStyle}>
              Score : {modifyScore.toFixed(0)}%
            </Text>

            <Slider
              value={modifyScore / 10}
              minimumValue={0}
              thumbTintColor="#19BDFF"
              maximumValue={10}
              minimumTrackTintColor="#19BDFF"
              maximumTrackTintColor="#d3d3d3"
             onValueChange={value => 
                { 
                    setModifyScore(value*10)
                    console.log(value)
                }
             }
            />
            <View style={{flexDirection: 'row'}}>
              <Text style={style.textStyle}>Result:</Text>
              <View style={{marginLeft: 'auto'}} />
              <Text style={[style.textStyle, {fontWeight: '400'}]}>
                {modifyScore > 39 ? 'Pass' : 'Fail'}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  textStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ScoreCard;
