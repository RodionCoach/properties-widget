import { Timeline } from "./plugins/timeline";
import { QuestionButton } from "./plugins/questionButton";
import "./index.css";

const wrapper = document.getElementById("timeline-wrapper");
const modal = document.getElementById("modal-wrapper");
const titles = document.getElementsByClassName("point");
const closeVideoButton = document.getElementById("closeButton");
const modalLayout = ({ title, content }) => `
<div class="modal-content">
  <p class="modal-title">${title || ""}</p>
  <div class="modal-description">${content}</div>
</div>`;

let timeline;
let questionButtons = [];

const seqCount = {
  "INT3D-124": 97,
  "INT3D-125": 438,
  "INT3D-126": 198,
  "INT3D-127": 420,
};

const descriptions = {
  "INT3D-124": [
    {
      id: 1,
      title: "Cookware",
      content: `
    <ul>
      <li>Has luster and can be polished</li>
      <li>Is a good conductor of heat and electricity</li>
      <li>Has high melting and boiling points </li>
      <li>Is solid</li>
      <li>Is heavy and not brittle</li>
      <li>Is ductile and malleable</li>
      <li>Produces a ringing sound</li>
    </ul>`,
      positionClass: "right-corner",
    },
  ],
  "INT3D-125": [
    {
      id: 1,
      content: `
        <p class="modal-title">Types of Sunscreen<p>
        <p class="modal-description">Sunscreen has active ingredients that provide protection to the skin by either blocking UV light (physical sunscreen) or absorbing it (chemical sunscreen) before it damages the skin.<p>
        <p class="modal-title">Properties of Sunscreen</p>
        <ul>
          <li>Physical sunscreen applied on top of the skin acts as a barrier to the skin and reflects sunrays, protecting the skin from the damage of UV light.</li>
          <li>Chemical sunscreen absorbs the UV rays before they enter the skin and damage it.</li>
        </ul>
        `,
      positionClass: "right-corner",
    },
  ],
  "INT3D-126": [
    {
      id: 1,
      title: "Types of Fuels",
      content: `<p>Fuels are substances that produce heat and energy when they burn. There are solid fuels (such as wood and charcoal), liquid fuels (such as kerosene and diesel), and gaseous fuels (such as natural gas and propane).</p>`,
      positionClass: "above-object",
    },
    {
      id: 2,
      title: "Chemical Properties of Fuel",
      content: `
    <ul>
      <li>Physical sunscreen applied on top of the skin acts as a barrier to the skin and reflects sunrays, protecting the skin from the damage of UV light.</li>
      <li>Chemical sunscreen absorbs the UV rays before they enter the skin and damage it.</li>
    </ul>`,
      positionClass: "next-to-object",
    },
  ],
  "INT3D-127": [
    {
      id: 1,
      content: `
        <p class="modal-title">Examples of Industrial Applications<p>
        <p class="modal-description">Industrial applications are when chemicals are used in an industrial setting. Examples of industrial applications include acid etching, fracking, passivation of stainless steel, and the creation of synthetic fibers such as polyester from chemical reactants.<p>
        <p class="modal-title">Chemical Properties of Industrial Applications</p>
        <p class="modal-description">Industrial applications use chemicals and apply them to different industries to make new products. For example, ferric chloride or copper sulfate can be used to chemically etch parts for the automotive industry. Both of these chemicals form acids when mixed with water. These acids attack metal in a chemical reaction.<p>
        `,
      positionClass: "right-corner",
    },
  ],
};

const closeModal = (event) => {
  if (
    event.code === "Escape" ||
    event.target.getAttribute("id") === modal.getAttribute("id")
  ) {
    modal.innerHTML = "";
    modal.classList.toggle("hidden");

    timeline.play();

    modal.removeEventListener("click", closeModal);
    document.removeEventListener("keydown", closeModal);
  }
};

const showVideo = (id) => {
  wrapper.classList.add("opened");

  timeline = new Timeline({
    containerId: "timeline",
    namePattern: id,
    fileExtension: "jpg",
    framesCount: seqCount[id],
    framesFolder: `/static/${id}`,
    fps: 15,
    onLoad: () => {
      descriptions[id].forEach((description) => {
        const button = new QuestionButton(description);
        questionButtons.push(button);
    
        wrapper.appendChild(button?.question);
    
        const questionInDOM = document.getElementById(`question-${description.id}`);
        
        questionInDOM.addEventListener("click", () => {
          modal.innerHTML = modalLayout(description);
          modal.classList.toggle("hidden");
    
          timeline.pause();
    
          modal.addEventListener("click", closeModal);
          document.addEventListener("keydown", closeModal);
        });
      });
    }
  });

  timeline.init();
};

const closeVideo = () => {
  if (wrapper.classList.contains("opened")) {
    wrapper.classList.remove("opened");
    timeline.destroy();
    questionButtons.forEach((button) => button?.destroy(wrapper, button.id));
    questionButtons = [];
  }
};

for (let title of titles) {
  title.addEventListener("click", () => {
    showVideo(title.getAttribute("data-point"));
  });
}

closeVideoButton.addEventListener("click", () => {
  closeVideo();
});
