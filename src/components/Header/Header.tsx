import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import UserMenu from '../UserMenu/UserMenu';
import { STRING_CONSTANTS } from '../Strings.const';

const Header = (props: { title: any; description: any; familyMembers: any; }) => {
  const { title, description, familyMembers } = props;
  return (
    <header className="header">
      <div className="header-title-grp">
        <h1 className="header-title">{title}</h1>
        <span className="header-description">{description}</span>
      </div>
      {familyMembers && <UserMenu familyMembers={familyMembers} />}
    </header>
  );
};

Header.defaultProps = {
  title: STRING_CONSTANTS.HeaderTitle,
  description: STRING_CONSTANTS.HeaderDescription
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  familyMembers: PropTypes.array.isRequired
}

export default Header