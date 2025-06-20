import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
} from '@mui/material';
import BackButton from '../Common/BackButton';

const ACCESS_TOKEN_KEY = "access_token";

interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  job_title: string;
  organization: string;
  admin_user: boolean;
}

const getUsers = async (
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setError: (error: string) => void
) => {
  try {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const response = await fetch("http://127.0.0.1:8000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token || ""}`,
      },
    });

    if (!response.ok) {
      const responseData = await response.json();
      const errorMessage = responseData.message || "Failed to fetch users";
      setError(errorMessage);
      throw new Error(errorMessage);
    }

    const data: User[] = await response.json();
    setUsers(data);
    setError("");
  } catch (error: any) {
    console.error("Error fetching user list:", error);
    setError(error.message || "Unknown error");
  }
};

const addUser = async (
  email: string,
  setError: (error: string) => void,
  setSuccess: (msg: string) => void,
  refreshUsers: () => void
) => {
  try {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const response = await fetch("http://127.0.0.1:8000/users/create?email=" + encodeURIComponent(email), {
      method: "GET", // Note: your backend expects GET for add_user — usually POST is better
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token || ""}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message || "Failed to add user";
      setError(errorMessage);
      setSuccess("");
      throw new Error(errorMessage);
    }

    setSuccess(data.message || "User added successfully");
    setError("");
    refreshUsers();
  } catch (error: any) {
    console.error("Error adding user:", error);
    setError(error.message || "Unknown error");
  }
};

const ManageSite: React.FC = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [newUserEmail, setNewUserEmail] = useState("");

  const refreshUsers = () => getUsers(setUsers, setError);

  useEffect(() => {
    refreshUsers();
  }, []);

  const handleAddUser = () => {
    if (!newUserEmail.trim()) {
      setError("Email is required to add a user");
      setSuccess("");
      return;
    }
    addUser(newUserEmail.trim(), setError, setSuccess, refreshUsers);
    setNewUserEmail("");
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <BackButton />
      <Paper elevation={0} sx={{ p: 4, background: 'transparent', mb: 4, borderRadius: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Site Management
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9, mb: 3 }}>
          Configure site settings and manage users
        </Typography>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            {success}
          </Typography>
        )}

        <Box sx={{ display: 'flex', mb: 3, gap: 2 }}>
          <TextField
            label="New User Email"
            type="email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleAddUser}>
            +
          </Button>
        </Box>

        {!error && users.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Organization</TableCell>
                  <TableCell>Admin</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.username}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.first_name || "-"}</TableCell>
                    <TableCell>{user.last_name || "-"}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.job_title || "-"}</TableCell>
                    <TableCell>{user.organization || "-"}</TableCell>
                    <TableCell>{user.admin_user ? "Yes" : "No"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {!error && users.length === 0 && <Typography>No users found.</Typography>}
      </Paper>
    </Box>
  );
};

export default ManageSite;
