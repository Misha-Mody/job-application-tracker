// javascript for drag and drop feature

async function fetchAppliedJobs() {
  const res = await fetch("./getAppliedjobs");
  const jobs = await res.json();
  const applied = document.getElementById("col1");
  let heading = document.createElement("h3");
  heading.className = "title";
  heading.innerHTML = "Applied";
  applied.appendChild(heading);
  jobs.forEach((job) => {
    // Create card element
    const card = document.createElement("div");
    card.className = "card draggable border-info mb-3";
    card.setAttribute("id", job.jobid);
    card.setAttribute("draggable", true);

    // Construct card content
    card.innerHTML = `
            <i class="fa-solid fa-pen icon drag"></i>
            <div class="row g-0">
                <div class="col-md-4">
                     <img src=${job.img} class="img-fluid rounded-start" alt="company logo">
                </div>
                <div class="col-md-8">

                    <div class="card-body">
                        <h5 class="card-title">
                            ${job.company}
                        </h5>
                        <h6 class="card-subtitle mb-2 text-muted">
                            ${job.posname}
                        </h6>
                        <p class="card-text">
                            <b>Applied Date:</b>
                            ${job.applieddate}
                        </p>
                    </div>

                </div
            </div>

            <a href="./delete/${job.jobid}"> 
            <button type="button" class="btn btn-danger icon delete">
                <i class="fa-solid fa-trash"></i>
            </button>
      </a>
              `;
    applied.appendChild(card);
  });
}

async function fetchAssessmentJobs() {
  const res = await fetch("./getAssessmentjobs");
  const jobs = await res.json();
  const assessment = document.getElementById("col2");
  let heading = document.createElement("h3");
  heading.className = "title";
  heading.innerHTML = "Online Assessment";
  assessment.appendChild(heading);
  jobs.forEach((job) => {
    // Create card element
    const card = document.createElement("div");
    card.className = "card draggable border-info mb-3";
    card.setAttribute("id", job.jobid);
    card.setAttribute("draggable", true);

    // Construct card content
    card.innerHTML = `
            <i class="fa-solid fa-pen icon drag"></i>
            <div class="row g-0">
                <div class="col-md-4">
                     <img src=${job.img} class="img-fluid rounded-start" alt="company logo">
                </div>
                <div class="col-md-8">

                    <div class="card-body">
                        <h5 class="card-title">
                            ${job.company}
                        </h5>
                        <h6 class="card-subtitle mb-2 text-muted">
                            ${job.posname}
                        </h6>
                        <p class="card-text">
                            <b>Assessment Date:</b>
                            ${job.applieddate}
                        </p>
                    </div>

                </div
            </div>

            <a href="./delete/${job.jobid}"> 
            <button type="button" class="btn btn-danger icon delete">
                <i class="fa-solid fa-trash"></i>
            </button>
      </a>
              `;
    assessment.appendChild(card);
  });
}
async function fetchInterviewJobs() {
  const res = await fetch("./getInterviewjobs");
  const jobs = await res.json();
  const interview = document.getElementById("col3");
  let heading = document.createElement("h3");
  heading.className = "title";
  heading.innerHTML = "Scheduled Interview";
  interview.appendChild(heading);

  jobs.forEach((job) => {
    // Create card element
    const card = document.createElement("div");
    card.className = "card draggable border-info mb-3";
    card.setAttribute("id", job.jobid);
    card.setAttribute("draggable", true);

    // Construct card content
    card.innerHTML = `
         <button type="button" onClick="openModal1(${job.jobid})" class="icon drag">
               <i class="fa-solid fa-pen"></i>
          </button>

            <div class="row g-0">
                <div class="col-md-4">
                     <img src=${job.img} class="img-fluid rounded-start" alt="company logo">
                </div>
                <div class="col-md-8">

                    <div class="card-body">
                        <h5 class="card-title">
                            ${job.company}
                        </h5>
                        <h6 class="card-subtitle mb-2 text-muted">
                            ${job.posname}
                        </h6>
                        <p class="card-text">
                            <b>Interview Date:</b>
                            ${job.applieddate}
                        </p>
                    </div>

                </div
            </div>
            <a href="./delete/${job.jobid}"> 
                  <button type="button" class="btn btn-danger icon delete">
                      <i class="fa-solid fa-trash"></i>
                  </button>
            </a>
              `;

    interview.appendChild(card);
  });
}
async function fetchStatusJobs() {
  const res = await fetch("./getStatusjobs");
  const jobs = await res.json();
  const status = document.getElementById("col4");
  let heading = document.createElement("h3");
  heading.className = "title";
  heading.innerHTML = "Status";
  status.appendChild(heading);

  jobs.forEach((job) => {
    // Create card element
    const card = document.createElement("div");
    card.className = "card draggable border-info mb-3";
    card.setAttribute("id", job.jobid);
    card.setAttribute("draggable", true);

    // Construct card content
    card.innerHTML = `
            <i class="fa-solid fa-pen icon drag"></i>
            <div class="row g-0">
                <div class="col-md-4">
                     <img src=${job.img} class="img-fluid rounded-start" alt="company logo">
                </div>
                <div class="col-md-8">

                    <div class="card-body">
                        <h5 class="card-title">
                            ${job.company}
                        </h5>
                        <h6 class="card-subtitle mb-2 text-muted">
                            ${job.posname}
                        </h6>
                        <p class="card-text">
                            <b>Status:</b>
                            ${job.status}
                        </p>
                    </div>

                </div
            </div>

            <a href="./delete/${job.jobid}"> 
            <button type="button" class="btn btn-danger icon delete">
                <i class="fa-solid fa-trash"></i>
            </button>
      </a>
              `;

    status.appendChild(card);
  });
}

function fetchJobs() {
  fetchAppliedJobs();
  fetchAssessmentJobs();
  fetchInterviewJobs();
  fetchStatusJobs();
}

fetchJobs();

// edit functionality

function openModal1(jobid) {
  console.log(jobid);
}

// const icons = document.querySelectorAll(".drag");
// console.log(icons);
// for (let i = 0; i < icons.length; i++) {
//   const icon = icons[i];
//   console.log(icon);
//   icon.addEventListener("click", (e) => {
//     e.preventDefault();

//     let myModal = new bootstrap.Modal(document.getElementById("addJobModal"));
//     myModal.show();
//   });
// }

const cards = document.querySelectorAll(".draggable");
const columns = document.querySelectorAll(".column-box");
const emptybox = document.querySelectorAll(".droppable");
let draggedItem = null;

for (let i = 0; i < cards.length; i++) {
  const item = cards[i];

  item.addEventListener("dragstart", function (ev) {
    draggedItem = item;
    setTimeout(function () {
      draggedItem.style.display = "none";
      for (let box of emptybox) {
        box.style.display = "block";
      }
      ev.dataTransfer.clearData();
      console.log(ev.target.id);
      ev.dataTransfer.setData("text/plain", ev.target.id);
    }, 0);
  });

  item.addEventListener("dragend", function () {
    setTimeout(function () {
      draggedItem.style.display = "block";
      draggedItem = null;
      for (let box of emptybox) {
        box.style.display = "none";
      }
    }, 0);
  });
}
for (let j = 0; j < columns.length; j++) {
  const col = columns[j];
  col.addEventListener("dragover", function (e) {
    e.preventDefault();
  });
  col.addEventListener("dragenter", function (e) {
    e.preventDefault();
  });

  col.addEventListener("drop", function (ev) {
    this.prepend(draggedItem);
    ev.dataTransfer.clearData();
    console.log(ev.target.id);
    ev.dataTransfer.setData("text/plain", ev.target.id);
  });
}
