const apiUrl = import.meta.env.VITE_APP_API_URL;

/**
 * Function to register.
 * @param {Object} userData - The data of the user to be registered.
 * @returns {Promise} A promise that resolves to the response JSON after registering the user.
 */
export const registerUser = async (userData) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(`${apiUrl}/users/register`, requestOptions);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

/**
 * Function to login user.
 * @param {Object} userData - The data of the user to be logged In.
 * @returns {Promise} A promise that resolves to the response JSON after logging In the user.
 */
export const loginUser = async (userData) => {
  const { confirmPassword, ...user } = userData;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  try {
    const response = await fetch(`${apiUrl}/users/login`, requestOptions);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};
