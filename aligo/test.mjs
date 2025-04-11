/*

{"subject":"mailto: <sunyi233@gmail.com>", "publicKey":"BJUBa8lq1tdUd1G7huF4Gfe_6FGYvZS61B682Qy1vwPUQpUiLtRU4XEc72VGeJavfT4eiPry2jofLK42LFFMEW4", "privateKey":"pcsKBHKv0LAG9ytbn_XdC_WfiSnfLmlNgZ4Q0kMSNdk"}
// https://vapidkeys.com/
*/

import webpush from 'web-push'

// set webpush
webpush.setVapidDetails('mailto:sunyi233@gmail.com', 'BJUBa8lq1tdUd1G7huF4Gfe_6FGYvZS61B682Qy1vwPUQpUiLtRU4XEc72VGeJavfT4eiPry2jofLK42LFFMEW4', 'pcsKBHKv0LAG9ytbn_XdC_WfiSnfLmlNgZ4Q0kMSNdk');

// send
const subscription = {"endpoint":"https://web.push.apple.com/QFUioKCV31aGtK5aQZEOYCG7D1uMgrdZo2-6T_bQmHvF6B1vOcQo7RtNdb9XaBFagdRiLnmuZ5DmV81LfBwcCI5Qz04xQp-6Z0i8qqkFkga3sjL3BlAgHsQcgsyBJSjbec89gbf5_mHgTsyMlkd14UkdaTQga_FGthEo0JXcgbE","keys":{"p256dh":"BH8pr5p6TC96vuiJfNmfQv8O2czAudbERc_P7Nw-RkbDum1anhzj13d-EW1QuKfCsmyAwDnbszQBJrOVr7LWSVg","auth":"UNsvFBPJPpjrzifSh3N57g"}};
const payload = JSON.stringify({title:'Hello!', body:'This is a push notification'});

webpush.sendNotification(subscription, payload).then(response => console.log("Notification sent!")).catch(error => console.error("Error sending notification", error));








































/*

const ThePushSubscriptin = JSON.parse(
    {"endpoint":"https://web.push.apple.com/QHCpkfHc67YMow5yKWIpYeCi66Gr3R9l41bnDU9xEPxKWeUqo8GT_wNnF_Dqe0cdl3FYCRw1TiGToowqspLXegsemRrpi9U5sUckM-9OmE-4V8qX3fwTdWr4N2UpQsfbAW7O1MCvojONp4Qi2N_DNcIF1YihqabQWcHebjYU1A4","keys":{"p256dh":"BPGk9DlvbDeLs54pUgm2beQU_TBjhxvg6p56viKnYpvaMt7KofQgioc1CN0ozieIQhPPjaSS77ySIXe1bwVIT8A","auth":"K8IfSXeXoPA6wN0nampLjQ"}}
);





webpush.sendNotification(ThePushSubscriptin, 'eragaertg');


const {endpoint, keys} = {"endpoint":"https://web.push.apple.com/QHCpkfHc67YMow5yKWIpYeCi66Gr3R9l41bnDU9xEPxKWeUqo8GT_wNnF_Dqe0cdl3FYCRw1TiGToowqspLXegsemRrpi9U5sUckM-9OmE-4V8qX3fwTdWr4N2UpQsfbAW7O1MCvojONp4Qi2N_DNcIF1YihqabQWcHebjYU1A4","keys":{"p256dh":"BPGk9DlvbDeLs54pUgm2beQU_TBjhxvg6p56viKnYpvaMt7KofQgioc1CN0ozieIQhPPjaSS77ySIXe1bwVIT8A","auth":"K8IfSXeXoPA6wN0nampLjQ"}};

webpush.sendNotification({endpoint, keys}, 'msg');


*/


//webpush.sendNotification({ThePushSubscriptin.endpoint, ThePushSubscriptin.keys}, 'eragaertg');






/*



webpush.sendNotification({
    endpoint,
    keys,
}, msg)



//console.log('aergsertga');










    // {"subject":"mailto: <sunyi233@gmail.com>", "publicKey":"BJUBa8lq1tdUd1G7huF4Gfe_6FGYvZS61B682Qy1vwPUQpUiLtRU4XEc72VGeJavfT4eiPry2jofLK42LFFMEW4", "privateKey":"pcsKBHKv0LAG9ytbn_XdC_WfiSnfLmlNgZ4Q0kMSNdk"}
    // https://vapidkeys.com/
*/