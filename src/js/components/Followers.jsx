var React = require('react');
var $ = require('jquery');
var Infinite = require('react-infinite');

var GithubUser = require('./GithubUser');

var Followers = React.createClass({
    propTypes: {
        params: React.PropTypes.shape({
            username: React.PropTypes.string.isRequired
        })
    },
    getInitialState: function () {
        return {
            page: 1,
            loading: false,
            followers: []
        };
    },

    fetchData: function () {
        if (this.state.done) { return; }
        this.setState({ loading: true });

        var that = this;
        var page = this.state.page;
        $.getJSON(`https://api.github.com/users/${this.props.params.username}/followers`)
            .then(
                function (followers) {
                    if (followers.length === 0) {
                        that.setState({
                            loading: false,
                            done: true
                        });
                    }
                    else {

                        that.setState({
                            followers: that.state.followers.concat(followers),
                            page: page + 1,
                            loading: false
                        });
                    }

                }
            );
    },
    render: function () {
        var items = this.state.followers.map(function (user) {
            return <div className="followers-list__item" key={user.id}>
                <li>
                    <GithubUser user={user} />
                </li>
            </div>;
        });

        return (
            <div className="followers-page">
                <h2>Followers of {this.props.params.username}</h2>
                <Infinite loadingSpinnerDelegate={<div className="loading" />} isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData} infiniteLoadBeginEdgeOffset={this.state.done ? undefined : 100} elementHeight={20} useWindowAsScrollContainer>
                    {items}
                </Infinite>
            </div>
        );
    }
});

module.exports = Followers;