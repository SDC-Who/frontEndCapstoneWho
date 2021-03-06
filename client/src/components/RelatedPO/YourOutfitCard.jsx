import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import AddOutfitCard from './AddOutfitCard.jsx';
import POAvgRating from './POAvgRating.jsx';


class YourOutfitCard extends React.Component {
  constructor(props) {
    super(props);
    this.getAverage = this.getAverage.bind(this);
  }

  getAverage(reviews) {
    let sum = 0;
    let count = 0;
    for (let i in reviews) {
      sum += (parseInt(i) * parseInt(reviews[i]));
      count += parseInt(reviews[i]);
    }
    return (Math.round(sum / count * 4) / 4).toFixed(2);
  }


  render() {

    let newArticle = this.props.outfit;
    let price = newArticle.sale_price ? newArticle.sale_price : newArticle.original_price;
    let average = this.getAverage(newArticle.reviews);

    return(

      <div className="outfitCard">
          <div className="outImageCont">
              <div id="outActionBtn" >
                <img onClick={() => this.props.remove(newArticle.id)} name="outAction" height="20" src="https://img.icons8.com/windows/32/ffffff/macos-close.png"/>
              </div>
              <img className="relProdImage" src={newArticle.image}/>
          </div>
          <div className="relProdCategory">{newArticle.category}</div>
          <div className="relProdName">{newArticle.name}</div>
          <div className="relProdPrice"> ${price}<span className={newArticle.sale_price ? "sale" : "noSale"}>${newArticle.original_price}</span> </div>
            <div className="relProdReviews">
              <POAvgRating average={average} />
            </div>
        </div>

    );
  }
}

export default YourOutfitCard;