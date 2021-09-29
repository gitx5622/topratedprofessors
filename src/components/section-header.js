/** @jsx jsx */
import React from 'react';
import { jsx, Box, Text, Heading } from 'theme-ui';

export default function SectionHeader({ title, slogan, isWhite }) {
  return (
      <Box>
        <Text
            as='p'
            sx={{
                fontSize: [0, '13px', null, '14px'],
                textAlign: 'center',
                letterSpacing: ['1.5px', null, '2px'],
                textTransform: 'uppercase',
                fontWeight: '700',
                mb: 2,
                lineHeight: 1.5,
              fontFamily: 'body',
              color: isWhite ? 'white' : 'primary',
              opacity: isWhite ? 0.7 : 1,
            }}>
            <center>{slogan}</center>
        </Text>
        <Heading
            as='p'
            sx={{
                fontSize: ['24px', null, '28px', null, null, '32px', null, '36px'],
                lineHeight: [1.3, null, null, 1.25],
                textAlign: 'center',
                fontWeight: '700',
                letterSpacing: '-.5px',
              fontFamily: 'body',
              color: isWhite ? 'white' : 'heading',
            }}
            >
            <center>{title}</center>
        </Heading>
      </Box>
  );
}
