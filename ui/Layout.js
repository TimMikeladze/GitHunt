import React from 'react';
import { connect } from 'react-apollo';
import { Link } from 'react-router';

const NavbarLink = ({ title, href, active }) => (
  <li className={active && 'active'}>
    <Link to={href}>
      {title}
      {active && (
        <span className="sr-only">
          (current)
        </span>
      )}
    </Link>
  </li>
);

NavbarLink.defaultProps = {
  active: false,
};

NavbarLink.propTypes = {
  title: React.PropTypes.string.isRequired,
  href: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool,
};

const Profile = ({ data }) => {
  if (data.loading) {
    return (
      <p className="navbar-text navbar-right">
        Loading...
      </p>
    );
  } else if (data.currentUser) {
    return (
      <span>
        <p className="navbar-text navbar-right">
          {data.currentUser.login}
          &nbsp;
          <a href="/logout">Log out</a>
        </p>
        <Link
          type="submit"
          className="btn navbar-btn navbar-right btn-success"
          to="/submit"
        >
          <span className="glyphicon glyphicon-plus" aria-hidden="true" />
          &nbsp;
          Submit
        </Link>
      </span>
    );
  }
  return (
    <p className="navbar-text navbar-right">
      <a href="/login/github">Log in with GitHub</a>
    </p>
  );
};

Profile.propTypes = {
  data: React.PropTypes.object,
};

const ProfileWithData = connect({
  mapQueriesToProps: () => ({
    data: {
      query: gql`
        query CurrentUserForLayout {
          currentUser {
            login
            avatar_url
          }
        }
      `,
    },
  }),
})(Profile);

const Layout = ({ children, params, location }) => (
  <div>
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/feed/top">GitHunt</Link>
        </div>

        <ul className="nav navbar-nav">
          <NavbarLink
            title="Top"
            href="/feed/top"
            active={location.pathname === '/' || params.type === 'top'}
          />
          <NavbarLink
            title="New"
            href="/feed/new"
            active={params.type === 'new'}
          />
        </ul>

        <ProfileWithData />
      </div>
    </nav>
    <div className="container">
      {children}
    </div>
  </div>
);

Layout.propTypes = {
  children: React.PropTypes.node,
  params: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default Layout;
