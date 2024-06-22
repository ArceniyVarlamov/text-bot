import React, { useEffect } from 'react'
import TextSender from '../components/TextSender';

export default function HomePage() {
  useEffect(() => {
    if (!localStorage.getItem('userKey')) {
      localStorage.setItem('userKey', (Math.floor(Math.random() * (5000000000) + 2000000000)).toString())
    }
  }, [localStorage.getItem('userKey')]);
  
  return (
    <>
      <TextSender></TextSender>
    </>
  )
}
