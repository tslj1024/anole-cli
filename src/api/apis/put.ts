import makeRequest from '../request';

const method = 'put';
export default {
  '/password': makeRequest<null, { password: string }, { username: string }>({
    url: '/password',
    method,
  }),
};
