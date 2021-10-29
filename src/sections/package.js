/** @jsx jsx */
import React, { useState } from 'react';
import { jsx, Box, Flex } from 'theme-ui';
import { keyframes } from '@emotion/core';
import PriceCard from 'components/home/price-card';
import SectionHeader from 'components/home/section-header';

const packages = {
  instructions: [
    {
      id: 1,
      name: 'INSTRUCTIONS',
      point1: 'Visit our website to fill up your order form, indicating the service you need, ' +
          'the number of pages, and the exact time you need it. Give as detailed instructions as possible.',
    },
  ],
  reserve_funds: [
    {
      id: 1,
      name: 'RESERVE FUNDS',
      point1: 'After filling your order form and placing your order, you get the total order price at the bottom of the order form.',
      point2: 'You can decide to add funds to your wallet or reserve the funds directly from PayPal.',
      point3: 'We will assign your order to the best writer in your field, and he/she will start working on your paper immediately.',
    },
  ],
  completed_work: [
    {
      id: 1,
      name: 'COMPLETED WORK',
      point1: 'After filling your order form and placing your order, you get the total order price at the bottom of the order form.',
      point2: 'You can decide to add funds to your wallet or reserve the funds directly from PayPal.',
      point3: 'We will assign your order to the best writer in your field, and he/she will start working on your paper immediately.',
    },
  ],
  pay_your_writer: [
    {
      id: 1,
      name: 'PAY YOUR WRITER',
      point1: 'After filling your order form and placing your order, you get the total order price at the bottom of the order form.',
      point2: 'You can decide to add funds to your wallet or reserve the funds directly from PayPal.',
      point3: 'We will assign your order to the best writer in your field, and he/she will start working on your paper immediately.',
    },
  ]
};

export default function Package() {
  const { instructions, reserve_funds, completed_work, pay_your_writer } = packages;
  const [state, setState] = useState({
    active: 'instructions',
    openTab: instructions
  })

  const handlePricingPlan = (plan) => {
    if(plan === "reserve_funds"){
      setState({active: "reserve_funds", openTab: reserve_funds})
    }else if (plan === "completed_work"){
      setState({active: "completed_work", openTab: completed_work})
    }else if (plan === "pay_your_writer"){
      setState({active: "pay_your_writer", openTab: pay_your_writer})
    }else{
      setState({active: "instructions", openTab: instructions})
    }
  }
  return (
      <section id="writing-service" sx={{variant: 'section.writingService'}}>
          <SectionHeader
              title="Academic Paper Writing Service"
          /><br/>
          <Flex sx={styles.buttonGroup}>
            <Box sx={styles.buttonGroupInner}>
              <button
                  className={state.active === "instructions" ? 'active' : ''}
                  type='button'
                  aria-label="Monthly"
                  onClick={() => handlePricingPlan('instructions')}
              >
                Instructions
              </button>
              <button
                  className={state.active === "reserve_funds" ? 'active' : ''}
                  type='button'
                  aria-label="Reserve Funds"
                  onClick={() => handlePricingPlan('reserve_funds')}
              >
                Reserve Funds
              </button>
              <button
                  className={state.active === "completed_work" ? 'active' : ''}
                  type='button'
                  aria-label="Completed Work"
                  onClick={() => handlePricingPlan('completed_work')}
              >
                Completed Work
              </button>
              <button
                  className={state.active === "pay_your_writer" ? 'active' : ''}
                  type='button'
                  aria-label="Pay_your_writer"
                  onClick={() => handlePricingPlan('pay_your_writer')}
              >
                Pay Your Writer
              </button>
            </Box>
          </Flex>
          <Box sx={styles.pricingWrapper} className="pricing__wrapper">
              {state.openTab.map((packageData) => (
                  <Box sx={styles.pricingItem} key={packageData.id}>
                    <PriceCard
                        data={packageData}
                    />
                  </Box>
              ))}
          </Box>
      </section>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const fadeIn2 = keyframes`
  from {
    transform: translateY(50%);
    opacity: 0;
  }
  to {
		transform: translateY(0);
    opacity: 1;
  }
`;
const styles = {
  pricingWrapper: {
    mb: '-40px',
    mt: ['20px',null, '-40px'],
    mx: ['20px', null, '50px'],
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    '&.pricing__wrapper .package__card': {
      '.package__header': {
        animation: `${fadeIn} 0.8s ease-in`,
      },
      'ul > li': {
        animation: `${fadeIn2} 0.7s ease-in`,
      },
      '.package__price': {
        animation: `${fadeIn2} 0.9s ease-in`,
      },
      button: {
        animation: `${fadeIn2} 1s ease-in`,
      },
    },
    '.carousel-container': {
      width: '100%',
      '> ul > li ': {
        display: 'flex',
      },
    },
    '.button__group': {
      display: ['flex', null, null, null, 'none'],
      mb: [4, null, null, null, 0],
    },
  },
  pricingItem: {
    mx: 3,
    display: 'flex',
    flexShrink: 0,
    flex: '1 1 auto',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    mb: '7',
    mt: ['15px', '35px'],
    position: 'relative',
    zIndex: 2,
  },
  buttonGroupInner: {
    display: 'flex',
    padding: '7px',
    margin: '0 auto',
    borderRadius: '5px',
    backgroundColor: '#F7F8FB',
    button: {
      border: 0,
      padding: ['15px 20px', '15px 27px'],
      borderRadius: '5px',
      color: 'text',
      fontSize: [1, 2],
      lineHeight: 1.2,
      fontWeight: 500,
      backgroundColor: 'transparent',
      cursor: 'pointer',
      fontFamily: 'body',
      letterSpacing: '-0.24px',
      transition: 'all 0.3s',
      '&.active': {
        color: '#ffffff',
        backgroundColor: 'secondary',
        boxShadow: '0 3px 4px rgba(38, 78, 118, 0.1)',
      },
      '&:focus': {
        outline: 0,
      },
      '&:hover': {
        backgroundColor: 'primary',
        color: 'black',
      },
    },
  },
};
