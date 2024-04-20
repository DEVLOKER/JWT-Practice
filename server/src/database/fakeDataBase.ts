import { TUser } from "#types/user.js";
import { comparePassword, hash } from "#utils/passwordUtils.js";

// fake users list
let users: TUser[] = [
    {
        id: "ab86a1e1ef70dff97959067b723c5c24",
        username: "user01",
        password:
            "$2b$10$xSB92ieKzlJ8.sx8bWP.Buw2cAxk/WU5beTveGPI0HqWbmWKZGRFW", // 123
        accessToken: "",
        refreshToken: "",
    },
    {
        id: "ab86a1e1ef70dff97959067b723c5c24",
        username: "user02",
        password:
            "$2b$10$LtdsC.fF7wZJioDEPt3eTuULy4O3NS8vicOT2iA/zhIblvFFsMy6C", // 456
        accessToken: "",
        refreshToken: "",
    },
];

// CRUD operations

// Read operation: Get all users
export const getUsers = () => {
    return users;
};

// Create operation: Add a new user
export const addUser = (user: Omit<TUser, "id">) => {
    const newUser: TUser = { ...user, id: hash(user.username) };
    users.push(newUser);
};

// Read operation: Get a user by username & password
export const findUser = async ({
    username,
    password,
}: Pick<TUser, "username" | "password">): Promise<TUser | null> => {
    const user = users.find((u) => u.username === username);

    // No user found with the given username
    if (!user) return null;

    const passwordMatch = await comparePassword(password, user.password);

    // Password doesn't match
    if (!passwordMatch) return null;

    // User found and password matches
    return user;
};

// Read operation: Get a user by ID
export const getUserById = ({ id }: Pick<TUser, "id">) => {
    return users.find((user) => user.id === id);
};

// Update operation: Update a user
export const updateUser = (
    { id }: Pick<TUser, "id">,
    newData: Partial<TUser>
) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        users[index] = { ...users[index], ...newData };
        return true; // Updated successfully
    }
    return false; // User not found
};

// Delete operation: Delete a user
export const deleteUser = ({ id }: Pick<TUser, "id">) => {
    users = users.filter((user) => user.id !== id);
};
