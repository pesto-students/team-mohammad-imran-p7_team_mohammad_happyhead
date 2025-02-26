import { useState, useEffect } from "react";
import { TextField, Typography, Button, Container, InputAdornment } from "@mui/material";
import { ThemeProvider, styled } from "@mui/system";
import GoogleIcon from "@mui/icons-material/Google";
import RootContainer from "../../../styles/RootContainerStyles";
import ContentContainer from "../../../styles/ContentContainerStyles";
import ButtonWrapper from "../../../styles/ButtonWrapperStyles";
import theme from "../../../styles/theme";
import Link from 'next/link'
import { redirectToPage } from '../../../../utils/redirect';
import { useSession, signIn } from "next-auth/react";
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

// Styled component for the centered subtext
const IdPSignInButton = styled(Button)({
  textAlign: "center",
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.primary,
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

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState();
  const [errors, setErrors] = useState({});

  // State variable to track whether the form is ready for submission
  const [canSubmit, setCanSubmit] = useState(false);
  const sessionData = useSession();
  console.log(`sessionData - ${JSON.stringify(sessionData)}`);

  useEffect(() => {
    if (sessionData?.data && sessionData.data.user) {
      // console.log(`userObject - ${JSON.stringify(sessionData.data.user)}`);
      const { image: [username, role] } = sessionData.data.user;
      redirectToPage(`/users/dashboard/${username}`);
    }
  }, [sessionData]);

  // Check if the form is ready for submission
  useEffect(() => {
    if (errors.username === undefined && errors.email === undefined && errors.password === undefined && errors.name === undefined) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [errors]);

  const validateRequiredField = (fieldValue, fieldName) => {
    const newErrors = { ...errors };
    if (fieldValue.trim() === "") {
      newErrors[fieldName] = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    } else {
      newErrors[fieldName] = undefined;
    }
    setErrors(newErrors);
  };

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

  // Check username availability when Check Availability button is clicked
  const handleCheckAvailability = async () => {
    try {
      if (username.trim() === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: "Username is required",
        }));
        return;
      }

      const response = await fetch(`/api/users/dashboard/availability/${username}`);
      if (response.ok) {
        const result = await response.json();
        setUsernameAvailable(result.available);

        if (!result.available) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            username: "Username is already taken",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            username: undefined,
          }));
        }
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error(error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "An error occurred while checking username availability",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields including the username
    await handleCheckAvailability();
    validateEmail();
    validateRequiredField(password, "password");
    validateRequiredField(name, "name");

    // Check if the form is ready for submission
    if (canSubmit) {
      try {
        const formData = { name: name, email: email, password: password, username: username };

        // Send form data to the server using Fetch API
        const response = await fetch("/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          const username = data.username;  // Handle the response as desired
          const res = await signIn('credentials', { redirect: false, email: email, password: password });
          redirectToPage(`/users/dashboard/${username}`);

        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleIdpClick = async () => {
    await signIn('google');
  };

  return (
    <ThemeProvider theme={theme}>
      <CustomRootContainer>
        <CustomContentContainer>
          <Image
            src="/images/login/join-us.png"
            alt="signup"
            width={150}
            height={150}
          />
          <h1>Sign Up</h1>
          {/* Centered Sub text */}
          <ButtonWrapper color="primary">
            <IdPSignInButton variant="outlined" startIcon={<GoogleIcon />} onClick={(e) => handleIdpClick()}>
              Sign Up With Google
            </IdPSignInButton>
          </ButtonWrapper>
          <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
              <CustomTextField
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: theme.palette.text.primary,
                  },
                }}
                error={errors.name !== undefined}
                helperText={errors.name}
                onBlur={() => validateRequiredField(name, "name")}
              />
              <CustomTextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
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
                fullWidth
                margin="normal"
                variant="outlined"
                label="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputLabelProps={{
                  style: { color: 'black' }, // Set the label text color to black
                }}
                InputProps={{
                  style: { color: theme.palette.text.primary }, // Apply theme.palette.text.primary color to input text
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        onClick={handleCheckAvailability}
                        style={{
                          backgroundColor: theme.palette.quinary.main,
                          fontSize: '1rem',
                          '&:hover': {
                            backgroundColor: theme.palette.secondary.main,
                          },
                        }}
                      >
                        Check Availability
                      </Button>
                    </InputAdornment>
                  ),
                }}
                error={errors.username !== undefined} 
                onBlur={handleCheckAvailability}
              />
              {usernameAvailable !== null && usernameAvailable !== undefined && (
                <Typography variant="caption" color={usernameAvailable ? 'green' : 'error'}>
                  {usernameAvailable ? 'Username available' : 'Username already taken'}
                </Typography>
              )}

              <CustomTextField
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: theme.palette.text.primary,
                  },
                }}
                error={errors.password !== undefined}
                helperText={errors.password}
                type="password"
                onBlur={() => validateRequiredField(password, "password")}
              />
              <ButtonWrapper color="tertiary">
                <Button variant="contained" color="tertiary" type="submit">
                  Sign Up
                </Button>
              </ButtonWrapper>
            </form>
          </Container>
          {/* Link for "Already an expert? Login" */}
          <LoginLinkTypography variant="body2" color="primary" align="center">
            Register as an expert? <Link href="/experts/signup">Sign Up</Link>
          </LoginLinkTypography>
        </CustomContentContainer>
      </CustomRootContainer>
    </ThemeProvider>
  );
}
