import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get("api/questions");
  }

  editData(question: any) {
    return this.http.put<any>("api/update-question", question);
  }

  deleteQuestion(question: any) {
    return this.http.put("api/delete-question", question);
  }

  addQuestion(question: any) {
    return this.http.post("api/add-question", question);
  }
}
