import axios from 'axios';
import jsonsql from 'jsonsql';

// axios.defaults.baseURL = '';

// 请求拦截
// axios.interceptors.request.use(config => {
//   return config;
// });

// 响应拦截
// axios.interceptors.response.use(config => {
//   return config;
// });

export const getAbout = () => {
  return axios.get('/md/about.md');
};

export const apiList = () => {
  return axios.get('/api.json');
};

export const getInterface = async (id: number) => {
  const { data: res } = await apiList();

  if (!res || !res.api) {
    return false;
  }

  const data = jsonsql(res.api, `* where id=${id}`);

  if (data.length === 0) {
    return false;
  }
  return data[0];
};

export const getAPI = (path: string) => {
  return axios.get(path);
};

export const getSearch = async (title: string) => {
  const { data: res } = await apiList();

  if (!res || !res.api) {
    return [];
  }

  res.api.forEach((item: { bigTitle: string; api名称: string }) => {
    item.bigTitle = item.api名称.toLocaleUpperCase().replace(/ /g, '');
  });

  const data = jsonsql(
    res.api,
    `* where bigTitle ~ ${title.toLocaleUpperCase().replace(/ /g, '')}`
  );
  if (data.length === 0) {
    return [];
  }
  return data;
};
