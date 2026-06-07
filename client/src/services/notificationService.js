import api from "../api/axios";

export const
getNotifications =
async () => {

const token =
localStorage.getItem(
"token"
);

const response =
await api.get(
"/notifications",
{
headers: {
Authorization:
`Bearer ${token}`,
},
}
);

return response.data;

};

export const
markAsRead =
async (id) => {

const token =
localStorage.getItem(
"token"
);

await api.put(
`/notifications/${id}/read`,
{},
{
headers: {
Authorization:
`Bearer ${token}`,
},
}
);

};

export const
markAllRead =
async () => {

const token =
localStorage.getItem(
"token"
);

await api.put(
"/notifications/read-all",
{},
{
headers: {
Authorization:
`Bearer ${token}`,
},
}
);

};