import { User } from "../../models/user";
import { diaryClient } from "../axios";

export const createUser = async (
  username: string,
  password: string,
  visibility: string,
  isAdmin: boolean | null,
) => {
  try {
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);
    form.append("visibility", visibility);
    form.append("isAdmin", (isAdmin == null ? false : isAdmin).toString());
    console.log(form);

    const response = await diaryClient.post("/user", form);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error creating user", err);
    throw err;
  }
};

export const getAllUsers = async () => {
  try {
    const users: User[] = [];
    const response = await diaryClient.get(`/user/all`);

    response.data.map((user: User) =>
      users.push({
        UserID: user.UserID,
        Username: user.Username,
        Password: user.Password,
        Visibility: user.Visibility,
        IsAdmin: user.IsAdmin,
      }),
    );
    return users;
  } catch (err) {
    console.error("Error creating user", err);
    throw err;
  }
};

export const getUserById = async (userId: number) => {
  try {
    const response = await diaryClient.get(`/user/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error getting user by id", err);
    throw err;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const response = await diaryClient.get(`/user/${username}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error getting user by username", err);
    throw err;
  }
};

export const updateUser = async (userData: User) => {
  try {
    const form = new FormData();
    form.append("userId", userData.UserID.toString());
    form.append("username", userData.Username);
    form.append("password", userData.Password);
    form.append("visibility", userData.Visibility);
    form.append("isAdmin", userData.IsAdmin);
    console.log(form);

    const response = await diaryClient.put(`/user/${userData.UserID}`, form);
    return response.status === 200;
  } catch (err) {
    console.error("Error updating user", err);
    throw err;
  }
};

export const updatePassword = async ({
  userId,
  oldPassword,
  newPassword,
}: {
  userId: number;
  oldPassword: string;
  newPassword: string;
}) => {
  try {
    const form = new FormData();
    form.append("old_password", oldPassword);
    form.append("new_password", newPassword);

    const response = await diaryClient.put(`/user/${userId}/update-password`, form, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

export const deleteUser = async (userId: number) => {
  try {
    const response = await diaryClient.delete(`/user/${userId.toString()}`);
    return response.status === 200;
  } catch (err) {
    console.error("Error updating user", err);
    throw err;
  }
};
