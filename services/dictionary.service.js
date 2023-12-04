const API = "https://653f4b7b9e8bd3be29e02fc1.mockapi.io/dictionary";

export const fetchData = async (id) => {
  try {
    const response = await fetch(`${API}/${id}`);
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateToAPI = async (newDic, id) => {
  try {
    const updateUser = async () => {
      await fetch(`${API}/${id}`, {
        method: "put",
        body: JSON.stringify(newDic),
        headers: {
          "Content-Type": "application/json",
        },
      });
    };
    await updateUser(); // Invoke the async function here
    // Since there's only one promise, you don't need Promise.all
    return "Update successful"; // Or any other meaningful result
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
};
