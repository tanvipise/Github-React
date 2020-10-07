var React = require('react');

var GithubRepo = React.createClass({
    propTypes: {
        repo: React.PropTypes.shape({
            html_url: React.PropTypes.string.isRequired,
            full_name: React.PropTypes.string.isRequired
        })
    },
    render: function () {
        var url = this.props.repo.html_url;
        var name = this.props.repo.full_name;

        return (
            <a target="_blank" className="github-repotag" href={url}>
                {name}

                {' '}
            </a>
        )
    }
});

module.exports = GithubRepo;

