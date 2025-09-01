// script-project.js

const projects = [
  {
    id: "fitbot",
    school: "Hogeschool van Amsterdam",
    year: "2022",
    title: "FitBot - NAO Control App",
    keywords: "ANDROID DEV / ROBOTICS / JAVA / MQQT",
    number: "01",
    details: [
      { title: "Category", value: "Health, Companionship, and Technology" },
      { title: "Year", value: "2022" },
      { title: "Brief", value: "Create a visual identity for an upcoming exhibition about human nature and its struggles, including design assets for various needs of usage such as poster, social media etc. Looking for bold & cohesive visual presence." },
      { title: "Link", value: '<a href="">GitLab</a>' }
    ],
    image: "project-images/nao.png",
    attention: "Imagine being an elderly person, living alone, and having a friendly robot not only guide you through simple exercises but also chat with you to brighten your day. That’s what I wanted to achieve with FitBot, a mix of movement, companionship, and technology working together.",
    description: `The NAO Control App was developed to help older adults stay physically active while also offering social interaction through the NAO humanoid robot (FitBot).<br><br>
    Through the Android app, users could:
    <ul>
      <li>Select personalized training programs tailored to elderly mobility.</li>
      <li>Exercise with NAO as it demonstrated routines in an engaging, motivating way.</li>
      <li>Have conversations with the robot, reducing loneliness by providing a digital buddy.</li>
    </ul>
    On the technical side, I built the app in Android Studio (Java/XML) and set up communication between the app and the NAO robot using the MQTT protocol. This ensured real-time interaction: when users selected a training or conversational option, the NAO robot responded immediately.
    This project brought together mobile development, robotics, and human-centered design, showing how technology can enrich daily life for the elderly.`
  },
  // Add more projects here, each with a unique "id"
  // {
  //   id: "project2",
  //   ...
  // }
];

// Helper to get query param
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

window.addEventListener('DOMContentLoaded', () => {
  const projectId = getQueryParam('id') || projects[0].id; // fallback to first project
  const projectData = projects.find(p => p.id === projectId);

  if (!projectData) {
    document.body.innerHTML = "<h2>Project not found.</h2>";
    return;
  }

  document.getElementById('school').textContent = projectData.school;
  document.getElementById('year').textContent = projectData.year;
  document.getElementById('project-title').innerHTML = projectData.title;
  document.getElementById('project-keywords').textContent = projectData.keywords;
  document.getElementById('project-number').textContent = projectData.number;

  // Details
  const detailsSection = document.getElementById('project-details');
  detailsSection.innerHTML = '';
  projectData.details.forEach(detail => {
    const article = document.createElement('article');
    article.innerHTML = `<h2 class="title">${detail.title}</h2><h3>${detail.value}</h3>`;
    detailsSection.appendChild(article);
  });

  // Image
  document.getElementById('project-image-img').src = projectData.image;

  // Attention grabber
  document.getElementById('attention-grabber').innerHTML = `<i>${projectData.attention}</i>`;

  // Description
  document.getElementById('project-description').innerHTML = projectData.description;
});
