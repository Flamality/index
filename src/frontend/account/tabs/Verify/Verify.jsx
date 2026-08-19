import React, { useEffect, useState } from 'react';
import PageContent from '../../components/PageContent/PageContent';
import { useLocation } from 'react-router-dom';
import { account } from '../../../services/appwrite';
import Spinner from '../../../components/core/elements/Spinner';
import { FaCheck, FaXmark } from 'react-icons/fa6';

import './Verify.css';

export default function Verify() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const UID = searchParams.get('userId');
  const secret = searchParams.get('secret');

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setSuccess(false);
    if (!UID || !secret) {
      setSuccess(false);
      setLoading(false);
      return;
    }
    const verifyEmail = async () => {
      try {
        await account.updateVerification(UID, secret);
        setSuccess(true);
        setLoading(false);
      } catch (error) {
        setSuccess(false);
        setLoading(false);
      }
    };
    verifyEmail();
  }, [UID, secret]);
  return (
    <div className="account-verify">
      {loading ? (
        <>
          <h1 className="account-verify-text account-verify-loading">
            Verifying account
          </h1>
          <Spinner />
        </>
      ) : success ? (
        <>
          <h1 className="account-verify-text account-verify-success">
            Account verified!
          </h1>
          <FaCheck />
        </>
      ) : (
        <>
          <h1 className="account-verify-text account-verify-error">
            Couldn't verify account.
          </h1>
          <FaXmark />
        </>
      )}
    </div>
  );
}
