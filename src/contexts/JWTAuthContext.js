import React, {
createContext,
useEffect,
useReducer
} from 'react';
import jwtDecode from 'jwt-decode';
import SplashScreen from 'src/components/SplashScreen';
import axios from 'src/utils/axios';
const initialAuthState = {
isAuthenticated:false,
isInitialised:false,
user:null
};
const isValidToken = (accessToken) => {
  if (!accessToken){
    return false;
  }
  const decoded=jwtDecode(accessToken);
  console.log('decoded-token',decoded);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

const setSession=(accessToken,user=null)=>{
console.log('access-token=',accessToken);
  if (accessToken){
    localStorage.setItem('accessToken',accessToken);
    // localStorage.setItem('user',JSON.stringify());
    axios.defaults.headers.common.Authorization=`Bearer ${accessToken}`;
  } 
  else{
    localStorage.removeItem('accessToken');
    // localStorage.removeItem('user',user);
    delete axios.defaults.headers.common.Authorization;
  }

};

const reducer=(state,action)=>{
  switch (action.type) {
    case 'INITIALISE':{
      const {isAuthenticated,user}=action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user
      };
    }
    case 'LOGIN': {
      const {user}=action.payload;
      return {
        ...state,
        isAuthenticated:true,
        user:user
      };

    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated:false,
        user:null
      };
    }
    case 'REGISTER': {
      const {user}=action.payload;
      return {
        ...state,
        isAuthenticated:true,
        user:user
      };
    }
    default:{
      return { 
        ...state
      };
    }

  }
};

const AuthContext=createContext({
  ...initialAuthState,
  method:'JWT',
  login:() => Promise.resolve(),
  logout:() => {},
  register:() => Promise.resolve()
});


export const AuthProvider =({children})=>{
const [state, dispatch]=useReducer(reducer,initialAuthState);
const login=async (username,password)=>{
const response=await axios.post('/api/account/login',{username,password});


// var formdata = new FormData();
// formdata.append("request",JSON.stringify({"username":username,"password":password}));
// var requestOptions={
//   method: 'POST',
//   body: formdata,
// };

// const request=await fetch(`http://158.106.138.189/api1/customerportal/beta/login.py`,requestOptions);
// const response=await request.json();
// const {status,acno,name,message,type}=response;

// try{
// fetch(`http://158.106.138.189/api1/customerportal/beta/login.py`,requestOptions)
// .then(res=>res.json())
// .then(result=>{
//   if(result.status==0){
//     console.log(result.status)
//     // break;
//     // return[400,{message:'100'+result.message}];
//     return [400,{message:'Please check your username and password'}];
//      // return result;
//    }
//    else if(result.status==1){
//     console.log(result.status)
//     return [200,{message:'Please check your username...... and password'}];
// //     setSession(result);

// // dispatch({
// //       type:'LOGIN',
// //       payload:{
// //         result
// //       }
// //     });

//     // break;
//      // const accessToken=jwt.sign(
//      //   {userId:acno},
//      //   JWT_SECRET,
//      //   {expiresIn:JWT_EXPIRES_IN}
//      // );
//        // return [200,{
//        //   accessToken,
//        //   user:response
//        // }];   
//       // return [200,{message:'123'+result.message}];
//        // return result;
//    }
// })
// .catch(err=>{
//   console.log(err);
// })
// }
// catch (err) {
//   console.error(err);
//   return [500, { message: 'Internal server error' }];
// }

const {accessToken,user}=response.data;
localStorage.setItem('user',JSON.stringify(user));
dispatch({
  type:'LOGIN',
  payload:{
  user:user
  }
});
setSession(accessToken,user);
  };

const logout=() => {
setSession(null,null);
dispatch({type:'LOGOUT'});
  };
  const register=async (email, name, password)=>{
  const response=await axios.post('/api/account/register',{
      email,
      name,
      password
    });

    const {accessToken,user}=response.data;
    window.localStorage.setItem('accessToken',accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  useEffect(()=>{
  const initialise=async () =>{
      try {
        const accessToken=window.localStorage.getItem('accessToken');
        const user=JSON.parse(window.localStorage.getItem('user'));
        if(accessToken && isValidToken(accessToken)){
          setSession(accessToken,user);
          // const response=await axios.get('/api/account/me');
          // const { user }=response.data;          
          dispatch({
            type: 'INITIALISE',
            payload:{
              isAuthenticated: true,
              user:user
            }
          });
        } 
        else{
        
          dispatch({
            type:'INITIALISE',
            payload:{
            isAuthenticated:false,
            user: null
            }
          });
        }
      } catch (err){
        // console.log('bbbisssss==catch');
        console.error(err);
        dispatch({
          type: 'INITIALISE',
          payload: {
            isAuthenticated:false,
            user: null
          }
        });
      }
    };
    initialise();
  },[]);
  if (!state.isInitialised) {
  return <SplashScreen />;
  }

  return(
    <AuthContext.Provider
      value={{
      ...state,
      method:'JWT',
      login,
      logout,
      register
      }}

    >
    {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;