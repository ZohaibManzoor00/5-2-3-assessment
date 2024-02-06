const ToDoItem = require('./ToDoItem');
const ToDoList = require('./ToDoList');

const { bankAccountFactory, Phone, AppleIPhone } = require('./from-scratch');


const myPhone = new Phone('3448731233');

    const reubenContact = { name: 'Reuben', phoneNumber: '3462217541' };
    const peterContact = { name: 'Peter', phoneNumber: '3499217541' };
    myPhone.addContact(reubenContact);
    myPhone.addContact(peterContact);

    const reubenCallMsg = myPhone.makeCall('Reuben');
    // expect(reubenCallMsg).toEqual('Calling Reuben...');

    // const peterCallMsg = myPhone.makeCall('Peter');
    // expect(peterCallMsg).toEqual('Calling Peter...');
/*
"Contact not found" is misleading. If using quotes use the correct return. 
Otherwise say ...and it returns the right message

Make call
Getting the contact list is useless if no error handling
Calling [number] if not found is same as calling them 
*/
