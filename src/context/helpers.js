export const removeFromStorage = (state, item) => {
  const updated = state.data.filter((person) => person.id !== item.id);
  localStorage.setItem("favoritos", JSON.stringify(updated));
  return updated;
};

export const addInStorage = (state, item) => {
  const data = [...state.data, item];
  localStorage.setItem("favoritos", JSON.stringify(data));
  return data;
};
