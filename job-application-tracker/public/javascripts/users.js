function UserFunctions() {
  const userfunc = {};

  //returns a list of all users in the database
  async function renderUsers() {
    const res = await fetch("./getUserList");
    const users = await res.json();

    const usersDiv = document.querySelector("div#users");

    usersDiv.innerHTML = "";
    for (let u of users) {
      const uDiv = document.createElement("div");

      //need to fix this by making it into a table.
      uDiv.className = "card";
      uDiv.innerHTML = `
        <div class="card-body">
          <div class="card-title"><h5>${u.name}</h5></div>
          <div>
           <a href="./profile.html?id=${u._id}"><i class="bi-eye-fill"></i></a>
           <a href="./profileEdit.html?id=${u._id}"><i class="bi bi-pencil-fill"></i></a>
           <a href="./deleteProfile.html?id=${u._id}"><i class="bi bi-trash-fill"></i></a>
          </div>
        </div>
      `;
      //check delete
      usersDiv.appendChild(uDiv);
    }
  }

  //show the profile data
  function renderProfile(profile) {
    if (!profile) return console.log("rederprofile no user provided");

    const divContent = document.querySelector("#profile");

    for (let p in profile) {
      if (p == "_id" || p == "id") continue;
      const cardDiv = document.createElement("div");
      cardDiv.className = "card col-md-12 col-sm-1";
      let header = p.toUpperCase();
      cardDiv.innerHTML = `
      <div class = "card-header">
        <h5 class="card-title">${header}</h5>
      </div>
      <div class="card-body">
        <p class="card-text">
          ${profile[p]}
        </p>
      </div>`;
      divContent.appendChild(cardDiv);
    }
  }

  //get current user profile
  async function getCurrentUserProfile() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    let userID = params.id;

    if (!userID) {
      return showMessage("No user id detected.");
    }

    let res = await fetch(`/getProfileByID/${userID}`);
    let profile = await res.json();
    renderProfile(profile[0]);
  }

  //Edit form function
  function renderEditProfile(profile) {
    if (!profile) return console.log("reder profile no user provided");

    const divContent = document.querySelector("#editform");
    for (let p in profile) {
      const cardDiv = document.createElement("div");
      cardDiv.className = "form-group";
      let header = p.toUpperCase();

      if (p == "_id" || p == "id") {
        cardDiv.innerHTML =
          // <label type="hidden" for=${p}>${header}</label/>
          `<input type="hidden" name=${p} class="form-control" id=${p} value="${profile[p]}">`;
      } else {
        cardDiv.innerHTML = `
          <label for=${p}>${header}</label/>
          <input type="text" name=${p} class="form-control" id=${p} value="${profile[p]}">`;
      }
      divContent.appendChild(cardDiv);
    }
  }

  async function editUserProfile() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    let userID = params.id;

    if (!userID) {
      return showMessage("No user id detected.");
    }

    let res = await fetch(`/getProfileByID/${userID}`);
    let profile = await res.json();
    renderEditProfile(profile[0]);
  }

  //delete profile
  async function deleteUserProfile() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    let userID = params.id;

    if (!userID) {
      return showMessage("No user id detected.");
    }
    await fetch(`/deleteProfile/${userID}`);
    return;
  }

  userfunc.renderUsers = renderUsers;
  userfunc.getCurrentUserProfile = getCurrentUserProfile;
  userfunc.editUserProfile = editUserProfile;
  userfunc.deleteUserProfile = deleteUserProfile;

  return userfunc;
}

export default UserFunctions();
