import React from "react"

export class Pet extends React.Component {
    constructor() {
        super();

        this.state = {
            amount: 0
        };
    }
    
    render() {
        return (
            <div>
                <h4>Existing Pets: </h4>
                <form
                    onSubmit={(event) => {
                        // This function just calls the transferTokens callback with the
                        // form's data.
                        event.preventDefault();
            
                        const formData = new FormData(event.target);
                        const petId = formData.get("petId");
                        const address = this.props.ownerAddress;
            
                        console.log(address, petId, this.props, this.state);
                        if (address && petId) {
                            this.props.createPet(address, petId);
                        }
                    }}
                    >
                    <div className="form-group">
                        <label>Choose Pet to feed: {this.props.value}</label>
                        <input
                            className="form-control"
                            type="number"
                            step="1"
                            name="petId"
                            placeholder="petId"
                            required
                            onChange={e => this.setState({ amount: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <input className="btn btn-primary" type="submit" value="Create Pet" />
                    </div>
                </form>
                <form
                    onSubmit={(event) => {
                        // This function just calls the transferTokens callback with the
                        // form's data.
                        event.preventDefault();
            
                        const formData = new FormData(event.target);
                        const address = formData.get("feedingPet");

                        console.log(this.props.tokenId, address, this.props)
                        if (this.props.tokenId && address) {
                            this.props.feed(this.props.tokenId, address);
                        }
                    }}
                    >
                    <div className="form-group">
                        <label>Choose Pet to feed: {this.props.value}</label>
                        <input
                            className="form-control"
                            type="number"
                            step="1"
                            name="feedingPet"
                            placeholder="petId"
                            required
                            onChange={e => this.setState({ amount: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Amount of food to send: {this.props.tokenSymbol}</label>
                        <input
                            className="form-control"
                            type="number"
                            step="1"
                            name="amountOfFood"
                            placeholder="amount of food"
                            required
                            onChange={e => this.setState({ amount: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <input className="btn btn-primary" type="submit" value="Feed Pet" />
                    </div>
                </form>
            </div>
        )
    }
}