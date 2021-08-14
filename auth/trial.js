import axios from "axios";

var config = {
    method: 'post',
    url: 'https://oauth2.googleapis.com/token?client_id=90654341856-atf699cpl9aovsahv5rdtcsb4d61so6t.apps.googleusercontent.com&client_secret=AgUPchIAN0YjYXZz3KcZxQ9m&grant_type=authorization_code&code=4%2F0AX4XfWgX_zs0ZKb4zldNw3tZu6dqE_p0HlWArAO4clFO-txmP8OFBPBbDYbMtpkRWivwAg&redirect_uri=http://localhost:5000/manual',
    headers: { }
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
