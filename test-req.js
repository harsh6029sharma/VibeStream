import fs from 'fs';

fs.writeFileSync('test_avatar.jpg', 'fake image content');
fs.writeFileSync('test_cover.jpg', 'fake image content');

const formData = new FormData();
formData.append('fullName', 'John Doe');
formData.append('email', 'johndoe' + Date.now() + '@example.com');
formData.append('username', 'johndoe' + Date.now());
formData.append('password', 'secretpassword');

const avatarFile = new Blob([fs.readFileSync('test_avatar.jpg')]);
formData.append('avatar', avatarFile, 'test_avatar.jpg');

const coverFile = new Blob([fs.readFileSync('test_cover.jpg')]);
formData.append('coverImage', coverFile, 'test_cover.jpg');

fetch('http://localhost:8000/api/v1/users/register', {
    method: 'POST',
    body: formData
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
