export const authReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_LOGIN_TOKEN':
        return action.loggedInToken;
      case 'REMOVE_LOGIN_TOKEN':
          console.log('remove token')
        return action.loggedInToken;
      default:
        return state;
    }
  } 