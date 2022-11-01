async function fetchUsers() {
  const res = await fetch("./getUser");
  const jobs = await res.json();

  console.log(jobs);
}

fetchUsers();
