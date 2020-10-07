var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var User = React.createClass({
    propTypes: {
        params: React.PropTypes.shape({
            username: React.PropTypes.string.isRequired
        })
    },
    getInitialState: function () {
        return {};
    },

    componentDidMount: function () {
        this.fetchData();
    },

    componentDidUpdate: function (prevProps) {
        if (prevProps.params.username !== this.props.params.username) {
            this.fetchData();
        }
    },

    fetchData: function () {
        var that = this;

        $.getJSON(`https://api.github.com/users/${this.props.params.username}`)
            .then(
                function (user) {

                    that.setState({
                        user: user
                    });
                }
            );
    },

    renderStat: function (stat) {
        return (
            <li key={stat.name} className="user-info__stat">
                <Link to={stat.url}>
                    <p className="user-info__stat-value">{stat.value}</p>
                    <p className="user-info__stat-name">{stat.name}</p>
                </Link>
            </li>
        );
    },
    render: function () {
        if (!this.state.user) {
            return (<div className="user-page">LOADING...</div>);
        }

        var user = this.state.user;

        var stats = [
            {
                name: 'Public Repos',
                value: user.public_repos,
                url: `/user/${this.props.params.username}/repos`
            },
            {
                name: 'Followers',
                value: user.followers,
                url: `/user/${this.props.params.username}/followers`
            },
        ];
        return (
            <div className="user-page">
                <div className="user-info">
                    <Link className="user-info__text" to={`/user/${user.login}`}>
                        <img className="user-info__avatar" src={user.avatar_url} />
                        <h2 className="user-info__title">{user.login} ({user.name})</h2>

                    </Link>

                    <ul className="user-info__stats">
                        {stats.map(this.renderStat)}
                    </ul>
                </div>
                <div className="user-extra">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = User;