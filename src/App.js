import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import style from './App.module.css';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const storageContacts = localStorage.getItem('contacts');

    if (storageContacts) {
      this.setState({ contacts: JSON.parse(storageContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addToContacts = (name, number) => {
    if (this.state.contacts.some(el => el.name === name)) {
      return alert(`${name} is already in contacts`);
    } else {
      const contact = {
        id: uuidv4(),
        name,
        number,
      };

      this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, contact],
        };
      });
    }
  };

  handleFilterChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDelete = id => {
    this.setState(state => {
      const contacts = state.contacts.filter(item => item.id !== id);
      return {
        contacts,
      };
    });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <>
        <h1 className={style.title}>Phonebook</h1>
        <ContactForm addToContacts={this.addToContacts} />
        <h2 className={style.title}>Contacts</h2>
        <Filter filter={filter} handleFilterChange={this.handleFilterChange} />
        <ContactList
          visibleContacts={visibleContacts}
          handleDelete={this.handleDelete}
        />
      </>
    );
  }
}
