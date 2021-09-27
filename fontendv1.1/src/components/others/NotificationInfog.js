import React from 'react';
import {
    Row,
    Notification,

  
  } from 'rsuite';
  
  
  import 'rsuite/dist/styles/rsuite-default.css';
  
export function openParticipateAlert(text) {
    Notification.info({
      title: 'Information',
      duration: 5000,
      description:(<Row style={{ width: 320 }} rows={3} >
          <p >
                {text}
          </p>
      </Row>)
    });
  }
  