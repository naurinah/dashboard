import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import mock from 'src/utils/mock';
import wait from 'src/utils/wait';
const JWT_SECRET = 'bisma';
const JWT_EXPIRES_IN = '1 days';
const users = [
  {
    id: '5e86809283e28b96d2d38537',
    avatar: '/static/images/avatars/avatar_6.png',
    canHire: false,
    country: 'USA',
    user:'test',
    email: 'testing@gmail.com',
    isPublic: true,
    name: 'Test User',
    password: 'Password123',
    phone: '+40 777666555',
    role: 'admin',
    state: 'New York',
    tier: 'Premium'
  }
];
mock.onPost('/api/account/login').reply(async (config) => {
  try{
const {username,password}=JSON.parse(config.data); 
var formdata = new FormData();


// mode:'cors',
// headers:{
// 'Access-Control-Allow-Origin':'*',
// "Content-Type":"application/json",
// "Accept":"application/json"
// }


formdata.append("request",JSON.stringify({"username":username,"password":password}));
var requestOptions={
  method: 'POST',
  body: formdata, 
};

const request=await fetch(`http://158.106.138.189/api1/customerportal/beta/login.py`,requestOptions
);
const response=await request.json();
const {status,acno,name,message,type}=response;
if (status==0) {
return [400,{message:message}];
    }
    if (status==1){
      const accessToken = jwt.sign(
            {userId:acno},
            JWT_SECRET,
            {expiresIn:JWT_EXPIRES_IN }
          );
          return [200,{
            accessToken,
            user:{
              "acno":acno,
              "name":name,
              "type":type,
              "password":password
            }
    }]
  }
}
catch (err) {
console.error(err);
return [500,{message:'Internal server error' }];
  }
});
mock.onPost('/api/account/register').reply(async (config) => {
  try {
    await wait(1000);
    const { email, name, password } = JSON.parse(config.data);
    let user = users.find((_user) => _user.email === email);

    if (user) {
      return [400, {message:'User already exists'}];
    }

    user = {
      id: uuidv4(),
      avatar: null,
      canHire: false,
      country: null,
      email,
      isPublic: true,
      name,
      password,
      phone: null,
      role: 'admin',
      state: null,
      tier: 'Standard'
    };
    const accessToken = jwt.sign(
      {userId: user.id},
      JWT_SECRET,
      {expiresIn:JWT_EXPIRES_IN}
    );

    return [200, {
      accessToken,
      user: {
        id: user.id,
        avatar: user.avatar,
        email: user.email,
        name: user.name,
        tier: user.tier
      }
    }];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onGet('/api/account/me').reply((config) => {
  try {
    const { Authorization } = config.headers;

    if (!Authorization) {
      return [401, { message: 'Authorization token missing' }];
    }
    const accessToken = Authorization.split(' ')[1];
    const { userId } = jwt.verify(accessToken, JWT_SECRET);  
    const user = users.find((_user) => _user.id === userId);

    if (!user) {
      return [401, { message: 'Invalid authorization token' }];
    }

    return [200, {
      user: {
        id: user.id,
        avatar: user.avatar,
        email: user.email,
        name: user.name,
        tier: user.tier
      }
    }];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onGet('/api/account/settings').reply(200, {
  settings: {}
});

mock.onGet('/api/account/subscription').reply(200, {
  subscription: {
    name: 'Premium',
    price: 29,
    currency: '$',
    proposalsLeft: 12,
    templatesLeft: 5,
    invitesLeft: 24,
    adsLeft: 10,
    hasAnalytics: true,
    hasEmailAlerts: true
  }
});
