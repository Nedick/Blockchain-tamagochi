import React from "react"

export class Pet extends React.Component {
    constructor() {
        super();

        this.state = {
            amount: 0
        };
    }

    changePetToFeed(event) {
        this.setState({
            petToFeed: event.target.value
        })
    }
    
    render() {
        return (
            <div>
                <h4>Create Pet: </h4>
                <form
                    onSubmit={(event) => {
                        // This function just calls the transferTokens callback with the
                        // form's data.
                        event.preventDefault();
            
                        const formData = new FormData(event.target);
                        const petId = formData.get("petId");
                        const address = formData.get("ownerAddress")
            
                        if (address && petId) {
                            this.props.createPet(address, petId);
                        }
                    }}
                    >
                    <div className="form-group">
                        <label>Choose Pet ID:</label>
                        <input
                            className="form-control"
                            type="number"
                            step="1"
                            name="petId"
                            placeholder="petId"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Owner address:</label>
                        <input
                            className="form-control"
                            type="text"
                            step="1"
                            name="ownerAddress"
                            placeholder="Address of the owner"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input className="btn btn-primary" type="submit" value="Create Pet" />
                    </div>
                </form>

                <h4>Feed Pet:</h4>
                <form
                    onSubmit={(event) => {
                        // This function just calls the transferTokens callback with the
                        // form's data.
                        event.preventDefault();

                        if (this.state.petToFeed) {
                            this.props.feed(this.state.petToFeed);
                        }
                    }}
                    >
                    <div className="form-group">
                        <label>Choose Pet to feed: {this.props.value}</label>
                        {
                            this.props.myPets.map((pet, index) => {
                                return (
                                    <div key={index}>
                                        <label>Pet - {pet.petId.toString()} - last feed time - {new Date(Number(pet.lastFeedTime.toString()) * 1000).toString()}</label>
                                        <input
                                            className="form-control"
                                            type="radio"
                                            name="petId"
                                            value={pet.petId.toString()}
                                            checked={this.state.petToFeed === pet.petId.toString()}
                                            onChange={this.changePetToFeed.bind(this)}
                                        />
                                        {pet.id}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="form-group">
                        <input className="btn btn-primary" type="submit" value="Feed Pet" />
                    </div>
                </form>
            </div>
        )
    }
}