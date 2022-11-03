import TripListView from '../view/trip-list-view.js';
import NewPointView from '../view/new-point-view.js';
import TripItemView from '../view/trip-item-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  listComponent = new TripListView();
  pointComponent = new NewPointView();

  init = (listConntainer) => {
    this.listConntainer = listConntainer;

    render (this.listComponent, this.listConntainer);
    render (this.pointComponent, this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new TripItemView(), this.listComponent.getElement());
    }
  };
}
