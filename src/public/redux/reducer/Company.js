const initialState = {
  company: [],
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

const Company = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_COPMANY_PENDING':
    case 'FETCH_COMPANY_PENDING':
    case 'EDIT_COMPANY_PENDING':
    case 'DELETE_COMPANY_PENDING':
      return {
        ...state, // collect all previous state
        isError: false,
        isLoading: true,
      };
    case 'FETCH_COMPANY_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        company: [...action.payload.data.data],
        totalPage: action.payload.data.total_page,
        currentPage: action.payload.data.current_page,
        prevPage: action.payload.data.prevLink.replace(
          '/api/v1/company',
          '/copmany',
        ),
        nextPage: action.payload.data.nextLink.replace(
          '/api/v1/company',
          '/company',
        ),
      };
    case 'CREATE_COMPANY_FULFILLED':
      return {
        isLoading: false,
        isError: false,
        company: [...state.company, action.payload.data.data],
      };
    case 'EDIT_ENGINEER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        company: [
          ...state.company.filter(company => company.id !== action.id),
          action.payload.data.data,
        ],
      };
    case 'DELETE_ENGINEER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        company: [...state.company.filter(company => company.id !== action.id)],
      };
    // gagal
    case 'CREATE_COMPANY_REJECTED':
    case 'FETCH_COMPANY_REJECTED':
    case 'EDIT_COMPANY_REJECTED':
    case 'DELETE_COMPANY_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};

export default Company;
