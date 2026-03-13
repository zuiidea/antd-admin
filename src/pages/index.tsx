import { useEffect } from 'react';
import { history } from 'umi';

export default function RootRedirect() {
  useEffect(() => {
    try {
      history.replace('/dashboard');
    } catch (e) {
      window.location.href = '/dashboard';
    }
  }, []);
  return null;
}
