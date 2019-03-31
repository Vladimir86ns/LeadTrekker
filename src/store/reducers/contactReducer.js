import { clone, findIndex, remove } from 'lodash';
import { CONTACTS } from '../../shared/MockData/Contacts/contacts';

import {
  ADD_NEW_CONTACT,
  UPDATE_CONTACT,
  REMOVE_CONTACT,
  SELECT_CONTACT,
  UN_SELECT_CONTACT,
} from '../actions/types';

// this is mock data for contacts
const initialState = {
  contacts: clone(CONTACTS),
  selectedContact: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_CONTACT:
      let allContacts = clone(state.contacts);
      let newContact = action.payload.contact;
      newContact.id = Math.floor(Date.now() / 100);
      allContacts.push(newContact)
      return {
        ...state,
        contacts: allContacts
      };

    case UPDATE_CONTACT:
      let index = findIndex(state.contacts, c => c.id === action.payload.contact.id )
      let clonedContacts = clone(state.contacts);
      clonedContacts[index] = action.payload.contact;

      return {
        ...state,
        contacts: clonedContacts
      };

    case REMOVE_CONTACT:
      let contacts = clone(state.contacts);
      return {
        ...state,
        contacts: remove(contacts, c => c.id !== action.payload.contactId)
      };

    case SELECT_CONTACT:
      return {
        ...state,
        selectedContact: action.payload.contact
      };

    case UN_SELECT_CONTACT:
      return {
        ...state,
      selectedContact: {}
      };

    default:
      return state;
  }
};

export default reducer;