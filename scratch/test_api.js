import axios from 'axios';

async function testApi() {
    try {
        const res = await axios.get('https://apidata.hogoautofilms.co.in/distributor-information/?status=Approved');
        console.log(JSON.stringify(res.data, null, 2));
    } catch (err) {
        console.error(err.message);
    }
}

testApi();
