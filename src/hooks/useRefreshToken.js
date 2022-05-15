import axios from 'axios';
import { useRecoilState } from 'recoil';
import { get, post } from '../config';
import authAtom from '../recoil/auth';

const useRefreshToken = () => {
  const [_, setAuth] = useRecoilState(authAtom);

  const refresh = async () => {
    const res = await post('/token/refresh', {
      withCredentials: true,
    });
    setAuth(prev => {
      console.log(prev);
      console.log(res.data.accessToken);
      return { ...prev, accessToken: res.data.accessToken };
    });
    return res.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
