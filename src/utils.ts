import dayjs from "dayjs";

export const formatMessage = (username: string, text: string) => ({
  username,
  text,
  time: dayjs().format("MMM D, YYYY h:mm A"),
});

const users: {
  id: string;
  username: string;
  room: string;
}[] = [];

// Join user to chat
export const userJoin = (id: string, username: string, room: string) => {
  const user = { id, username, room };
  users.push(user);
  return user;
};

// Get current user
export const getCurrentUser = (id: string) =>
  users.find((user) => user.id === id);

// User leaves chat
export const userLeave = (id: string) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    // return users.splice(index, 1)[0];
    const leftUser = users[index];
    users.splice(index, 1);
    return leftUser;
  }
};

// Get room users
export const getRoomUsers = (room: string) =>
  users.filter((user) => user.room === room);

export const generateLocation = (
  username: string,
  coords: { lat: number; lon: number }
) => ({
  username,
  lat: coords.lat,
  lon: coords.lon,
  time: dayjs().format("MMM D, YYYY h:mm A"),
});
