import React from 'react';
import { Text, Linking } from 'react-native';

const urlRegex = /\b((https?:\/\/|www\.)[^\s<>()\[\]{}"'`,;:!?]*)/gi;

const LinkifyText = ({ text }: { text: string }) => {
  const elements = [];
  let lastIndex = 0;

  const matches = [...text.matchAll(urlRegex)];

  matches.forEach((match, index) => {
    const url = match[0];
    const start = match.index ?? 0;

    // Add plain text before the link
    if (start > lastIndex) {
      elements.push(
        <Text key={`text-${index}`}>{text.slice(lastIndex, start)}</Text>
      );
    }

    // Clean URL of trailing punctuation
    const trailingChars = /[.,;:!?)]+$/;
    const cleanedUrl = url.replace(trailingChars, '');

    // Real URL to open
    const openUrl = cleanedUrl.startsWith('http')
      ? cleanedUrl
      : 'https://' + cleanedUrl;

    elements.push(
      <Text
        key={`link-${index}`}
        style={{ color: '#6565ff', textDecorationLine: 'underline' }}
        onPress={() => {console.log(openUrl) ; Linking.openURL(openUrl)}}
      >
        {cleanedUrl}
      </Text>
    );

    lastIndex = start + url.length;
  });

  // Add remaining text after last link
  if (lastIndex < text.length) {
    elements.push(<Text key="last-text">{text.slice(lastIndex)}</Text>);
  }

  return (
    <Text selectable>
      {elements}
    </Text>
  );
};

export default LinkifyText;