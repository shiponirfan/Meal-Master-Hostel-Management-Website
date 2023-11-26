import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AwesomeButton } from "react-awesome-button";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f77f00",
    color: theme.palette.common.white,
    fontSize: 18,
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ManageUsers() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/auth/users");
      return res.data;
    },
  });

  const { mutate: makeAdmin } = useMutation({
    mutationKey: ["makeAdmin", user?.email],
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/auth/make-admin/${id}`);
    },
    onSuccess: () => {
      refetch();
      Swal.fire({
        title: "Success",
        text: "User Role Updated To Admin Successfully",
        icon: "success",
      });
    },
  });

  const handleMakeAdmin = (id) => {
    Swal.fire({
      title: "You Want To Make Admin",
      text: "Admin User Can Access All Of Admin Features",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Close",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdmin(id);
      }
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 12 }}>
      <Table sx={{ minWidth: 700 }} aria-label="Requested Meals">
        <TableHead>
          <TableRow>
            <StyledTableCell>User Name</StyledTableCell>
            <StyledTableCell align="center">User Email</StyledTableCell>
            <StyledTableCell align="center">
              Subscription Status
            </StyledTableCell>
            <StyledTableCell align="center">User Role</StyledTableCell>
            <StyledTableCell align="center">Make Admin</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((user) => (
            <StyledTableRow key={user._id}>
              <StyledTableCell component="th" scope="row">
                {user.userName}
              </StyledTableCell>
              <StyledTableCell align="center">{user.userEmail}</StyledTableCell>
              <StyledTableCell align="center">
                {user.userBadge.split("-").join(" ")}
              </StyledTableCell>
              <StyledTableCell align="center">{user.userRole}</StyledTableCell>
              <StyledTableCell align="center">
                <AwesomeButton
                  onPress={() => handleMakeAdmin(user._id)}
                  type="danger"
                >
                  MAKE ADMIN
                </AwesomeButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
