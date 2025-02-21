import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Tooltip,
  Checkbox,
  TableContainer,
} from "@mui/material";
import usersData from "../Data/Users.json";
import Paginate from "./Paginate";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 12;

  useEffect(() => {
    setUsers(
      usersData.rows.map((user) => ({
        ...user,
        image: `/assets/${user.image}`,
        selected: false,
      }))
    );
  }, []);

  const handleSelectUser = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, selected: !user.selected } : user
      )
    );
  };

  const handleSelectAll = () => {
    const allSelected = users.every((user) => user.selected);
    setUsers((prevUsers) =>
      prevUsers.map((user) => ({ ...user, selected: !allSelected }))
    );
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const paginatedUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ height: "2rem" }}>
              <TableCell>
                <Checkbox
                  checked={
                    users.length > 0 && users.every((user) => user.selected)
                  }
                  indeterminate={
                    users.some((user) => user.selected) &&
                    !users.every((user) => user.selected)
                  }
                  onChange={handleSelectAll}
                />
                Name
              </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teams</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                {/* Name Column */}
                <TableCell
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "Gilroy-Normal",
                    fontSize: "1rem",
                  }}
                >
                  <Checkbox
                    checked={user.selected}
                    onChange={() => handleSelectUser(user.id)}
                  />
                  <Avatar
                    src={user.image}
                    alt={user.fullName}
                    style={{ marginRight: 10 }}
                  />
                  <div>
                    <strong>{user.username}</strong>
                    <br />
                    <span>{user.fullName}</span>
                  </div>
                </TableCell>

                <TableCell sx={{ fontFamily: "Gilroy-Medium" }}>
                  <span
                    className="status-entry"
                    style={{
                      backgroundColor:
                        user.status === "Working"
                          ? "green"
                          : user.status === "On Leave"
                          ? "red"
                          : user.status === "At Lunch"
                          ? "#f5cb42"
                          : "#007bff",
                    }}
                  >
                    {user.status}
                  </span>
                </TableCell>

                <TableCell
                  sx={{ fontFamily: "Gilroy-Medium", fontSize: "1rem" }}
                >
                  {user.role}
                </TableCell>

                <TableCell
                  sx={{ fontFamily: "Gilroy-Medium", fontSize: "1rem" }}
                >
                  {user.email}
                </TableCell>

                <TableCell>
                  {user.teams.slice(0, 3).map((team, index) => (
                    <span
                      key={index}
                      className={`team-entry ${
                        index === 0
                          ? "team-entry-lightest"
                          : index === 1
                          ? "team-entry-lighter"
                          : index === 2
                          ? "team-entry-light"
                          : ""
                      }`}
                    >
                      {team}
                    </span>
                  ))}
                  {user.teams.length > 3 && (
                    <Tooltip title={user.teams.slice(3).join(", ")}>
                      <span className="tooltip">+{user.teams.length - 3}</span>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Paginate
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default UserTable;
