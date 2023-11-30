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
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

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
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 8;
  const [pages, setPages] = useState(1);
  const axiosSecure = useAxiosSecure();
  const {
    data: allUsers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/auth/users", {
        params: {
          searchQuery,
          pages,
          limit,
        },
      });
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, pages, searchQuery]);

  const { mutate: makeAdmin } = useMutation({
    mutationKey: ["makeAdmin", user?.email],
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/auth/make-admin/${id}`);
    },
    onSuccess: (data) => {
      if (data.data.message === "User is already an admin.") {
        Swal.fire({
          title: "User is already an admin.",
          icon: "info",
        });
      } else {
        refetch();
        Swal.fire({
          title: "Success",
          text: "User Role Updated To Admin Successfully",
          icon: "success",
        });
      }
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
  const totalPages = allUsers?.totalPagesCount;
  const pageNumbersArray = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handlePagination = (btn) => {
    setPages(btn);
  };

  const handlePrevious = () => {
    if (pages > 1) {
      setPages(pages - 1);
    }
  };
  const handleNext = () => {
    if (pages < totalPages) {
      setPages(pages + 1);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{ p: 2, bgcolor: "#e85d04", borderRadius: " 20px 20px 0 0" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"row"}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ color: "white", display: { xs: "none", sm: "flex" } }}
        >
          All Users
        </Typography>
        <Paper
          component="form"
          onSubmit={handleSearch}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchIcon />
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Username, Email"
            name="search_meals"
            onBlur={(e) => setSearchQuery(e.target.value)}
            inputProps={{ "aria-label": "search meals" }}
          />
          <Button>Search</Button>
        </Paper>
      </Stack>
      <TableContainer
        component={Paper}
        sx={{ height: "calc(100vh - 230px)", borderRadius: 0 }}
      >
        <Table stickyHeader sx={{ minWidth: 1000 }} aria-label="Requested Meals">
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
            {allUsers?.result?.map((user) => (
              <StyledTableRow key={user._id}>
                <StyledTableCell component="th" scope="row">
                  {user.userName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user.userEmail}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user.userBadge.split("-").join(" ")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user.userRole}
                </StyledTableCell>
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
      <Divider sx={{ borderColor: "#f77f00" }} />
      <Stack
        sx={{ p: 1, bgcolor: "white", borderRadius: "0 0 20px 20px " }}
        justifyContent={"center"}
        alignItems={"center"}
        overflow={"auto"}
      >
        <ButtonGroup
          size="large"
          variant="outlined"
          aria-label="table pagination button"
        >
          <Button onClick={handlePrevious} variant="outlined">
            {"<"}
          </Button>
          {pageNumbersArray?.map((btn, index) => (
            <Button
              sx={{
                display: { xs: "none", sm: "flex" },
                bgcolor: btn === pages ? "#f77f00" : "",
                color: btn === pages ? "white" : "",
                "&:hover": {
                  bgcolor: btn === pages ? "#ff9900" : "",
                  color: btn === pages ? "white" : "",
                },
              }}
              variant="outlined"
              onClick={() => handlePagination(btn)}
              key={index}
            >
              {btn}
            </Button>
          ))}
          <Button onClick={handleNext} variant="outlined">
            {">"}
          </Button>
        </ButtonGroup>
      </Stack>
    </Box>
  );
}
