import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Snackbar, Alert, Fade, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, Person, VpnKey } from '@mui/icons-material';
import { AuthContext } from '../contexts/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Professional blue
      dark: '#1d4ed8',
      light: '#3b82f6',
    },
    secondary: {
      main: '#64748b', // Neutral slate
      dark: '#475569',
      light: '#94a3b8',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      900: '#0f172a',
    },
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h4: {
      fontWeight: 700,
      color: '#0f172a',
    },
    h6: {
      fontWeight: 500,
    },
    body1: {
      fontSize: '0.95rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: '#ffffff',
            transition: 'all 0.2s ease',
            '& fieldset': {
              borderColor: '#e2e8f0',
              borderWidth: 1.5,
            },
            '&:hover fieldset': {
              borderColor: '#cbd5e1',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2563eb',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
          padding: '10px 24px',
          transition: 'all 0.2s ease',
        },
        contained: {
          backgroundColor: '#2563eb',
          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          '&:hover': {
            backgroundColor: '#1d4ed8',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
        },
        outlined: {
          borderColor: '#e2e8f0',
          color: '#64748b',
          borderWidth: 1.5,
          '&:hover': {
            borderColor: '#cbd5e1',
            backgroundColor: '#f8fafc',
            borderWidth: 1.5,
          },
        },
        text: {
          color: '#2563eb',
          '&:hover': {
            backgroundColor: 'rgba(37, 99, 235, 0.04)',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default function Authentication() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    setIsLoading(true);
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        let result = await handleRegister(name, username, password);
        setUsername('');
        setPassword('');
        setName('');
        setMessage(result);
        setError('');
        setFormState(0);
        setOpen(true);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || 'Server error.');
      } else if (err.request) {
        setError('No response from server.');
      } else {
        setError('Unexpected error: ' + err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAuth();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        
        {/* Left Side - Brand Section */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            position: 'relative',
            backgroundColor: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.1,
            },
          }}
        >
          <Box sx={{ position: 'relative', textAlign: 'center', color: 'white', px: 6 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                backgroundColor: '#2563eb',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
              }}
            >
              <VideoCallIcon sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: 'white' }}>
              PeerSpace
            </Typography>
            <Typography variant="h6" sx={{ 
              color: '#94a3b8', 
              maxWidth: 400, 
              mx: 'auto',
              fontWeight: 400,
              lineHeight: 1.6 
            }}>
             Whether you're catching up with friends, studying together, or sharing a laugh — this platform brings you closer
            </Typography>
          </Box>
        </Grid>

        {/* Right Side - Form */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} 
          sx={{ 
            backgroundColor: '#ffffff',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Fade in timeout={600}>
            <Box
              sx={{
                mx: 6,
                my: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                maxWidth: 400,
              }}
            >
              {/* Avatar */}
              <Avatar sx={{ 
                width: 48, 
                height: 48,
                backgroundColor: '#2563eb',
                mb: 3,
              }}>
                <LockOutlinedIcon sx={{ fontSize: 24 }} />
              </Avatar>

              {/* Title */}
              <Typography component="h1" variant="h4" sx={{ mb: 1, textAlign: 'center' }}>
                {formState === 0 ? 'Welcome back' : 'Create account'}
              </Typography>
              
              <Typography variant="body1" sx={{ 
                mb: 4, 
                color: 'text.secondary', 
                textAlign: 'center' 
              }}>
                {formState === 0 ? 'Please sign in to your account' : 'Please fill in your information to get started'}
              </Typography>

              {/* Toggle Buttons */}
              <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                mb: 4, 
                p: 0.5,
                backgroundColor: '#f1f5f9',
                borderRadius: 1.5,
                width: '100%',
              }}>
                <Button
                  variant={formState === 0 ? 'contained' : 'text'}
                  onClick={() => setFormState(0)}
                  sx={{ 
                    flex: 1,
                    py: 1,
                    ...(formState !== 0 && { 
                      color: 'text.secondary',
                      '&:hover': { backgroundColor: 'transparent' }
                    })
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant={formState === 1 ? 'contained' : 'text'}
                  onClick={() => setFormState(1)}
                  sx={{ 
                    flex: 1,
                    py: 1,
                    ...(formState !== 1 && { 
                      color: 'text.secondary',
                      '&:hover': { backgroundColor: 'transparent' }
                    })
                  }}
                >
                  Sign Up
                </Button>
              </Box>

              {/* Form */}
              <Box component="form" noValidate sx={{ width: '100%' }}>
                {formState === 1 && (
                  <Fade in timeout={300}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Full Name"
                      value={name}
                      autoFocus
                      onChange={(e) => setName(e.target.value)}
                      onKeyPress={handleKeyPress}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person sx={{ color: 'text.secondary', fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 2 }}
                    />
                  </Fade>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: 'text.secondary', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKey sx={{ color: 'text.secondary', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: 'text.secondary' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />

                {error && (
                  <Fade in>
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  </Fade>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mb: 3, py: 1.5 }}
                  onClick={handleAuth}
                  disabled={isLoading}
                >
                  {isLoading ? 'Please wait...' : (formState === 0 ? 'Sign In' : 'Create Account')}
                </Button>
              </Box>

              {/* Footer */}
              <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                {formState === 0 ? "Don't have an account? " : "Already have an account? "}
                <Button
                  variant="text"
                  onClick={() => setFormState(formState === 0 ? 1 : 0)}
                  sx={{ 
                    textTransform: 'none', 
                    fontWeight: 500,
                    p: 0,
                    minWidth: 'auto',
                  }}
                >
                  {formState === 0 ? 'Sign up' : 'Sign in'}
                </Button>
              </Typography>
            </Box>
          </Fade>
        </Grid>
      </Grid>

      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}