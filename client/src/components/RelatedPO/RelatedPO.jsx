import React from 'react';
import ReactDOM from 'react-dom';
import YourOutfitCard from './YourOutfitCard.jsx';
import RelatedProdCard from './RelatedProdCard.jsx';
import axios from 'axios';
import RelatedModal from './RelatedModal.jsx';



class RelatedPO extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedProducts: null,
      showModal: false
    }
    this.getRelatedProducts = this.getRelatedProducts.bind(this);
    this.handleActionButtonClick = this.handleActionButtonClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  componentDidMount() {
    this.getRelatedProducts();
  }

  handleActionButtonClick() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  handleModalClose(e) {
    e.preventDefault();
    console.log('click');
    this.setState({
      showModal: false
    })
  }


  getRelatedProducts() {
    let id = this.props.currProd.id;
    let extras = 'related';
    return axios.get('/products', {params: {id, extras}})
      .then(related => {
        let relatedProds = related.data.map(product => {
          return axios.get('/products', {params: {id: product}});
        })
        Promise.all(relatedProds)
          .then(results => {
            this.setState({
              relatedProducts: results
            });
          })
          .catch(error => console.log('ERROR with Promise.all', error));
      })
      .catch(error => console.log('ERROR retrieving data', error));
  }


  render() {

    if (!this.state.relatedProducts) {
      return(
        <div></div>
      );
    } else {
      return(
      <div>
        <div className="relatedCont">
          <div className="modalCont">
            <RelatedModal handleClose={this.handleModalClose} show={this.state.showModal} />
          </div>
          <div className="relatedCarousel">
            {this.state.relatedProducts.map((product, i) => {
              return <RelatedProdCard handleActionClick={this.handleActionButtonClick} getRelated={this.getRelatedProducts} update={this.props.updateProd} key={i} current={product}/>
            })}
          </div>
        </div>
        <div className="outfitCont">
          <div className="outfitCarousel">
            <YourOutfitCard />
          </div>
        </div>
      </div>
      );
    }


  }
}


export default RelatedPO;

