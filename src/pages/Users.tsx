import { Link } from "react-router-dom";
import { Button, MenuItem, TextField } from "@mui/material";
import "../assets/css/pages/Users.css";
import {
  faCheck,
  faPen,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getAllUsers } from "../assets/services/diary/user";
import { useState } from "react";
import { USER_VISIBILITY } from "../assets/constants";
import UserListing from "./components/users/UserListing";

function Users() {
  const [newUserName, setNewUserName] = useState<string>("");
  const [newUserVisbility, setNewUserVisibility] = useState<string>("PUBLIC");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => getAllUsers(),
  });

  const addUserMutation = useMutation({
    mutationFn: ({
      username,
      password,
      visibility,
      isAdmin,
    }: {
      username: string;
      password: string;
      visibility: string;
      isAdmin: boolean;
    }) => createUser(username, password, visibility, isAdmin),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["allUsers"] }),
  });

  const queryClient = useQueryClient();

  // @ts-ignore
  return (
    <div className="manageUsersPage">
      <Link to="/manage">
        <button>{"<-Back"}</button>
      </Link>

      <div className="addUser">
        <h2>Add New User</h2>
        <div className="addUserFields">
          <TextField
            id="standard-basic"
            label="Username"
            variant="standard"
            value={newUserName}
            onChange={(e) => {
              setNewUserName(e.target.value);
            }}
          />
          <TextField
            id="user-password"
            variant="standard"
            label="Password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <TextField
            required
            id="outlined-select-currency"
            select
            label="Visibility"
            defaultValue={newUserVisbility}
            helperText="Please select preferred visibility"
          >
            {USER_VISIBILITY.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                onClick={() => setNewUserVisibility(option.value)}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            required
            id="outlined-select-currency"
            select
            label="Admin Status"
            defaultValue={isAdmin}
            helperText="Please select preferred admin status"
          >
            {[true, false].map((option) => (
              <MenuItem
                key={option.toString()}
                value={option.toString()}
                onClick={() => {
                  setIsAdmin(option);
                }}
              >
                {option ? "Admin" : "User"}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="outlined"
            onClick={() =>
              addUserMutation.mutate({
                username: newUserName,
                password: newPassword,
                visibility: newUserVisbility,
                isAdmin: isAdmin,
              })
            }
          >
            Add User
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h2>Manage Users</h2>
          <p
            style={{ color: "navy", cursor: "pointer" }}
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ["allUsers"] })
            }
          >
            Refresh
          </p>
        </div>

        {!isLoadingUsers &&
          // @ts-ignore
          users.map((user, index) => <UserListing user={user} key={index} />)}
      </div>
    </div>
  );
}

export default Users;
