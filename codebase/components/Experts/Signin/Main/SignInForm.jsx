import { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { ThemeProvider, styled } from "@mui/system";
import RootContainer from "../../../styles/RootContainerStyles";
import ContentContainer from "../../../styles/ContentContainerStyles";
import ButtonWrapper from "../../../styles/ButtonWrapperStyles";
import theme from "../../../styles/theme";
import Link from 'next/link'
import { redirectToPage } from '../../../../utils/redirect';
import { signIn } from "next-auth/react";
import Image from 'next/image'

// Styled component for the root container
const CustomRootContainer = styled(RootContainer)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

// Styled component for the custom content container
const CustomContentContainer = styled(ContentContainer)({
  backgroundColor: theme.palette.secondary.main,
  padding: "2rem 0",
  minHeight: "80vh",
});

// Styled component for the custom text field
const CustomTextField = styled(TextField)({
  "& .MuiFormLabel-root": {
    color: theme.palette.text.primary,
  },
});

const LoginLinkTypography = styled(Typography)`
  padding-top: 16px;
  color: ${({ theme }) => theme.palette.text.primary};

  a {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateEmail = () => {
    const newErrors = { ...errors };

    if (email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email address";
    } else {
      newErrors.email = undefined; // Clear the error if email is valid
    }

    setErrors(newErrors);
  };

  const validatePassword = () => {
    const newErrors = { ...errors };

    if (password.trim() === "") {
      newErrors.password = "Password is required";
    } else {
      newErrors.password = undefined; // Clear the error if password is valid
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate fields before submitting
    validateEmail();
    validatePassword();
  
    if (!errors.email && !errors.password) {
      try {
        console.log('control coming here');
        const response = await signIn('credentials', { redirect: false, email: email, password: password });
        const formData = { email: email, password: password };
  
        // Send form data to the server using Fetch API
        const res = await fetch("/api/experts/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (res.ok) {
          const data = await res.json();
          const expertname = data.expertname; // Handle the response as desired
          console.log("Login Successful");
  
          // Redirect the user to the dashboard page
          redirectToPage(`/experts/dashboard/${expertname}`);
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
        <CustomContentContainer>
          <Image
            src="/images/login/welcome.png"
            alt="signin"
            width={150}
            height={150}
          />
          <h1>Sign In</h1>
          <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
              <CustomTextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail} // Validate on leaving field
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: theme.palette.text.primary,
                  },
                }}
                error={errors.email !== undefined}
                helperText={errors.email}
              />
              <CustomTextField
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword} 
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: theme.palette.text.primary,
                  },
                }}
                error={errors.password !== undefined}
                helperText={errors.password}
                type="password"
              />
              <ButtonWrapper color="tertiary">
                <Button variant="contained" color="tertiary" type="submit">
                  Sign In
                </Button>
              </ButtonWrapper>
            </form>
          </Container>
          <LoginLinkTypography variant="body2" color="primary" align="center">
            Not an expert? <Link href="/users/signin">Login as user</Link>
          </LoginLinkTypography>
        </CustomContentContainer>
      </CustomRootContainer>
    </ThemeProvider>
  );
}
