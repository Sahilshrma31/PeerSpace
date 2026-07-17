import * as React from 'react';
import { Snackbar, Alert, Fade, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

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

  const handleAuth = async (e) => {
    if (e) e.preventDefault();
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
    <div style={{ minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Unified RamAIn Navbar */}
      <Navbar />

      <div className="ramain-auth-card">
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'var(--accent-lime)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            margin: '0 auto 16px',
            boxShadow: '0 4px 12px rgba(197, 255, 74, 0.4)'
          }}>
            🔐
          </div>

          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '800', marginBottom: '10px', letterSpacing: '-0.03em' }}>
            {formState === 0 ? (
              <>Welcome <span className="lime-highlight">back</span></>
            ) : (
              <>Create <span className="lime-highlight">account</span></>
            )}
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Whether you're catching up with friends, studying together, or sharing a laugh — this platform brings you closer.
          </p>
        </div>

        {/* Tab Toggle Bar */}
        <div style={{
          display: 'flex',
          background: '#F3F4F6',
          padding: '6px',
          borderRadius: '14px',
          marginBottom: '28px',
          border: '1px solid var(--border-light)'
        }}>
          <button
            type="button"
            onClick={() => { setFormState(0); setError(''); }}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '10px',
              border: 'none',
              fontWeight: '700',
              fontSize: '0.92rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: formState === 0 ? '#111827' : 'transparent',
              color: formState === 0 ? '#FFFFFF' : 'var(--text-secondary)',
              boxShadow: formState === 0 ? '0 2px 8px rgba(0,0,0,0.15)' : 'none'
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setFormState(1); setError(''); }}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '10px',
              border: 'none',
              fontWeight: '700',
              fontSize: '0.92rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: formState === 1 ? '#111827' : 'transparent',
              color: formState === 1 ? '#FFFFFF' : 'var(--text-secondary)',
              boxShadow: formState === 1 ? '0 2px 8px rgba(0,0,0,0.15)' : 'none'
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleAuth}>
          {formState === 1 && (
            <Fade in timeout={300}>
              <div className="ramain-form-group">
                <label className="ramain-label">Full Name</label>
                <input
                  type="text"
                  required
                  className="ramain-input"
                  placeholder="Enter your full name"
                  value={name}
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </Fade>
          )}

          <div className="ramain-form-group">
            <label className="ramain-label">Username</label>
            <input
              type="text"
              required
              className="ramain-input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>

          <div className="ramain-form-group">
            <label className="ramain-label">Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="ramain-input"
                placeholder="Enter your secret password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{ paddingRight: '44px' }}
              />
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '8px', color: 'var(--text-muted)' }}
                size="small"
              >
                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
            </div>
          </div>

          {error && (
            <Fade in>
              <Alert severity="error" sx={{ mb: 3, borderRadius: '10px' }}>
                {error}
              </Alert>
            </Fade>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-lime"
            style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '8px' }}
          >
            {isLoading ? 'Please wait...' : (formState === 0 ? 'Sign In to Account' : 'Create Free Account')}
          </button>
        </form>

        {/* Footer Toggle */}
        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
          {formState === 0 ? "Don't have an account yet? " : "Already registered? "}
          <span
            onClick={() => setFormState(formState === 0 ? 1 : 0)}
            style={{ color: '#111827', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {formState === 0 ? 'Sign up here' : 'Sign in here'}
          </span>
        </div>
      </div>

      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ borderRadius: '10px', fontWeight: '600' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}