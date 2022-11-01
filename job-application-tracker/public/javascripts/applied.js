// javascript rendering

// instruction modal open on first time of loading page
let is_modal_show = sessionStorage.getItem("alreadyShow");
if (is_modal_show != "alredy shown") {
  const jobModal = document.getElementById("startModal");
  let myModal = new bootstrap.Modal(jobModal);
  myModal.show();
  sessionStorage.setItem("alreadyShow", "alredy shown");
}

// pagination
currentPage = 1;
paginationLimit = 5;
currentPage2 = 1;
paginationLimit2 = 5;
currentPage3 = 1;
paginationLimit3 = 5;
currentPage4 = 1;
paginationLimit4 = 5;
const q = "";

// javascript rendering of the card

async function fetchAppliedJobs(currentPage, paginationLimit, q) {
  // let totalpages = Math.ceil(parseInt(tcount) / paginationLimit);

  let res = await fetch(
    "./getAppliedjobs/?page=" +
      currentPage +
      "&total=" +
      paginationLimit +
      "&q=" +
      (q == undefined ? "" : q)
  );

  const jobs = await res.json();

  const applied = document.getElementById("col1");
  while (applied.firstChild) {
    applied.firstChild.remove();
  }

  let heading = document.createElement("h3");
  heading.className = "title";
  heading.innerHTML = "Applied";
  applied.appendChild(heading);

  let totalCards = jobs.length;
  if (totalCards == 0) {
    const empty = document.createElement("p");
    empty.className = "jumbotron";
    empty.innerHTML = "No Jobs To Show .. ";
    applied.appendChild(empty);
    return;
  }

  jobs.forEach((job) => {
    // Create card element
    const card = document.createElement("div");
    card.className = "card draggable border-info mb-3";
    card.setAttribute("id", job.jobid);
    card.setAttribute("draggable", true);

    // Construct card content
    card.innerHTML = `
                   <button type="button" class="btn btn-success icon drag" onClick="openModalEdit(${job.jobid})">
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

  const pagination = document.createElement("div");
  pagination.className = "pagination-container";
  pagination.innerHTML = `
  <button class="pagination-button" onClick="prev(${currentPage},${paginationLimit},1,q" id=${
    currentPage == 1 ? "disabled" : ""
  } id="prev-button-1" title="Previous page"
      aria-label="Previous page">
      &lt;
  </button>
  ${currentPage}
  <button class="pagination-button" 
     onClick="next(${currentPage},${paginationLimit},1,q)" id="next-button-1" title="Next page" aria-label="Next page">
      &gt;
  </button>
  `;
  applied.appendChild(pagination);
  // id=${currentPage == totalpages ? "disabled" : ""}
}
async function fetchAssessmentJobs(currentPage, paginationLimit, q) {
  const res = await fetch(
    "./getAssessmentjobs/?page=" +
      currentPage +
      "&total=" +
      paginationLimit +
      "&q=" +
      (q == undefined ? "" : q)
  );
  const jobs = await res.json();
  const assessment = document.getElementById("col2");
  while (assessment.firstChild) {
    assessment.firstChild.remove();
  }
  let heading = document.createElement("h3");
  heading.className = "title";
  heading.innerHTML = "Online Assessment";
  assessment.appendChild(heading);

  let totalCards = jobs.length;
  if (totalCards == 0) {
    const empty = document.createElement("p");
    empty.className = "jumbotron";
    empty.innerHTML = "No Jobs To Show .. ";
    assessment.appendChild(empty);
    return;
  }

  jobs.forEach((job) => {
    // Create card element
    const card = document.createElement("div");
    card.className = "card draggable border-info mb-3";
    card.setAttribute("id", job.jobid);
    card.setAttribute("draggable", true);

    // Construct card content
    card.innerHTML = `
          <button type="button" class="btn btn-success icon drag" onClick="openModalEdit(${job.jobid})">
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
  const pagination = document.createElement("div");
  pagination.className = "pagination-container";
  pagination.innerHTML = `
  <button class="pagination-button" onClick="prev(${currentPage},${paginationLimit},2,q)" id=${
    currentPage == 1 ? "disabled" : ""
  } id="prev-button-1" title="Previous page"
      aria-label="Previous page">
      &lt;
  </button>
  ${currentPage}
  <button class="pagination-button" 
     onClick="next(${currentPage},${paginationLimit},2,q)" id="next-button-1" title="Next page" aria-label="Next page">
      &gt;
  </button>
  `;
  assessment.appendChild(pagination);
}
async function fetchInterviewJobs(currentPage, paginationLimit, q) {
  const res = await fetch(
    "./getInterviewjobs/?page=" +
      currentPage +
      "&total=" +
      paginationLimit +
      "&q=" +
      (q == undefined ? "" : q)
  );
  const jobs = await res.json();
  const interview = document.getElementById("col3");
  while (interview.firstChild) {
    interview.firstChild.remove();
  }
  let heading = document.createElement("h3");
  heading.className = "title";
  heading.innerHTML = "Scheduled Interview";
  interview.appendChild(heading);

  let totalCards = jobs.length;
  if (totalCards == 0) {
    const empty = document.createElement("p");
    empty.className = "jumbotron";
    empty.innerHTML = "No Jobs To Show .. ";
    interview.appendChild(empty);
    return;
  }

  jobs.forEach((job) => {
    // Create card element
    const card = document.createElement("div");
    card.className = "card draggable border-info mb-3";
    card.setAttribute("id", job.jobid);
    card.setAttribute("draggable", true);

    // Construct card content
    card.innerHTML = `
         <button type="button" class="btn btn-success icon drag" onClick="openModalEdit(${job.jobid})">
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
  const pagination = document.createElement("div");
  pagination.className = "pagination-container";
  pagination.innerHTML = `
  <button class="pagination-button" onClick="prev(${currentPage},${paginationLimit},3,q)" id=${
    currentPage == 1 ? "disabled" : ""
  } id="prev-button-1" title="Previous page"
      aria-label="Previous page">
      &lt;
  </button>
  ${currentPage}
  <button class="pagination-button" 
     onClick="next(${currentPage},${paginationLimit},3,q)" id="next-button-1" title="Next page" aria-label="Next page">
      &gt;
  </button>
  `;
  interview.appendChild(pagination);
}
async function fetchStatusJobs(currentPage, paginationLimit, q) {
  const res = await fetch(
    "./getStatusjobs/?page=" +
      currentPage +
      "&total=" +
      paginationLimit +
      "&q=" +
      (q == undefined ? "" : q)
  );
  const jobs = await res.json();
  const status = document.getElementById("col4");
  while (status.firstChild) {
    status.firstChild.remove();
  }
  let heading = document.createElement("h3");
  heading.className = "title";
  heading.innerHTML = "Status";
  status.appendChild(heading);
  let totalCards = jobs.length;
  if (totalCards == 0) {
    const empty = document.createElement("p");
    empty.className = "jumbotron";
    empty.innerHTML = "No Jobs To Show .. ";
    status.appendChild(empty);
    return;
  }

  jobs.forEach((job) => {
    // Create card element
    const card = document.createElement("div");
    card.className = "card draggable border-info mb-3";
    card.setAttribute("id", job.jobid);
    card.setAttribute("draggable", true);

    // Construct card content
    card.innerHTML = `
              <button type="button" class="btn btn-success icon drag" onClick="openModalEdit(${job.jobid})">
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
  const pagination = document.createElement("div");
  pagination.className = "pagination-container";
  pagination.innerHTML = `
  <button class="pagination-button" onClick="prev(${currentPage},${paginationLimit},4,q)" id=${
    currentPage == 1 ? "disabled" : ""
  } id="prev-button-1" title="Previous page"
      aria-label="Previous page">
      &lt;
  </button>
  ${currentPage}
  <button class="pagination-button" 
     onClick="next(${currentPage},${paginationLimit},4,q)" id="next-button-1" title="Next page" aria-label="Next page">
      &gt;
  </button>
  `;
  status.appendChild(pagination);
}

async function fetchJobs(q) {
  fetchAppliedJobs(currentPage, paginationLimit, q);
  fetchAssessmentJobs(currentPage2, paginationLimit2, q);
  fetchInterviewJobs(currentPage3, paginationLimit3, q);
  fetchStatusJobs(currentPage4, paginationLimit4, q);
}

function callJobs(col, currentPage, paginationLimit, q) {
  if (col == 1) {
    fetchAppliedJobs(currentPage, paginationLimit, q);
  } else if (col == 2) {
    fetchAssessmentJobs(currentPage, paginationLimit, q);
  } else if (col == 3) {
    fetchInterviewJobs(currentPage, paginationLimit, q);
  } else if (col == 4) {
    fetchStatusJobs(currentPage, paginationLimit, q);
  }
}

async function prev(currentPage, paginationLimit, col, q) {
  if (currentPage == 1) {
    return;
  }
  currentPage -= 1;
  callJobs(col, currentPage, paginationLimit, q);
}

async function next(currentPage, paginationLimit, col, q) {
  currentPage += 1;
  callJobs(col, currentPage, paginationLimit, q);
}

fetchJobs(q);

// edit functionality

function formatDate(date) {
  let d = date.split("/");
  let ndate = d[2] + "-" + d[0] + "-" + d[1];
  return ndate;
}

async function openModalEdit(jobid) {
  const res = await fetch("/get/" + jobid);
  const job = await res.json();
  const myjob = job[0];
  console.log(myjob);
  let process = String(myjob.phase);
  if (myjob.phase == 4 && myjob.status == "Selected") {
    process == "5";
  }
  const jobModal = document.getElementById("editJobModal");

  // jobModal.addEventListener("show.bs.modal", (e) => {

  document.querySelector("#company").setAttribute("value", myjob.company);

  document.querySelector("#posname").setAttribute("value", myjob.posname);

  document
    .querySelector("#applieddate")
    .setAttribute("value", formatDate(myjob.applieddate));
  document
    .querySelector("#assessmentdate")
    .setAttribute("value", formatDate(myjob.assessmentdate));
  document
    .querySelector("#interviewdate")
    .setAttribute("value", formatDate(myjob.interviewdate));

  let d = document.querySelector("#process");
  d.value = process;
  document.getElementById("editjob").action = "/update/" + myjob.jobid;

  // });

  let myModal = new bootstrap.Modal(jobModal);
  myModal.show();
}

// search functionality

function Onsearch() {
  let s = document.getElementById("searchid");
  let q = s.value;
  fetchJobs(q);
}

function ClearInput() {
  let s = document.getElementById("searchid");
  s.value = " ";
  fetchJobs(" ");
}

// drag and drop functionality

window.onload = function () {
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

    col.addEventListener("drop", async function (ev) {
      const parentDiv = this;
      let sp2 = this.firstChild;
      let cardid;
      let colid;
      if (draggedItem != null) {
        parentDiv.insertBefore(draggedItem, sp2.nextSibling);
        colid = this.id.substr(this.id.length - 1);
        cardid = draggedItem.id;
        await fetch("/update/" + cardid + "/" + colid);
        console.log(colid, cardid);
        location.reload();
      }
    });
  }
};
