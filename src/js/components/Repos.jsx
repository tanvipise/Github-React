var React = require('react');
var $ = require('jquery');
var Infinite = require('react-infinite');
var GithubRepo = require('./GithubRepo');

var Repos = React.createClass({

    propTypes: {
        params: React.PropTypes.shape({
            username: React.PropTypes.string.isRequired
        })
    },

    getInitialState: function () {
        console.log("getInitial", this.state);
        return {
            page: 1,
            loading: false,
            repos: []
        };
    },
    fetchData: function () {
        if (this.state.done) { return; }
        this.setState({ loading: true });
        console.log(this.state)
        var that = this;
        var page = this.state.page;
        $.getJSON(`https://api.github.com/users/${this.props.params.username}/repos`)
            .then(
                function (repos) {
                    console.log("respose", repos)
                    if (repos.length === 0) {
                        that.setState({
                            loading: false,
                            done: true
                        });
                    }

                    else {

                        that.setState({
                            repos: that.state.repos.concat(repos),
                            page: page + 1,
                            loading: false
                        });
                    }
                    console.log(this.state)
                }
            );
    },
    // componentDidMount: function () {
    //     var that = this;
    //     console.log("hello");

    //     $.getJSON(`https://api.github.com/users/${this.props.params.username}/repos`)
    //         .then(
    //             function (repos) {

    //                 that.setState({
    //                     repos: repos
    //                 });
    //             }
    //         );
    // },
    render: function () {

        var items = this.state.repos.map(function (repo) {
            return <div className="followers-list__item" key={repo.id}>
                <li>
                    <GithubRepo repo={repo} />
                </li>
            </div>;
        });

        if (!this.state.repos) {
            return (<div className="followers-page">LOADING...</div>);
        }
        return (
            <div className="followers-page">
                <h3>{this.props.params.username}'s repos</h3>
                <ul className="repos-list">

                    <Infinite loadingSpinnerDelegate={<div className="loading" />} isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData} infiniteLoadBeginEdgeOffset={this.state.done ? undefined : 100} elementHeight={20} useWindowAsScrollContainer>
                        {items}
                    </Infinite>
                </ul>
            </div>
        );
    }
});

module.exports = Repos;


// ............................................................working
// var React = require('react');
// var $ = require('jquery');

// var GithubRepo = require('./GithubRepo');

// var Repos = React.createClass({
//     propTypes: {
//         params: React.PropTypes.shape({
//             username: React.PropTypes.string.isRequired
//         })
//     },
//     getInitialState: function () {
//         return {};
//     },

//     componentDidMount: function () {
//         var that = this;

//         $.getJSON(`https://api.github.com/users/${this.props.params.username}/repos?since=1`)
//             .then(
//                 function (repos) {

//                     that.setState({
//                         repos: repos
//                     });
//                 }
//             );
//     },
//     // render: function () {
//     //     if (!this.state.repos) {
//     //         return (<div className="followers-page">LOADING...</div>);
//     //     }


//     //     return (
//     //         <div className="followers-page">
//     //             <h3>{this.props.params.username}'s repos</h3>
//     //             <ul className="followers-list">
//     //                 {
//     //                     this.state.repos.map(function (repo) {
//     //                         return <li key={repo.id}><GithubRepo repo={repo} /></li>;
//     //                     })
//     //                 }
//     //             </ul>

//     //            
//     //         </div>
//     //     );
//     // }
// });

// module.exports = Repos;