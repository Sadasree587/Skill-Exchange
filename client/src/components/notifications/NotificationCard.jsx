function NotificationCard({

notification,
onRead,

}) {

return (

<div
className={`

p-4
rounded-xl
shadow-md

${
notification.isRead

? "bg-white"

: "bg-blue-50"

}

`}
>

<p className="font-semibold">

🔔
{" "}
{notification.message}

</p>

<p className="text-sm text-gray-500 mt-2">

{new Date(
notification.createdAt
).toLocaleString()}

</p>

{!notification.isRead && (

<button

onClick={() =>
onRead(
notification._id
)
}

className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg"

>

Mark Read

</button>

)}

</div>

);

}

export default NotificationCard;