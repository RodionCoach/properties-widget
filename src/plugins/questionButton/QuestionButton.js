import { createElement } from "../utils/createElement";
import "./index.css";

export default class QuestionButton {
  constructor(props) {
    this.id = props.id || "";
    this.question = this.getButton(props);
  }

  getButton = ({ id, positionClass }) =>
    createElement(`
      <div id="question-${id}" class="question-wrapper ${positionClass}">
        <span class="question">?</span>
      </div>`);

  destroy(parentElement, id) {
    if (parentElement) {
      const questionElement = document.getElementById(`question-${id}`);
      parentElement.removeChild(questionElement);
    }
  }
}
