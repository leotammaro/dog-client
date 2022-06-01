import React, { useContext, useEffect, useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import "./navbar.css";
import UserContext from "../context/UserContext";
import userProfile from "../assets/user.svg";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import menu from "../assets/menu.svg";
import { Link, useLocation, useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Spinner } from "@chakra-ui/react";


function Navbar() {
  const [userDisplayName, setUserDisplayName] = useState("");
  const { email, isLoading, isLoggedIn } = useContext(UserContext);
  const location = useLocation();
  const auth = getAuth();
  const history = useHistory();

  const logOut = () => {
    signOut(auth)
      .then(() => history.push("/login"))
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    setUserDisplayName(email?.split("@")[0]);
  }, [email]);

  return (
    <Flex w="100%" justifyContent="space-between" padding={3} h={55}>
      {location.pathname === "/app" ? (
        <Image
          src="https://iconape.com/wp-content/png_logo_vector/dog.png"
          w={8}
          h={8}
        />
      ) : (
        <Link to="/">
          <Image
            src="https://iconape.com/wp-content/png_logo_vector/dog.png"
            w={8}
          />
        </Link>
      )}

      <Flex alignItems="center" flex="0.1" justifyContent="space-between">
        {isLoggedIn && (
          <Button
            px={10}
            borderRadius={10}
            mr={3}
            onClick={() => history.push("/app/new-report")}
          >
            + Reportar Mascota
          </Button>
        )}

        {isLoading ? (
          <Spinner />
        ) : (
          isLoggedIn && (
            <Menu>
              <MenuButton
                border="1px solid #ddd"
                backgroundColor="white"
                as={Button}
                display="flex"
                padding="10px !important"
                borderRadius="20px"
                rightIcon={<Image src={userProfile} h="25px" w="25px" />}
              >
                <Image
                  padding="0 5px"
                  boxSizing="content-box"
                  src={menu}
                  h="15px"
                  w="15px"
                />
              </MenuButton>
              <MenuList zIndex="1000">
                <Link to={`/${userDisplayName}`}>
                  <MenuItem>Tus reportes</MenuItem>
                </Link>
                <Link to="/login" onClick={logOut}>
                  <MenuItem>Cerrar sesión</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          )
        )}
      </Flex>
    </Flex>
  );
}

export default Navbar;
