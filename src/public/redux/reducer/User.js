import JWT from 'jwt-decode';

const intialState = {
  items: [],
  isLoading: false,
  isError: false,
  user: [],
  error: '',
  message: '',
};
const user = (state = intialState, action) => {
  switch (action.type) {
    // loading
    case 'LOGIN_PENDING':
    case 'REGISTER_PENDING':
      return {
        ...state, // collect all previous state
        isError: false,
        isLoading: true,
      };
    // berhasil
    case 'LOGIN_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        items: action.payload.data,
        user: JWT(action.payload.data.token),
        message: action.payload.data.message,
      };

    case 'REGISTER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        items: action.payload.data,
      };
    // gagal
    case 'LOGIN_REJECTED':
    case 'REGISTER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload.response.data.message,
      };
    default:
      return state;
  }
};

export default user;
