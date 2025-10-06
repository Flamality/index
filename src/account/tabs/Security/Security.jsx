import React, { useEffect, useState } from 'react';
import { account } from '../../../services/appwrite';
import Sessions from './components/Sessions/Sessions';
import PageTitle from '../../components/PageTitle/PageTitle';
import PageContent from '../../components/PageContent/PageContent';
import('./Security.css');
export default function Security() {
  const [sessions, setSessions] = useState(null);
  const [currentSession, setCurrentSession] = useState(null);
  useEffect(() => {
    const getSessions = async () => {
      const res = await account.listSessions();
      const res2 = await account.getSession('current');
      setSessions(res.sessions);
      setCurrentSession(res2);
    };
    getSessions();
  }, []);
  return (
    <PageContent>
      <PageTitle>Security</PageTitle>
      <Sessions data={sessions} current={currentSession} />
    </PageContent>
  );
}
