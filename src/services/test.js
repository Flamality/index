import { Query } from 'appwrite';
import { databases } from './appwrite';

export const checkUsername = async (input, setUsernameError) => {
  setUsernameError(null);
  if (input.length > 32) {
    setUsernameError('Username must be at most 32 characters.');
    return false;
  }
  if (input.length < 3) {
    setUsernameError('Username must be at least 3 characters.');
    return false;
  }
  const usernameRegex = /^[a-z0-9._]+$/;
  if (!usernameRegex.test(input)) {
    setUsernameError('Username must be alphanumeric (or . and _)');
    return false;
  }
  const taken = await databases.listDocuments('main', 'users', [
    Query.equal('username', input),
  ]);
  if (taken.total > 0) {
    setUsernameError('Username is already in use.');
    return false;
  }
  return true;
};

export const checkEmail = async (input, setEmailError) => {
  setEmailError(null);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(input)) {
    setEmailError('Please enter a valid email address.');
    return false;
  }
  const taken = await databases.listDocuments('main', 'users', [
    Query.equal('email', input),
  ]);
  if (taken.total > 0) {
    setEmailError('Email is already in use.');
    return false;
  }
  return true;
};
export const checkPassword = (input, setPasswordError) => {
  setPasswordError(null);

  if (input.length < 8) {
    setPasswordError('Password must be at least 8 characters.');
    return false;
  }
  if (input.length > 128) {
    setPasswordError('Password must be less than 128 characters.');
    return false;
  }
  if (!/[A-Z]/.test(input)) {
    setPasswordError('Password must have at least one uppercase letter.');
    return false;
  }
  if (!/[a-z]/.test(input)) {
    setPasswordError('Password must have at least one lowercase letter.');
    return false;
  }
  if (!/[0-9]/.test(input)) {
    setPasswordError('Password must have at least one number.');
    return false;
  }
  if (!/[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]/.test(input)) {
    setPasswordError('Password must have at least one symbol.');
    return false;
  }

  return true;
};
export const checkConfirmPassword = (password, confirm, setConfirmError) => {
  setConfirmError(null);
  if (confirm !== password) {
    setConfirmError('Passwords do not match.');
    return false;
  }
  return true;
};
