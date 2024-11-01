import {MenuItem, TextField} from "@mui/material";
import "../../../assets/css/components/layout/AppHeader.css"
import {User} from '../../../assets/models/user'
import {faCheck, faPen, faTrash, faX} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {USER_VISIBILITY} from "../../../assets/constants";
import {deleteUser, updateUser} from "../../../assets/services/diary/user";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// @ts-ignore
function UserListing({user}) {

    const [updateName, setUpdateName] = useState(false)
    const [nameVal, updateNameVal] = useState(user.Username)

    const [updateVisbility, setUpdateVisibility] = useState(false)
    const [visbilityVal, updateVisibilityVal] = useState(user.Visibility)

    const queryClient = useQueryClient()

    const updateUserMutation = useMutation({
        mutationFn: (user: User) => updateUser({
                UserID: user.UserID,
                Username: user.Username,
                Visibility: user.Visibility
            }
        ),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['allUsers']})
    })

    const deleteUserMutation = useMutation({
        mutationFn: (userId: number) => deleteUser(userId),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['allUsers']})
    })
    return (

        <div className="userListing">
            <div className="username">
                <TextField
                    disabled={!updateName}
                    value={nameVal}
                    onChange={(e) => {
                        updateNameVal(e.target.value)
                    }}
                />
                <div
                    style={{display: "flex", flexDirection: "column"}}
                >
                    <FontAwesomeIcon
                        icon={!updateName ? faPen : faCheck}
                        onClick={() => {
                            console.log(nameVal)
                            if (updateName) {
                                updateUserMutation.mutate({
                                    UserID: user.UserID,
                                    Username: nameVal,
                                    Visibility: user.Visibility
                                })
                            }
                            setUpdateName(!updateName)
                        }}
                    />
                    {
                        updateName &&
                        <FontAwesomeIcon
                            icon={faX}
                            color={"red"}
                            onClick={() => {
                                console.log(nameVal)
                                updateNameVal(user.Username)
                                setUpdateName(!updateName)
                            }}
                        />
                    }
                </div>


            </div>

            <div style={{display: "flex", flexDirection: "row", gap: "1rem"}}>
                <TextField
                    required
                    disabled={!updateVisbility}
                    id="outlined-select-currency"
                    select
                    label="Visibility"
                    value={visbilityVal.toUpperCase()}
                >
                    {USER_VISIBILITY.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            onClick={() => {
                                updateVisibilityVal(option.value)
                            }}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                {/*todo show tick when name changes*/}
                <div
                    style={{display: "flex", flexDirection: "column"}}
                >
                    <FontAwesomeIcon
                        icon={!updateVisbility ? faPen : faCheck}
                        onClick={() => {
                            console.log(nameVal)
                            if (updateVisbility) {
                                updateUserMutation.mutate({
                                    UserID: user.UserID,
                                    Username: user.Username,
                                    Visibility: visbilityVal
                                })
                            }
                            setUpdateVisibility(!updateVisbility)
                        }}
                    />
                    {
                        updateVisbility &&
                        <FontAwesomeIcon
                            icon={faX}
                            color={"red"}
                            onClick={() => {
                                console.log(nameVal)
                                updateVisibilityVal(user.Visibility)
                                setUpdateVisibility(!updateVisbility)
                            }}
                        />
                    }
                </div>
            </div>

            <FontAwesomeIcon
                icon={faTrash}
                onClick={() => {
                    deleteUserMutation.mutate(user.UserID)
                    queryClient.invalidateQueries({queryKey: ['allUsers']})
                }}
            />
        </div>
    )
}

export default UserListing;

