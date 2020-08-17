db.createUser({
  user: "developer",
  pwd: "password123",
  roles: [
    {
      role: "readWrite",
      db: "phonebook",
    },
  ],
});
