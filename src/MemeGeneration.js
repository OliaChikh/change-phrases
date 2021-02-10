import React from 'react';

class MemeGeneration extends React.Component{
    constructor(){
        super();
        this.state = {
            topText: "",
            bottomText: "",
            randomImg : "http://i.imgflip.com/1bij.jpg",
            allMemesImg: []
        }
        this.handleChange =  this.handleChange.bind(this);
    }
    componentDidMount(){
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data;
                // console.log(memes[0])
                this.setState({allMemesImg: memes})
            })
    }
    handleChange(event) {
        // console.log("yep")
        const {name, value} = event.target;
        this.setState({[name]: value})
    }
    handleSubmit = event => {
        event.preventDefault();
        const randomNum =  Math.floor(Math.random() * this.state.allMemesImg.length);
        const randomMemeImg = this.state.allMemesImg[randomNum].url;
        this.setState( {randomImg: randomMemeImg} )
    }

    render(){
        return(
            <div>
                <form className = "meme-form" onSubmit = {this.handleSubmit}>
                    <input 
                        name = "topText" 
                        type = "text"  
                        value ={this.state.topText} 
                        placeholder = "Top text"
                        onChange = {this.handleChange}
                    />
                    <input 
                        name = "bottomText"
                        placeholder = "Bottom text"
                        type = "text"
                        value = {this.state.bottomText}
                        onChange = {this.handleChange}
                    />
                    <button>Gen</button>
                </form> 
                <div className = "meme">
                    <img src = {this.state.randomImg}/>
                    <h2 className = "top">{this.state.topText}</h2> 
                    <h2 className = "bottom">{this.state.bottomText}</h2>
                </div>   
            </div>
        )
    }
}
export default MemeGeneration