import React from 'react';
import PropTypes from 'prop-types';
import ContactListItem from '../ContactListItem';
import styles from './ContactList.module.css';

const ContactList = ({ visibleContacts, handleDelete }) => {
  return (
    <ul className={styles.contactList}>
      {visibleContacts.map(el => {
        return (
          <ContactListItem
            key={el.id}
            contact={el}
            handleDelete={() => handleDelete(el.id)}
          />
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  visibleContacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ),
  handleDelete: PropTypes.func.isRequired,
};

export default ContactList;
