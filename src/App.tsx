import { AppBar, Box, Container, CssBaseline, ThemeProvider, Toolbar, Typography } from '@mui/material';
import { theme } from './theme';
import { AuthorFooter, RepoLink, VersionBadge } from './site/ProjectChrome';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: 'rgba(26, 26, 26, 0.9)',
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Toolbar sx={{ gap: 2 }}>
            <Typography variant="h6" fontWeight="900" color="white" sx={{ whiteSpace: 'nowrap' }}>
              Demo
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <RepoLink />
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ flexGrow: 1, py: 6 }}>
          <Container maxWidth="md">
            <Typography variant="h3" fontWeight="900" gutterBottom>
              Project demo
            </Typography>
            <Typography color="text.secondary">
              Replace this page with the project&apos;s own demo. The app bar, footer and version
              badge are already wired.
            </Typography>
          </Container>
        </Box>

        <AuthorFooter />
      </Box>
      <VersionBadge />
    </ThemeProvider>
  );
}
