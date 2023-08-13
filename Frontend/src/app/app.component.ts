import { Component, IterableDiffers, OnInit } from '@angular/core';
import { QuestionsService } from './questions.service';
import { retry } from 'rxjs';
import { visitAll } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  constructor(private service: QuestionsService) { }
  title = 'Frontend';

  questions: Question[] = [];
  allQuestions: any = [];
  temp_AllQuestions: any = [];

  titleArrowController = new ArrowsController();
  acceptanceArrowController = new ArrowsController();
  difficultyArrowController = new ArrowsController();

  difficultyMap = new Map();

  ngOnInit() {
    console.log("hello");
    this.service.getData().subscribe((data) => {
      // console.log(data);
      this.allQuestions = data;
      this.temp_AllQuestions = [...this.allQuestions];
      this.assignedToQuestionsArray();
      this.maxPages = Math.ceil(this.allQuestions.length / 50);
    });
    this.difficultyMap.set('Easy', 1);
    this.difficultyMap.set('Medium', 2);
    this.difficultyMap.set('Hard', 3);
  }

  reverseData() {
    this.titleArrowController.counter++;
    this.titleArrowController.counter = this.titleArrowController.counter % 3;
    if (this.titleArrowController.counter > 0) {
      this.allQuestions.reverse();
    }
    this.assignedToQuestionsArray();
  }

  sortOnAcceptance() {
    this.acceptanceArrowController.counter = (this.acceptanceArrowController.counter + 1) % 3;
    if (this.acceptanceArrowController.counter === 1) {
      this.allQuestions.sort((a: any, b: any) => {
        return b.acceptance - a.acceptance;
      });
    }
    else if (this.acceptanceArrowController.counter === 2) {
      this.allQuestions.sort((a: any, b: any) => {
        return a.acceptance - b.acceptance;
      });
    }
    else {
      this.allQuestions.length = 0;
      this.allQuestions = [...this.temp_AllQuestions];
    }

    this.assignedToQuestionsArray();
  }

  sortOnDifficulty() {
    this.difficultyArrowController.counter = (this.difficultyArrowController.counter + 1) % 3;
    if (this.difficultyArrowController.counter === 1) {
      this.allQuestions.sort((a: any, b: any) => {
        return this.difficultyMap.get(b.difficulty) - this.difficultyMap.get(a.difficulty);
      });
    }
    else if (this.difficultyArrowController.counter === 2) {
      this.allQuestions.sort((a: any, b: any) => {
        return this.difficultyMap.get(a.difficulty) - this.difficultyMap.get(b.difficulty);
      });
    }
    else {
      this.allQuestions.length = 0;
      this.allQuestions = [...this.temp_AllQuestions];
    }
    this.assignedToQuestionsArray();
  }

  assignedToQuestionsArray() {
    this.questions.length = 0;
    for (let i = (this.pageNumber - 1) * 50; i < this.pageNumber * 50 && i < this.allQuestions.length; i++) {
      let tempObj: Question = {
        id: this.allQuestions[i].id,
        title: this.allQuestions[i].title,
        acceptance: this.allQuestions[i].acceptance,
        difficulty: this.allQuestions[i].difficulty,
        isEditable: false,
        renderID: i + 1
      };

      this.maxPages = Math.ceil(this.allQuestions.length / 50);
      this.questions.push(tempObj);
    }
  }

  toggleEditable(row: any) {
    row.isEditable = !row.isEditable;
  }

  deleteQuestion(row: any) {

    this.service.deleteQuestion({
      id: row.id,
      title: row.title,
      acceptance: row.acceptance,
      difficulty: row.difficulty
    }).subscribe(() => {
      console.log("Deleted Succesfully: ", row);
    }, (err) => {
      console.log("Error while deleting: ", err);
    });

    this.service.getData().subscribe((data) => {
      // console.log(data);
      this.allQuestions = data;
      this.assignedToQuestionsArray();
    });
  }

  showData(row: any, e: any) {
    console.log("hello");
  }

  saveHandeler(row: any, e: any, index: number) {
    const titleInputField = document.getElementsByClassName("title-input-field")[index] as HTMLInputElement
    const acceptanceInputField = document.getElementsByClassName("acceptance-input-field")[index] as HTMLInputElement;

    let pointCount = 0;
    let percentageSignCount = 0;

    if (titleInputField.value.length === 0) {
      titleInputField.setCustomValidity("Title can't be empty.");
      titleInputField.reportValidity();
      return;
    }

    if (acceptanceInputField.value.length === 0) {
      acceptanceInputField.setCustomValidity("Acceptance can't be empty.");
      acceptanceInputField.reportValidity();
      return;
    }

    for (let i = 0; i < acceptanceInputField.value.length; i++) {
      if (acceptanceInputField.value[i] == '.') {
        pointCount++;
        if (pointCount > 1) { break; }
      }
      else if (acceptanceInputField.value[i] == '%') {
        percentageSignCount++;
        if (percentageSignCount > 1) { break; }
      }
      else if (!(acceptanceInputField.value[i] >= '0' && acceptanceInputField.value[i] <= '9')) {
        acceptanceInputField.setCustomValidity("Invalid acceptance entered.");
        acceptanceInputField.reportValidity();
        return;
      }
    }

    if (pointCount > 1) {
      acceptanceInputField.setCustomValidity("Invalid decimal value.");
      acceptanceInputField.reportValidity();
      return;
    }

    if (percentageSignCount < 1) {
      acceptanceInputField.setCustomValidity("Apply '%' sign at the end.");
      acceptanceInputField.reportValidity();
      return;
    }

    if (percentageSignCount > 1) {
      acceptanceInputField.setCustomValidity("Invalid percentage value.");
      acceptanceInputField.reportValidity();
      return;
    }

    if (parseFloat(acceptanceInputField.value.slice(0, -1)) > 100 || parseFloat(acceptanceInputField.value.slice(0, -1)) < 0) {
      acceptanceInputField.setCustomValidity("Must be between '0%' and '100%' .");
      acceptanceInputField.reportValidity();
      return;
    }

    for (let i = 0; i < this.allQuestions.length; i++) {
      if (i == index) { continue; }

      if (this.allQuestions[i].title.trim().toLowerCase() === titleInputField.value.trim().toLowerCase()) {
        titleInputField.setCustomValidity("Question already exists.");
        titleInputField.reportValidity();
        return;
      }
    }


    if (!((row.title.trim().toLowerCase() === titleInputField.value.trim().toLowerCase()) && (row.acceptance === Number(acceptanceInputField.value.slice(0, acceptanceInputField.value.length - 1))))) {
      this.questions[index].title = titleInputField.value;
      this.questions[index].acceptance = Number(acceptanceInputField.value.slice(0, acceptanceInputField.value.length - 1));

      this.allQuestions[index].title = this.questions[index].title;
      this.allQuestions[index].acceptance = this.questions[index].acceptance;

      this.service.editData({
        id: row.id,
        title: row.title,
        acceptance: row.acceptance,
        difficulty: row.difficulty
      }).subscribe((res) => {
        console.log("DATA CHANGED SUCCESS BACKEND: ", res);
      }, (err) => {
        console.log("Error while editing question: ", err);
      });
    }
    else {
      console.log("You changed nothing.");
    }
    row.isEditable = !row.isEditable;
  }

  changeDifficulty(row: any, index: number, direction: number) {
    let editDifficultyMap = new Map();

    editDifficultyMap.set(1, "Easy");
    editDifficultyMap.set(2, "Medium");
    editDifficultyMap.set(3, "Hard");

    let difficultyLevel = this.difficultyMap.get(row.difficulty) + direction;
    if (difficultyLevel > 3) {
      difficultyLevel = 1;
    }
    else if (difficultyLevel < 1) {
      difficultyLevel = 3;
    }

    this.questions[index].difficulty = editDifficultyMap.get(difficultyLevel);
    this.allQuestions[index].difficulty = this.questions[index].difficulty;

  }


  openModal() {
    const modal = document.getElementById("add-question-modal") as HTMLDialogElement;
    modal.showModal();

  }

  closeModal() {
    const modal = document.getElementById("add-question-modal") as HTMLDialogElement;
    modal.close();
  }

  isTitleEmpty = true;
  isAcceptanceEmpty = true;
  isDifficultyEmpty = true;

  addQuestionInputEmptyHandler() {
    const titleInputField = document.getElementById("add-question-title") as HTMLInputElement;
    const acceptanceInputField = document.getElementById("add-question-acceptance") as HTMLInputElement;
    const difficultyInputField = document.getElementById("add-question-difficulty") as HTMLInputElement;

    this.isTitleEmpty = (titleInputField.value.length === 0) ? true : false;

    this.isAcceptanceEmpty = (acceptanceInputField.value.length === 0) ? true : false;

    this.isDifficultyEmpty = (difficultyInputField.value.length === 0) ? true : false;
  }

  submitBTN_AddQuestion() {
    let isValid = true;

    const titleInputField = document.getElementById("add-question-title") as HTMLInputElement;
    const acceptanceInputField = document.getElementById("add-question-acceptance") as HTMLInputElement;
    const difficultyInputField = document.getElementById("add-question-difficulty") as HTMLInputElement;

    if (titleInputField.value.length === 0) {
      titleInputField.setCustomValidity("Title can't be empty.");
      titleInputField.reportValidity();
      isValid = false;
      return;
    }

    for (let i = 0; i < this.allQuestions.length; i++) {
      if (this.allQuestions[i].title.trim().toLowerCase() === titleInputField.value.trim().toLowerCase()) {

        titleInputField.setCustomValidity("Question already exist.");
        titleInputField.reportValidity();

        isValid = false;
        return;
      }
    }
    if (acceptanceInputField.value.length === 0) {
      acceptanceInputField.setCustomValidity("Acceptance can't be empty.");
      acceptanceInputField.reportValidity();
      isValid = false;
      return;
    }

    let pointCount = 0;
    let percentageSignCount = 0;
    for (let i = 0; i < acceptanceInputField.value.length; i++) {
      if (acceptanceInputField.value[i] == '.') {
        pointCount++;
        if (pointCount > 1) { break; }
      }
      else if (acceptanceInputField.value[i] == '%') {
        percentageSignCount++;
        if (percentageSignCount > 1) { break; }
      }
      else if (!(acceptanceInputField.value[i] >= '0' && acceptanceInputField.value[i] <= '9')) {
        acceptanceInputField.setCustomValidity("Invalid acceptance entered.");
        acceptanceInputField.reportValidity();
        return;
      }
    }

    if (pointCount > 1) {
      acceptanceInputField.setCustomValidity("Invalid decimal value.");
      acceptanceInputField.reportValidity();
      return;
    }

    if (percentageSignCount < 1) {
      acceptanceInputField.setCustomValidity("Apply '%' sign at the end.");
      acceptanceInputField.reportValidity();
      return;
    }

    if (percentageSignCount > 1) {
      acceptanceInputField.setCustomValidity("Invalid percentage value.");
      acceptanceInputField.reportValidity();
      return;
    }

    if (parseFloat(acceptanceInputField.value.slice(0, -1)) > 100 || parseFloat(acceptanceInputField.value.slice(0, -1)) < 0) {
      acceptanceInputField.setCustomValidity("Must be between '0%' and '100%' .");
      acceptanceInputField.reportValidity();
      return;
    }

    if (difficultyInputField.value.length === 0) {
      difficultyInputField.setCustomValidity("Difficulty can't be empty.");
      difficultyInputField.reportValidity();
      isValid = false;
      return;
    }

    if (!(difficultyInputField.value.trim().toLowerCase() === 'easy' || difficultyInputField.value.trim().toLowerCase() === 'medium' || difficultyInputField.value.trim().toLowerCase() === 'hard')) {
      difficultyInputField.setCustomValidity("Only 'Easy', 'Medium' and 'Hard' allowed.");
      difficultyInputField.reportValidity();
      return;
    }

    this.service.addQuestion({
      id: this.allQuestions.length + 1,
      title: titleInputField.value,
      acceptance: Number(acceptanceInputField.value.slice(0, -1)),
      difficulty: difficultyInputField.value.charAt(0).toUpperCase() + difficultyInputField.value.slice(1).toLowerCase(),
    }).subscribe((res) => {
      console.log("SENT FROM BACKEND");
    }, (err) => {
      console.log("Error in adding new question: ", err);
    });

    this.service.getData().subscribe((data) => {
      this.allQuestions = data;
      this.assignedToQuestionsArray();
    });

    this.closeModal();

    titleInputField.value = "";
    acceptanceInputField.value = "";
    difficultyInputField.value = "";


    this.addQuestionInputEmptyHandler();
  }

  pageNumber = 1;
  tempPageNumber = 1;
  maxPages = 1;

  leftPageSwitchHandler() {
    if (this.pageNumber === 1) { return; }
    this.pageNumber--;
    this.tempPageNumber = this.pageNumber;
    this.assignedToQuestionsArray();
  }

  rightPageSwitchHandler() {
    this.maxPages = Math.ceil(this.allQuestions.length / 50);
    if (this.pageNumber === this.maxPages) { return; }
    this.pageNumber++;
    this.tempPageNumber = this.pageNumber;
    this.assignedToQuestionsArray();
  }

  pageSwitcherInputEventHandler() {
    const pageSwitcherInputField = document.querySelector(".page-switcher-input-tag") as HTMLInputElement;
    pageSwitcherInputField.value = pageSwitcherInputField.value.replace(/\D/g, '');

    let val = Number(pageSwitcherInputField.value);

    this.maxPages = Math.ceil(this.allQuestions.length / 50);

    if (val > this.maxPages || val < 1) {
      pageSwitcherInputField.setCustomValidity(`Must be between 1 and ${this.maxPages}.`);
      pageSwitcherInputField.reportValidity();
      return;
    }
    pageSwitcherInputField.setCustomValidity('');

    this.pageNumber = val;

    this.assignedToQuestionsArray();
  }

  searchQuery = '';
  searchQuestionInputEventHandler() {
    if (this.searchQuery === '') {
      this.pageNumber = this.tempPageNumber;
      this.allQuestions = [...this.temp_AllQuestions];
      this.assignedToQuestionsArray();
      return;
    }
    this.pageNumber = 1;

    this.allQuestions = this.temp_AllQuestions.filter((question: any) => {
      return question.title.trim().toLowerCase().includes(this.searchQuery.trim().toLowerCase())
    });

    this.assignedToQuestionsArray();
  }
}
class ArrowsController {
  public counter = 0;
};

interface Question {
  id: number,
  title: string,
  acceptance: number,
  difficulty: string,
  isEditable: boolean,
  renderID: number
};