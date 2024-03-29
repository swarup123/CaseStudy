import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";

import { RowDataType } from "./listUser.type";
import { Typography } from "@mui/material";
import { environment } from "../../environments/environment";
import { LIST_API } from "../../api-endpoint.config";

export default function ListUser() {
  const [rows, setRows] = useState([]);

  async function getUserList() {
    try {

      let data = await fetch(`${environment.API_URL}${LIST_API}`);

      if (data.ok) {
        let userData = await data.json();
        setRows(userData?.userDetails);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getUserList();
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Users
      </Typography>
      <Paper>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={"medium"}>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: RowDataType) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.firstName}
                  >
                    <TableCell>{row?.firstName}</TableCell>
                    <TableCell>{row?.lastName}</TableCell>
                    <TableCell>{row?.email}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
