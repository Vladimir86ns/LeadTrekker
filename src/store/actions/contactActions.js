import {
  ADD_NEW_CONTACT,
  UPDATE_CONTACT,
  REMOVE_CONTACT,
  SELECT_CONTACT,
  UN_SELECT_CONTACT
} from './types';

/**
 * Redux action to add new contact.
 */
export const addNewContact = (contact, history) => ({
  type: ADD_NEW_CONTACT,
  payload: { contact, history }
});

/**
 * Redux action to update contact.
 */
export const updateContact = (contact, history) => ({
  type: UPDATE_CONTACT,
  payload: { contact, history }
});

/**
 * Redux action to remove contact.
 */
export const removeContact = (contactId) => ({
  type: REMOVE_CONTACT,
  payload: { contactId }
});

/**
 * Redux action to select contact.
 */
export const selectContact = (contact) => ({
  type: SELECT_CONTACT,
  payload: { contact }
});

/**
 * Redux action to un select contact.
 */
export const unSelectContact = (contact) => ({
  type: UN_SELECT_CONTACT,
  payload: { contact }
});
