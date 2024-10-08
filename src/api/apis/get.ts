import makeRequest from '../request';

export default {
  '/test': makeRequest<{ admins: string[] }>({
    url: '/test/{asc}',
    desc: '测试接口',
    notifyWhenFailure: true,
  }),
  '/admins': makeRequest<{ admins: string[] }>({
    url: '/admins',
  }),
  '/delay': makeRequest({
    url: '/delay',
  }),
  '/500-error': makeRequest({
    url: '/500-error',
  }),
  '/account/{username}': makeRequest<
    { id: string; name: string; role: string },
    undefined,
    undefined,
    { username: string }
  >({
    url: '/account/{username}',
  }),
};
