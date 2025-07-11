import {Text, View} from 'react-native';
import Container from '../../../components/container';

const OnBoard = () => {
  return (
    <Container scrollEnabled={false} fullScreen>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'white', fontSize: 20}}>OnBoard</Text>
      </View>
    </Container>
  );
};

export default OnBoard;
