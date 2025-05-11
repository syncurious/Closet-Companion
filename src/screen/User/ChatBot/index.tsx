import React from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import Header from '../../../components/header';
import Container from '../../../components/container';
import {Colors} from '../../../utitlity/colors';
import Heading from '@/components/heading';
import {SendFilledIcon} from '@/assets';

let myId = '7879451212213';
let data = [
  {
    id: '78132132984',
    room_id: '541321312849',
    sender: '7879451212213',
    reply_of: '114848351681',
    messgae: "Hey Bot, i'am Joch",
    created_at: '12/12/2025 - 10:10 AM',
  },
  {
    id: '78132132984',
    room_id: '541321312849',
    sender: '78794512123',
    reply_of: '114848351681',
    messgae: "Hey Joch, i'am Bot 😂",
    created_at: '12/12/2025 - 10:10 AM',
  },
  {
    id: '78132132984',
    room_id: '541321312849',
    sender: '7879451212213',
    reply_of: '114848351681',
    messgae: 'Okay, Okay',
    created_at: '12/12/2025 - 10:11 AM',
  },
];

const ChatBot = ({route}: any) => {
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
        <View style={{}}>
          {data.map((item, index) => (
            <View
              key={index}
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                justifyContent: item.sender == myId ? 'flex-end' : 'flex-start',
              }}>
              <View style={{gap: 5}}>
                <Heading
                  level={6}
                  style={{
                    backgroundColor:
                      item?.sender == myId
                        ? Colors.primary
                        : Colors.white + '20',
                    borderRadius: 10,
                    padding: 8,
                  }}>
                  {item?.messgae}
                </Heading>
                <Text
                  style={{
                    color: Colors.white + '50',
                    fontSize: 10,
                    paddingHorizontal: 5,
                    textAlign: item?.sender == myId ? 'right' : 'left',
                  }}>
                  {item.created_at}
                </Text>
              </View>
            </View>
          ))}
        </View>
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
            style={{
              color: Colors.white,
              padding: 20,
              height: 40,
              backgroundColor: Colors.white + '20',
              flex: 10,
              // borderWidth: 1,
              borderRadius: 20,
              borderColor: Colors.white,
            }}
          />
          <Image
            source={SendFilledIcon}
            style={{tintColor: Colors.primary, height: 30, width: 30}}
          />
        </View>
      </Container>
    </React.Fragment>
  );
};

export default ChatBot;
