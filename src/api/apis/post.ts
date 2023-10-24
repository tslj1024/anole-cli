import makeRequest from '../request';

const method = 'post';

export default {
  '/register': makeRequest<null, { username: string; password: string }>({
    url: '/register',
    method,
  }),
};
