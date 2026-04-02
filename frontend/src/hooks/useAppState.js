import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const useAppState = () => {
  const [globalState, setGlobalState] = useState({ totalClicks: 0, totalUsers: 0, mood: 'calm' });
  const [userState, setUserState] = useState({ clicks: 0, visitCount: 0 });
  const [eventMessage, setEventMessage] = useState('');

  // Load and sync states
  useEffect(() => {
    const visits = parseInt(localStorage.getItem('visitCount') || '0', 10);
    const clicks = parseInt(localStorage.getItem('userClicks') || '0', 10);
    const isNewUser = visits === 0;

    const newVisitCount = visits + 1;
    localStorage.setItem('visitCount', newVisitCount.toString());
    setUserState({ clicks, visitCount: newVisitCount });

    const fetchState = () => {
        axios.get(`${API_BASE}/state?newUser=${isNewUser}`).then(res => {
          if (res.data.success) setGlobalState(prev => ({ ...prev, ...res.data.data }));
        }).catch(err => console.error("API link failed: ", err));
    };

    fetchState();
    const interval = setInterval(fetchState, 3000); // Poll explicitly matching physical changes externally tracking global triggers exactly
    return () => clearInterval(interval);
  }, []);

  const handleClick = async () => {
    const newClicks = userState.clicks + 1;
    localStorage.setItem('userClicks', newClicks.toString());
    setUserState(prev => ({ ...prev, clicks: newClicks }));

    try {
      const res = await axios.post(`${API_BASE}/click`);
      if (res.data.success) {
        setGlobalState(prev => ({ ...prev, ...res.data.data }));
        if (res.data.data.eventMessage) {
          setEventMessage(res.data.data.eventMessage);
        }
      }
    } catch (err) {
      console.error("Click sync failed: ", err);
    }
  };

  return { globalState, userState, eventMessage, handleClick, setEventMessage };
};
