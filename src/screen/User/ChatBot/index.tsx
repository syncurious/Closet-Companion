import React, { useState, useTransition } from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorBase,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../../components/header';
import Container from '../../../components/container';
import { Colors } from '../../../utitlity/colors';
import Heading from '@/components/heading';
import { SendFilledIcon } from '@/assets';
import { User, SendMessagetoChatBot } from '@/api/handlers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

interface Message {
  thread_id?: string;
  message: string;
  user_id?: string;
  time: Date;
}

interface ChatBotResponse {
  response: string;
  timestamp: string;
}

const ChatBot = ({ route }: any) => {
  const [InputValue, setInputValue] = useState(
    'What should I wear for a business meeting tomorrow?',
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const scrollViewRef = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    const getUserId = async () => {
      const id = await AsyncStorage.getItem('userId');
      setUserId(id);
    };
    getUserId();
  }, []);

  const getMessageHandler = (e: any) => {
    setInputValue(e);
  };
  const sendMessageHandler = async () => {
    if (!userId) {
      console.error('User ID not found');
      return;
    }
    setIsLoading(true);
    const userMessage = InputValue;
    setInputValue('');
    setMessages(p => [
      ...p,
      { message: userMessage, time: new Date(), user_id: userId },
    ]);
    console.log("Message", {
      message: userMessage,
      user_id: userId,
    });

    try {
      const response = (await SendMessagetoChatBot({
        message: userMessage,
        user_id: userId,
      })) as ChatBotResponse;
      setMessages(p => [
        ...p,
        {
          message: response?.response,
          time: new Date(response?.timestamp),
        },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);
  return (
    <React.Fragment>
      <Header route={route} />
      <Container style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
          {messages.map((item, index) => (
            <View
              key={index}
              style={[
                styles.messageContainer,
                {
                  justifyContent: item.user_id ? 'flex-end' : 'flex-start',
                },
              ]}>
              <View style={styles.messageWrapper}>
                <Heading
                  level={6}
                  style={{
                    ...styles.message,
                    backgroundColor: item?.user_id
                      ? Colors.primary
                      : Colors.white + '20',
                  }}>
                  {item?.message}
                </Heading>
                <Text
                  style={[
                    styles.timeText,
                    {
                      textAlign: item?.user_id ? 'right' : 'left',
                    },
                  ]}>
                  {moment(item.time).fromNow()}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Message"
            value={InputValue}
            placeholderTextColor={Colors.white + '60'}
            style={styles.input}
            onChangeText={getMessageHandler}
          />
          {isLoading ? (
            <ActivityIndicator color={Colors.primary} />
          ) : (
            <TouchableOpacity activeOpacity={0.9} onPress={sendMessageHandler}>
              <Image source={SendFilledIcon} style={styles.sendIcon} />
            </TouchableOpacity>
          )}
        </View>
      </Container>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  messageContainer: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  messageWrapper: {
    gap: 5,
  },
  message: {
    borderRadius: 10,
    padding: 8,
  },
  timeText: {
    color: Colors.white + '50',
    fontSize: 10,
    paddingHorizontal: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: Colors.white + '20',
  },
  input: {
    color: Colors.white,
    padding: 20,
    height: 40,
    backgroundColor: Colors.white + '20',
    flex: 10,
    borderWidth: 1,
    borderRadius: 20,
  },
  sendIcon: {
    tintColor: Colors.primary,
    height: 30,
    width: 30,
  },
});

export default ChatBot;
