import {
useEffect,
useState,
} from "react";

import DashboardLayout
from "../layouts/DashboardLayout";

import NotificationCard
from "../components/notifications/NotificationCard";

import {

getNotifications,

markAsRead,

markAllRead,

}
from "../services/notificationService";

function Notifications() {

const [
notifications,
setNotifications,
] = useState([]);

useEffect(() => {

fetchNotifications();

}, []);

const
fetchNotifications =
async () => {

const data =
await getNotifications();

setNotifications(
data
);

};

const
handleRead =
async (id) => {

await markAsRead(
id
);

fetchNotifications();

};

const
handleReadAll =
async () => {

await markAllRead();

fetchNotifications();

};

return (

<DashboardLayout>

<div className="p-6">

<div className="flex justify-between mb-6">

<h1 className="text-4xl font-bold">

Notifications

</h1>

<button

onClick={
handleReadAll
}

className="bg-blue-500 text-white px-4 py-2 rounded-lg"

>

Mark All Read

</button>

</div>

<div className="space-y-4">

{notifications.length === 0 ? (

<div className="bg-white p-8 rounded-xl shadow-md">

No Notifications

</div>

) : (

notifications.map(
(notification) => (

<NotificationCard

key={
notification._id
}

notification={
notification
}

onRead={
handleRead
}

/>

)

)

)}

</div>

</div>

</DashboardLayout>

);

}

export default Notifications;