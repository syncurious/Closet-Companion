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
import { User, SendMessagetoChatBot, GetChatBot } from '@/api/handlers';
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

interface ChatHistoryResponse {
  chats: Array<{
    chat_id: string;
    message: string;
    response: string;
    timestamp: string;
    thread_id: string;
  }>;
  total_count: number;
  thread_id: string | null;
}

const ChatBot = ({ route }: any) => {
  const [InputValue, setInputValue] = useState(
    'What should I wear for a business meeting tomorrow?',
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);
  const scrollViewRef = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    const getUserId = async () => {
      const id = await AsyncStorage.getItem('userId');
      setUserId(id);
    };
    getUserId();
  }, []);

  // Fetch chat history when userId is available
  React.useEffect(() => {
    const fetchChatHistory = async () => {
      if (!userId) return;
      
      try {
        setIsLoadingHistory(true);
        const response = await GetChatBot(userId) as ChatHistoryResponse;
        
        if (response?.chats && response.chats.length > 0) {
          const formattedMessages: Message[] = [];
          
          response.chats.forEach((chat) => {
            // Add user message
            if (chat.message) {
              formattedMessages.push({
                message: chat.message,
                time: new Date(chat.timestamp),
                user_id: userId,
                thread_id: chat.thread_id,
              });
            }
            
            // Add bot response
            if (chat.response) {
              formattedMessages.push({
                message: chat.response,
                time: new Date(chat.timestamp),
                thread_id: chat.thread_id,
              });
            }
          });
          
          // Sort messages by timestamp (oldest first)
          formattedMessages.sort((a, b) => a.time.getTime() - b.time.getTime());
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    fetchChatHistory();
  }, [userId]);

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
          {isLoadingHistory ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary} />
              <Text style={styles.loadingText}>Loading chat history...</Text>
            </View>
          ) : messages.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No chat history found</Text>
              <Text style={styles.emptySubText}>Start a conversation with your AI fashion assistant!</Text>
            </View>
          ) : (
            messages.map((item, index) => (
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
            ))
          )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    color: Colors.white,
    fontSize: 16,
    marginTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: 10,
  },
  emptySubText: {
    color: Colors.white + '50',
    fontSize: 12,
  },
});

export default ChatBot;
