export default class CommentsModel {
  #comments = null;

  constructor ({ comments }) {
    this.#comments = comments;
  }

  getComments() {
    return this.#comments;
  }
}
