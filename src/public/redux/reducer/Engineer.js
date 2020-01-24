const initialState = {
  engineer: [],
  firstPage: '',
  lastPage: '',
  totalPage: '',
  currentPage: '',
  nextPage: '',
  prevPage: '',
  isLoading: false,
  isError: false,
  user: 'login',
};

const engineer = (state = initialState, action) => {
  switch (action.type) {
    // loading
    case 'CREATE_ENGINEER_PENDING':
    case 'FETCH_ENGINEER_PENDING':
    case 'EDIT_ENGINEER_PENDING':
    case 'DELETE_ENGINEER_PENDING':
      return {
        ...state, // collect all previous state
        isError: false,
        isLoading: true,
      };

    // berhasil
    case 'FETCH_ENGINEER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        engineer: [...action.payload.data.data],
        totalPage: action.payload.data.total_page,
        currentPage: action.payload.data.current_page,
        prevPage: action.payload.data.prevLink.replace(
          '/api/v1/engineers',
          '/engineer',
        ),
        nextPage: action.payload.data.nextLink.replace(
          '/api/v1/engineers',
          '/engineer',
        ),
      };

    case 'CREATE_ENGINEER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        engineer: [...state.engineer, action.payload.data.data],
      };
    case 'EDIT_ENGINEER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        engineer: [
          ...state.engineer.filter(engineer => engineer.id !== action.id),
          action.payload.data.data,
        ],
      };
    case 'DELETE_ENGINEER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        engineer: [
          state.engineer.filter(engineer => engineer.id !== action.id),
        ],
      };
    // gagal
    case 'CREATE_ENGINEER_REJECTED':
    case 'FETCH_ENGINEER_REJECTED':
    case 'EDIT_ENGINEER_REJECTED':
    case 'DELETE_ENGINEER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};

export default engineer;
