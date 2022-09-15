import apiClient from './apiClient';

// const urlOk = '/login?password=123&email=adam@user.pl';
const urlNot = '/login?password=wrong&email=adam@user.pl';

const getToken = async () => {
  {
    try {
      return await apiClient.get(urlNot);
    } catch (e) {
      console.error(e);
    }
  }
};

export default {
  getToken,
};
