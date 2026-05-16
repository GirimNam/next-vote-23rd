let accessToken: string | null = null;

export const getAccessToken = () => accessToken;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = null;
};

export const silentRefresh = async (): Promise<boolean> => {
  try {
    {
      /* 
     const res = await fetch("/api/auth/reissue", {
       method: "POST",
       credentials: "include", 
     });
     const { accessToken: newToken } = await res.json();
     setAccessToken(newToken);*/
    }
    return true;
  } catch {
    return false;
  }
};
