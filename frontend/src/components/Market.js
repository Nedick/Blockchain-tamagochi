import React from "react";
import { ethers } from "ethers";

export class Market extends React.Component {
  constructor() {
    super();

    this.state = {
      amount: 0
    };
  }

  render() {
    return (
      <div>
        <h4>Market</h4>
        <form
          onSubmit={(event) => {
            // This function just calls the transferTokens callback with the
            // form's data.
            event.preventDefault();
  
            const formData = new FormData(event.target);
            const address = formData.get("address");
  
            if (address && this.state.amount) {
              this.props.buy(address, this.state.amount * this.props.priceInWei);
            }
          }}
        >
          <div className="form-group">
            <div className="form-group">
              <label>Address</label>
              <input className="form-control" type="text" name="address" required />
            </div>
            <label>Amount of food to buy {this.props.tokenSymbol}</label>
            <input
              className="form-control"
              type="number"
              step="1"
              name="amount"
              placeholder="1"
              required
              onChange={e => this.setState({ amount: e.target.value })}
            />
            <label>It will costs you {ethers.utils.formatEther((this.state.amount * this.props.priceInWei).toString())} ETH</label> 
          </div>
          <div className="form-group">
            <input className="btn btn-primary" type="submit" value="Buy" />
          </div>
        </form>
      </div>
    );
  }
}