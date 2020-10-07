var React = require('react');
var history = require('react-router').browserHistory;
var Link = require('react-router').Link;
var Infinite = require('react-infinite');


var Search = React.createClass({
    _handleSubmit: function (e) {


        e.preventDefault();
        history.push(`/user/${this.refs.userInput.value}`)
    },

    getInitialState: function () {
        console.log("in search");
        return {

            names: []
        };
    },
    _handleChange: function (e) {
        let currentList = [];
        let newList = [];
        console.log("currentlist", currentList)
        if (e.target.value !== "") {
            currentList = this.state.names;
            newList = currentList.filter(item => {
                const lc = item.login.toLowerCase();
                const filter = e.target.value.toLowerCase();
                return lc.includes(filter);
            });
        } else {
            newList = this.state.names;
            console.log("newlist", newlist)
        }
        this.setState({
            names: newList
        });
    },

    componentDidMount: function () {

        var that = this;

        fetch('https://api.github.com/users?since=1')
            .then(res => res.json())
            .then(json => {

                let list = this.state.names;
                that.setState({
                    isLoaded: true,
                    names: list.concat(json),

                })


            });


    },
    render: function () {
        var items = this.state.names.map(function (user) {


            return <div className="container">
                <div className="row" >
                    <div className="col-4">
                        <img className="search-page__avatar" src={user.avatar_url} alt="avatar_url"></img>
                    </div>

                    <div className="col-4">
                        <Link to={`/user/${user.login}`}>{user.login}   </Link>

                    </div>
                </div>
            </div>;
        });


        return (

            < div className="search-page" >
                <div className="row">
                    <div className="col-4">
                        <h2>Enter username</h2>
                    </div>
                    <div className="container">
                        <form >
                            <input ref="userInput" className="search-page__input" type="text" onChange={this._handleChange} />
                            <button className="search-page__button">Search</button>
                        </form>
                    </div>
                </div>
                <ul>

                    <h2>List of users</h2>

                    <div className="followers-page">

                        <Infinite loadingSpinnerDelegate={<div className="loading" />} isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData} infiniteLoadBeginEdgeOffset={this.state.done ? undefined : 100} elementHeight={20} useWindowAsScrollContainer>
                            {items}
                        </Infinite>
                    </div>
                </ul>

            </div >
        );
    }
});

module.exports = Search;