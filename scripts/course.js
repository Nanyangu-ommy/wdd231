const menuBtn = document.querySelector("#menu-btn");
const navMenu = document.querySelector("#nav-menu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;

const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 3, type: "WDD", completed: true },
  { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 3, type: "WDD", completed: true },
  { code: "CSE110", name: "Intro to Programming", credits: 2, type: "CSE", completed: true },
  { code: "CSE111", name: "Programming with Functions", credits: 2, type: "CSE", completed: true },
  { code: "CSE210", name: "Programming with Classes", credits: 2, type: "CSE", completed: true },
  { code: "WDD231", name: "Frontend Web Development I", credits: 3, type: "WDD", completed: false }
];

const courseContainer = document.querySelector("#courseContainer");
const totalCredits = document.querySelector("#totalCredits");

function displayCourses(filteredCourses) {
  courseContainer.innerHTML = "";
  let total = 0;

  filteredCourses.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course");
    if (course.completed) div.classList.add("completed");
    div.innerHTML = `<h3>${course.code}</h3><p>${course.name}</p><p>${course.credits} credits</p>`;
    courseContainer.appendChild(div);
    total += course.credits;
  });

  totalCredits.textContent = `Total Credits: ${total}`;
}

displayCourses(courses);

document.querySelector("#all").addEventListener("click", () => displayCourses(courses));
document.querySelector("#wdd").addEventListener("click", () => displayCourses(courses.filter(c => c.type === "WDD")));
document.querySelector("#cse").addEventListener("click", () => displayCourses(courses.filter(c => c.type === "CSE")));
