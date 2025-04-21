import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home/home";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import VerifyPage from "./pages/verifyPage/verifyPage";
import VerifyScanPage from "./pages/verifyPage/verifyScan";

function App() {
  return (
    <Router>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Authorizer App
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/verify">
              Verify
            </Button>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box sx={{ flexGrow: 1 }}>
          <Container maxWidth={false} sx={{ mt: 4 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/verify" element={<VerifyPage/>} />
              <Route path="/scan/:scanId" element={<VerifyScanPage />} />
            </Routes>
          </Container>
        </Box>

        {/*  Footer */}
        <Box component="footer" sx={{ p: 2, textAlign: "center", bgcolor: "#f5f5f5" }}>
          <Typography variant="body2"> Retail App Footer</Typography>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
