async function fetchUsers() {
  const res = await fetch("./getUser");
  const jobs = await res.json();
}

fetchUsers();
