import TripListView from '../view/trip-list-view.js';
import NewPointView from '../view/new-point-view.js';
import TripItemView from '../view/trip-item-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  listComponent = new TripListView();

  init = (listConntainer, pointsModel) => {
    this.listConntainer = listConntainer;
    this.pointsModel = pointsModel;
    this.listPoints = [...this.pointsModel.getPoints()];

    render (this.listComponent, this.listConntainer);
    render (new NewPointView(this.listPoints), this.listComponent.getElement());

    for (let i = 0; i < this.listPoints.length; i++) {
      render(new TripItemView(this.listPoints[i]), this.listComponent.getElement());
    }
  };
}
