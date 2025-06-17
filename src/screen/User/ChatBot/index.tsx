import React, {useState, useTransition} from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorBase,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../../components/header';
import Container from '../../../components/container';
import {Colors} from '../../../utitlity/colors';
import Heading from '@/components/heading';
import {SendFilledIcon} from '@/assets';
import {endpoints, SendMessagetoChatBot} from '@/api/handlers';
import axios from 'axios';
import {baseURL} from '@/api';

let myId = 'user123';
interface Message {
  thread_id?: string;
  message: string;
  user_id?: string;
  time: Date;
}
const data: Message[] = [
  {
    thread_id: '114848351681',
    message: "Hey Bot, I'm Joch",
    user_id: '123',
    time: new Date('2025-12-12T10:10:00'),
  },
  {
    thread_id: '114848351681',
    message: "Hey Joch, I'm Bot 😂",
    time: new Date('2025-12-12T10:10:00'),
  },
  {
    thread_id: '114848351681',
    message: 'Okay, Okay',
    user_id: '123',
    time: new Date('2025-12-12T10:11:00'),
  },
];

const ChatBot = ({route}: any) => {
  const [InputValue, setInputValue] = useState(
    'What should I wear for a business meeting tomorrow?',
  );
  const [messages, setMessages] = useState<Message[]>(data);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scrollViewRef = React.useRef<ScrollView>(null);
  const getMessageHandler = (e: any) => {
    console.log(e);
    setInputValue(e);
  };
  const sendMessageHandler = async () => {
    setIsLoading(true);
    setInputValue('');
    setMessages(p => [
      ...p,
      {message: InputValue, time: new Date(), user_id: myId},
    ]);
    axios
      .post(baseURL + endpoints.SEND_MSG_TO_CHAT_BOT, {
        message: InputValue,
        user_id: myId,
      })
      .then(response => {
        setMessages(p => [
          ...p,
          {
            message: response?.data.response,
            time: new Date(response?.data.timestamp),
          },
        ]);
        console.log('Bot response:');
      })
      .catch(error => {
        console.error('Error sending message:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  }, [messages]);
  console.log(messages);
  return (
    <React.Fragment>
      <Header route={route} />
      <Container
        style={{
          flex: 1,
          backgroundColor: Colors.black,
          justifyContent: 'space-between',
          paddingVertical: 15,
        }}>
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
          {messages.map((item, index) => (
            <View
              key={index}
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                justifyContent: item.user_id ? 'flex-end' : 'flex-start',
              }}>
              <View style={{gap: 5}}>
                <Heading
                  level={6}
                  style={{
                    backgroundColor: item?.user_id
                      ? Colors.primary
                      : Colors.white + '20',
                    borderRadius: 10,
                    padding: 8,
                  }}>
                  {item?.message}
                </Heading>
                <Text
                  style={{
                    color: Colors.white + '50',
                    fontSize: 10,
                    paddingHorizontal: 5,
                    textAlign: item?.user_id ? 'right' : 'left',
                  }}>
                  {item.time.toLocaleString()}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            paddingTop: 20,
            borderTopWidth: 1,
            // marginBottom : 30,
            borderColor: Colors.white + '20',
          }}>
          <TextInput
            placeholder="Message"
            value={InputValue}
            placeholderTextColor={Colors.white + '60'}
            style={{
              color: Colors.white,
              padding: 20,
              height: 40,
              backgroundColor: Colors.white + '20',
              flex: 10,
              borderWidth: 1,
              borderRadius: 20,
              // borderColor: Colors.white,
            }}
            onChangeText={getMessageHandler}
          />
          {isLoading ? (
            <ActivityIndicator color={Colors.primary} />
          ) : (
            <TouchableOpacity activeOpacity={0.9} onPress={sendMessageHandler}>
              <Image
                source={SendFilledIcon}
                style={{tintColor: Colors.primary, height: 30, width: 30}}
              />
            </TouchableOpacity>
          )}
        </View>
      </Container>
    </React.Fragment>
  );
};

export default ChatBot;
