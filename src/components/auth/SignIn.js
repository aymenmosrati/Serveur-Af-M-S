import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import API from "../../api";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import { useState } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [error, setError] = useState({ bool: false, Message: " " });
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    console.log("====================================");
    console.log(email, password, password.length);
    console.log("====================================");
    if (email.includes(" ") || email.length === 0) {
      setEmailError(true);
      console.log("email is null");
      return;
    } else {
      if (!email.includes("@")) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }
    if (password.includes(" ") || password.length === 0) {
      setPasswordError(true);
      console.log("password is null");
      return;
    } else {
      setPasswordError(false);
    }
    API.post("loginAdmin", {
      email: email,
      password: password,
    })
      .then((res) => {
        if (res.status === 200) {
          const user = res?.data?.user;
          const token = res?.data?.token;
          localStorage.setItem("curentUser", JSON.stringify({ user, token }));
          navigate("/");
          //window.location.reload(false);
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401) {
            setError({ bool: true, Message: err.response.data.Message });
          }

        } else {
          setError({ bool: true, Message: "server not responding !" });
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Card>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              {emailError ? (
                <p style={{ color: "red", fontSize: "10px" }}>
                  {" "}
                  please check your email
                </p>
              ) : null}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {passwordError ? (
                <p style={{ color: "red", fontSize: "10px" }}>
                  {" "}
                  please check your password
                </p>
              ) : null}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
            {error.bool ? (
              <p style={{ color: "red", fontSize: "15px" }}>
                {" "}
                {error.Message}{" "}
              </p>
            ) : null}
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Card>
      </Container>
    </ThemeProvider>
  );
}


// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import API from "../../api";
// import { useNavigate } from "react-router-dom";
// import { Card } from "@mui/material";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const theme = createTheme();

// export default function SignIn() {
//   const [error, setError] = React.useState(false);
//   const navigate = useNavigate();
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get("email"),
//       password: data.get("password"),
//     });
//     API.post("loginAdmin", {
//       email: data.get("email"),
//       password: data.get("password"),
//     })
//       .then((res) => {
//         if (res.status === 200) {
//           console.log(res.data);
//           const user = res?.data?.token?.user;
//           const token = res?.data?.token?.token;
//           localStorage.setItem("curentUser", JSON.stringify({ user, token }));
//           navigate("/");
//           //window.location.reload(false);
//         }
//       })
//       .catch((err) => setError(true));
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <Card>
//           <CssBaseline />
//           <Box
//             sx={{
//               marginTop: 8,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Sign in
//             </Typography>
//             <Box
//               component="form"
//               onSubmit={handleSubmit}
//               noValidate
//               sx={{ mt: 1 }}
//             >
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 autoFocus
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//               />
//               <FormControlLabel
//                 control={<Checkbox value="remember" color="primary" />}
//                 label="Remember me"
//               />
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Sign In
//               </Button>
//             </Box>
//           </Box>
//           <Copyright sx={{ mt: 8, mb: 4 }} />
//         </Card>
//       </Container>
//     </ThemeProvider>
//   );
// }
