import React, { useContext } from "react";
import Header from "./Header";
import {
  Container,
  Alert,
  Snackbar,
  IconButton,
  CloseIcon,
} from "@/components/mui";
import { UIContext } from "@/components/contexts/UI.context";

function Layout({children}) {
  const {
    isOpen: open,
    severity,
    onClose: handleClose,
    message,
    hideDuration,
  } = useContext(UIContext);

  const action = (props) => {
    console.log(props);
    return (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="md">
          {children}
        </Container>
      </main>
      <Snackbar
        open={open}
        autoHideDuration={hideDuration}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%", mb:0 }}>
          {message}
          {action}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Layout;
