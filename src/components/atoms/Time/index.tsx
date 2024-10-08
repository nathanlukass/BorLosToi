import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';


// Komponen RealTimeClock
const RealTimeClock = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Menghitung perbedaan waktu UTC dengan zona waktu WITA (UTC+8)
      const utcOffset = now.getTimezoneOffset() * 60000; // Offset in milliseconds
      const witaTime = new Date(now.getTime() + utcOffset + 8 * 3600000); // Tambahkan 8 jam untuk WITA

      const hours = String(witaTime.getHours()).padStart(2, '0');
      const minutes = String(witaTime.getMinutes()).padStart(2, '0');
      const seconds = String(witaTime.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds} WITA`);
    };

    // Update every second
    const intervalId = setInterval(updateTime, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return <Text style={{fontSize: 20, color : 'white', fontWeight: '600'}}>Waktu input harian: {currentTime}</Text>;
};

export default RealTimeClock;
