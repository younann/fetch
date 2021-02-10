const myForm = document.getElementById('myForm');

myForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const fname = document.getElementById('fname').value;
  const lname = document.getElementById('lname').value;
  const phone = document.getElementById('phone').value;
  const country = document.getElementById('country').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const myData = {
    firstname: fname,
    lastname: lname,
    phone: phone,
    country: country,
    email: email,
    password: password,
  };

  console.log(JSON.stringify(myData));
  const PARTNER_ID = '0000';
  const PARTNER_SECRET_KEY =
    '0000000000000000000000000000000000000000000000000000000000000000';
  const TIME = Math.round(Date.now() / 1000);

  const concatenated_string = PARTNER_ID + TIME + PARTNER_SECRET_KEY;
  const accessKey = require('crypto')
    .createHash('sha1')
    .update(concatenated_string)
    .digest('hex');
  const authData = {
    partnerId: PARTNER_ID,
    time: TIME,
    accesKey: accessKey,
  };
  let token;
  fetch('https://mena-evest.pandats-api.io/api/v3/authorization', {
    method: 'post',
    body: JSON.stringify(authData),
  })
    .then((response) => response.json())
    .then((res) => {
      console.log(res.data.token);
      token = res.data.token;
    })
    .catch((err) => console.error(err));

  let h = new Headers();
  h.append('Authorization', `Bearer ${token}`);
  fetch('https://mena-evest.pandats-api.io/api/v3/customers', {
    method: 'post',
    headers: h,
    body: JSON.stringify(myData),
  })
    .then((respone) => console.log(respone))
    .catch((err) => console.error(err));
});
