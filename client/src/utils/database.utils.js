export const storeUserInfoInDatabase = async (user) => {
  const { uid, name, displayName, email } = user;

  try {
    // check if the user already exists
    await fetch("http://localhost:4000/api/users", {
      method: "POST",
      body: JSON.stringify({ name: name || user?.displayName, email, uid }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
};
