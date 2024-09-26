import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "@reach/router";
import { useLocalStorage } from "./use-local-storage";

const fenceUserInfoUrl = `${process.env.GATSBY_FENCE_AUTH_ROOT}/user/user/`;

const parseHash = hash => {
  const hashReducer = (object, item) => {
    const [key, value] = item.split("=");
    object[key] = value;
    return object;
  };
  return hash.split("&").reduce(hashReducer, {});
};

const extractProjects = user => {
  return Object.keys(user.authz)
    .filter(key => key.includes("/projects/"))
    .map(key => key.substr(key.lastIndexOf("/") + 1));
};

export const FenceContext = React.createContext({});

export const FenceProvider = ({ children }) => {
  const location = useLocation();
  const [fenceUser, setFenceUser] = useLocalStorage("fenceUser", null);
  const [user, setUser] = useState();
  const [authParams, setAuthParams] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [authed, setAuthed] = useState(false);
  const [projects, setProjects] = useState();

  const checkAccessUrl = process.env.GATSBY_FENCE_AUTH_ROOT
    + `/user/oauth2/authorize`
    + `?idp=ras`
    + `&client_id=${ process.env.GATSBY_FENCE_CLIENT_ID }`
    + `&response_type=id_token+token`
    + `&scope=openid+user`
    + `&nonce=2bfe151af238d21f48d8a8bf8bbec408838c8dc0ace6b4c5621ac9dfa157798b`
    + `&redirect_uri=${ process.env.NODE_ENV !== 'production'
      ? location.origin + location.pathname
      : `https://biodatacatalyst.nhlbi.nih.gov/use-bdc/explore-data/`
    }`;

  useEffect(() => {
    const hashParams = parseHash(location.hash.substr(1));
    setAuthParams(hashParams);
  }, [location.hash]);

  useEffect(() => {
    const fetchProjects = async accessToken => {
      setIsLoading(true);
      await axios
        .get(fenceUserInfoUrl, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then(response => {
          setUser(response.data);
          setProjects(extractProjects(response.data).sort());
        })
        .catch(error => {
          setError(error);
        })
        .finally(() => setIsLoading(false));
    };
    // if fence user found in local storage
    if (fenceUser && !authed) {
      setIsLoading(true);
      try {
        const jwt = jwtDecode(fenceUser.id_token);
        const { exp } = jwt;
        const now = new Date();
        const expirationDate = new Date(exp * 1000); // seconds to milliseconds
        if (now < expirationDate) {
          const { context: user } = jwt;
          setUser(user);
          fetchProjects(fenceUser.access_token);
          setAuthed(true);
        } else {
          throw new Error("nope");
        }
      } catch {
        setIsLoading(false);
        setAuthed(false);
      }
    }
    // if fence query params are present
    if (authParams && authParams.hasOwnProperty("id_token") && !authed) {
      setIsLoading(true);
      const jwt = jwtDecode(authParams.id_token);
      const { exp } = jwt;
      const now = new Date();
      const expirationDate = new Date(exp * 1000); // seconds to milliseconds
      if (now < expirationDate) {
        const { context: user } = jwt;
        setUser(user);
        fetchProjects(authParams.access_token);
        setFenceUser(authParams);
        setAuthed(true);
      } else {
        setAuthed(false);
        setError("Sorry &mdash; an error occurred during authentication!");
      }
    }
    setIsLoading(false);
  }, [authParams, fenceUser, setFenceUser, authed]);

  return (
    <FenceContext.Provider value={{
      authed,
      checkAccessUrl,
      error,
      isLoading,
      projects,
      user,
    }}>
      { children }
    </FenceContext.Provider>
  );
};

export const useFence = () => React.useContext(FenceContext);
