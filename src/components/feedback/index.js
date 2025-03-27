import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../buttons';
import { Card } from '../card';

const FeedbackWidget = ({ pagePath }) => {
  const [helpful, setHelpful] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleFeedback = async (feedback) => {
    setHelpful(feedback);
    setError(null);
    const success = await sendFeedback(pagePath, feedback);
    if (success) {
      setSuccess(true);
    }
  };

  const sendFeedback = async (pagePath, helpful) => {
    const url = `https://${process.env.GATSBY_FRESHDESK_DOMAIN}/api/v2/custom_objects/schemas/${process.env.GATSBY_FRESHDESK_SCHEMA_ID}/records`;

    const data = {
      data: {
        name: uuidv4(),
        page_path: pagePath,
        timestamp: new Date().toISOString().split('T')[0],
        helpful: helpful
      }
    };

    try {
      console.log('Sending feedback:', data);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(process.env.GATSBY_FRESHDESK_API_KEY + ':X')}`
        },
        body: JSON.stringify(data)
      });
      
      const responseData = await response.json();
      console.log('response data:', responseData);
      
      if (!response.ok) {
        console.error('Error submitting feedback:', response.status, responseData);
        setError(`Submission failed: ${responseData.message || response.statusText}`);
        return false;
      }

      console.log('Feedback submitted successfully:', responseData);
      return true;
    } catch (error) {
      console.error('Network error:', error);
      setError('Network error: Unable to submit feedback. Please try again.');
      return false;
    }
  };

  return (
    <Card style={{ padding: '1rem 2rem', maxWidth: '600px', margin: 'auto' }}>
      {success ? (
        <Typography variant="h6" color="primary">
          Thank you for your feedback!
        </Typography>
      ) : (
        <Box gap={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1" gutterBottom>
              Was this page useful?
            </Typography>
            <Button onClick={() => handleFeedback("1")} style={{ backgroundColor: 'var(--color-blueberry-dark)' }}>
              Yes
            </Button>
            <Button onClick={() => handleFeedback("0")} style={{ backgroundColor: 'var(--color-blueberry-dark)' }}>
              No
            </Button>
          </Box>
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
        </Box>
      )}
    </Card>
  );
};

export default FeedbackWidget;
