import axios from "axios";

export const sent_notification_telegram = (data: Object) => {
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_BOT_NOTIFICATION}/send_notification`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
}