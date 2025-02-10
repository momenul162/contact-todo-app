import baseURL from "@/lib/baseUrl";

export const fetchProfiles = async () => {
  const { data } = await baseURL.get(`/profile/activities`);

  return data;
};

export const fetchProfile = async () => {
  const { data } = await baseURL.get(`/profile`);
  return data.data;
};
