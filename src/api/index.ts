import deleteApis from './apis/delete';
import get from './apis/get';
import post from './apis/post';
import put from './apis/put';

const apis = {
  get,
  post,
  put,
  delete: deleteApis,
};

export default apis;
