const path = require('path');
const ScoreCounter = require('score-tests');
const {
  bankAccountFactory,
  Phone,
  AppleIPhone,
} = require('./from-scratch');

const testSuiteName = 'From Scratch Tests';
const scoresDir = path.join(__dirname, '..', 'scores');
const scoreCounter = new ScoreCounter(testSuiteName, scoresDir);

const log = jest.spyOn(console, 'log').mockImplementation(() => {});

describe(testSuiteName, () => {
  afterEach(() => {
    console.log.mockClear();
  });

  it('bankAccountFactory - object initialized with ONLY the expected methods', () => {
    const myAccount = bankAccountFactory();
    expect(Object.keys(myAccount)).toEqual(['checkBalance', 'add', 'subtract']);

    expect(typeof myAccount.checkBalance).toEqual('function');
    expect(typeof myAccount.add).toEqual('function');
    expect(typeof myAccount.subtract).toEqual('function');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('bankAccountFactory - checkBalance(): returns the current balance as a number', () => {
    const myAccount = bankAccountFactory(1000);
    expect(myAccount.checkBalance()).toEqual(1000);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('bankAccountFactory - an account value defaults to 0 if no argument is given', () => {
    const myAccount = bankAccountFactory();
    expect(myAccount.checkBalance()).toEqual(0);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('bankAccountFactory - add(): increases the balance and console logs a message', () => {
    const startingBalance = Math.floor(Math.random() * 1000);
    const firstAmount = Math.floor(Math.random() * 1000);
    const secondAmount = Math.floor(Math.random() * 1000);
    const firstTotal = startingBalance + firstAmount;
    const secondTotal = firstTotal + secondAmount;

    const myAccount = bankAccountFactory(startingBalance);
    myAccount.add(firstAmount);
    expect(myAccount.checkBalance()).toEqual(firstTotal);
    expect(log).lastCalledWith(`$${firstAmount} added.`);

    myAccount.add(secondAmount);
    expect(myAccount.checkBalance()).toEqual(secondTotal);
    expect(log).lastCalledWith(`$${secondAmount} added.`);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('bankAccountFactory - subtract(): decreases the balance and logs a message', () => {
    const startingBalance = Math.floor(Math.random() * 1000);
    const firstAmount = Math.floor(Math.random() * 1000);
    const secondAmount = Math.floor(Math.random() * 1000);
    const firstTotal = startingBalance - firstAmount;
    const secondTotal = firstTotal - secondAmount;

    const myAccount = bankAccountFactory(startingBalance);
    myAccount.subtract(firstAmount);
    expect(myAccount.checkBalance()).toEqual(firstTotal);
    expect(log).lastCalledWith(`$${firstAmount} subtracted.`);

    myAccount.subtract(secondAmount);
    expect(myAccount.checkBalance()).toEqual(secondTotal);
    expect(log).lastCalledWith(`$${secondAmount} subtracted.`);

    const amountToGoNegative = 200;
    const myNegativeAccount = bankAccountFactory(100);
    myNegativeAccount.subtract(amountToGoNegative);
    expect(log).lastCalledWith(`$${amountToGoNegative} subtracted.`);
    expect(myNegativeAccount.checkBalance()).toEqual(-100);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('Phone - creates the right instance properties', () => {
    const myPhone = new Phone('3448731233');
    expect(myPhone).toEqual({ phoneNumber: '3448731233', contacts: [] });

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('Phone - creates the right instance methods', () => {
    /** What's all this?
     *  We're checking to see that you only added the right methods to this class.
     *  A `Set` is like the object lookup tables we've used before,
     *  it only cares about existence not order.
     */
    const expectedMethods = new Set(['constructor', 'makeCall', 'addContact', 'removeContact']);
    const givenMethods = new Set(Object.getOwnPropertyNames(Phone.prototype));
    expect(givenMethods).toEqual(expectedMethods);

    expect(Phone.prototype.makeCall).toEqual(expect.any(Function));
    expect(Phone.prototype.addContact).toEqual(expect.any(Function));
    expect(Phone.prototype.removeContact).toEqual(expect.any(Function));

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('Phone - addContact(): adds a contact to the contacts array and returns the right message', () => {
    const myPhone = new Phone('3448731233');

    const reubenContact = { name: 'Reuben', phoneNumber: '3462217541' };
    const reubenAddedMsg = myPhone.addContact(reubenContact);
    expect(myPhone.contacts).toEqual([reubenContact]);
    expect(reubenAddedMsg).toEqual('Reuben added.');

    const peterContact = { name: 'Peter', phoneNumber: '3499217541' };
    const peterAddedMsg = myPhone.addContact(peterContact);
    expect(myPhone.contacts).toEqual([reubenContact, peterContact]);
    expect(peterAddedMsg).toEqual('Peter added.');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it(`Phone - addContact(): returns "Invalid" and doesn't add a contact if name or phoneNumber are missing`, () => {
    const myPhone = new Phone('3448731233');

    // missing all properties
    expect(myPhone.addContact({})).toEqual('Invalid');
    expect(myPhone.contacts).toEqual([]);

    // missing phone number
    expect(myPhone.addContact({ name: 'Sketchy' })).toEqual('Invalid');
    expect(myPhone.contacts).toEqual([]);

    // missing name
    expect(myPhone.addContact({ phoneNumber: '3462217541' })).toEqual('Invalid');
    expect(myPhone.contacts).toEqual([]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('Phone - addContact(): returns "Invalid" and does not add a contact if phoneNumber is not exactly 10 digit string', () => {
    const myPhone = new Phone('3448731233');

    expect(myPhone.addContact({ name: 'Reuben', phoneNumber: '1-871-943-1324' })).toEqual('Invalid');
    expect(myPhone.contacts).toEqual([]);

    expect(myPhone.addContact({ name: 'Reuben', phoneNumber: '346' })).toEqual('Invalid');
    expect(myPhone.contacts).toEqual([]);

    expect(myPhone.addContact({ name: 'Reuben', phoneNumber: "Well now this isn't right" })).toEqual('Invalid');
    expect(myPhone.contacts).toEqual([]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('Phone - removeContact(): removes a contact from the contacts array and returns the right message', () => {
    const myPhone = new Phone('3448731233');

    const reubenContact = { name: 'Reuben', phoneNumber: '3462217541' };
    const peterContact = { name: 'Peter', phoneNumber: '3499217541' };
    myPhone.addContact(reubenContact);
    myPhone.addContact(peterContact);

    const reubenRemovedMsg = myPhone.removeContact('Reuben');
    expect(myPhone.contacts).toEqual([peterContact]);
    expect(reubenRemovedMsg).toEqual('Reuben removed.');

    const peterRemovedMsg = myPhone.removeContact('Peter');
    expect(myPhone.contacts).toEqual([]);
    expect(peterRemovedMsg).toEqual('Peter removed.');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('Phone - removeContact(): returns "Contact not found" if the contact is not found', () => {
    const myPhone = new Phone('3448731233');

    const peterRemovedMsg = myPhone.removeContact('Peter');
    expect(myPhone.contacts).toEqual([]);
    expect(peterRemovedMsg).toEqual('Contact not found.');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('Phone - removeContact(): mutates instead of replacing the contact array to remove contact', () => {
    const myPhone = new Phone('3448731233');

    const reubenContact = { name: 'Reuben', phoneNumber: '3462217541' };
    const peterContact = { name: 'Peter', phoneNumber: '3499217541' };
    myPhone.addContact(reubenContact);
    myPhone.addContact(peterContact);
    const contactsReference = myPhone.contacts;

    myPhone.removeContact('Reuben');
    expect(contactsReference).toEqual([peterContact]);

    myPhone.removeContact('Peter');
    expect(contactsReference).toEqual([]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('Phone - makeCall(): returns the right message if the contact is found', () => {
    const myPhone = new Phone('3448731233');

    const reubenContact = { name: 'Reuben', phoneNumber: '3462217541' };
    const peterContact = { name: 'Peter', phoneNumber: '3499217541' };
    myPhone.addContact(reubenContact);
    myPhone.addContact(peterContact);

    const reubenCallMsg = myPhone.makeCall('Reuben');
    expect(reubenCallMsg).toEqual('Calling Reuben...');

    const peterCallMsg = myPhone.makeCall('Peter');
    expect(peterCallMsg).toEqual('Calling Peter...');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('Phone - makeCall(): returns "Calling [number]..." if the contact is not found', () => {
    const myPhone = new Phone('3448731233');

    const stranger = myPhone.makeCall('8615174439');
    expect(stranger).toEqual('Calling 8615174439...');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('Phone - makeCall(): returns "Invalid" if given non 10 digit string number or name not in contacts', () => {
    const myPhone = new Phone('3448731233');

    expect(myPhone.makeCall('123')).toEqual('Invalid');
    expect(myPhone.makeCall('10329113')).toEqual('Invalid');
    expect(myPhone.makeCall('00000000000000000000')).toEqual('Invalid');
    expect(myPhone.makeCall('Some Stranger')).toEqual('Invalid');
    expect(myPhone.makeCall('LiterallyAnyoneNotInContacts')).toEqual('Invalid');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('AppleIPhone - creates a phone with the right instance properties', () => {
    const phoneNumber = '3448731233';
    const model = 'iPhone 6S';
    const myIPhone = new AppleIPhone(phoneNumber, model);

    expect(myIPhone).toEqual({ phoneNumber, model, contacts: [] });

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('AppleIPhone - creates a phone with the right instance methods', () => {
    /** What's all this?
     *  We're checking to see that you only added the right methods to this class.
     *  A `Set` is like the object tables we've used before ({a: true}),
     *  it only cares about existence not order.
     */
    const myIPhonePrototype = AppleIPhone.prototype;
    const expectedMethods = new Set(['constructor', 'sendIMessage']);
    const givenMethods = new Set(Object.getOwnPropertyNames(myIPhonePrototype));
    expect(new Set(givenMethods)).toEqual(expectedMethods);
    expect(myIPhonePrototype.sendIMessage).toEqual(expect.any(Function));

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('AppleIPhone - inherits from Phone', () => {
    const myIPhone = new AppleIPhone('3448731233', 'iPhone 12');
    const myAndroid = new Phone('3448731233');

    expect(myIPhone instanceof AppleIPhone).toBeTruthy();
    expect(myIPhone instanceof Phone).toBeTruthy();
    expect(myAndroid instanceof AppleIPhone).toBeFalsy();
    expect(myAndroid instanceof Phone).toBeTruthy();

    const zoContact = { name: 'Zo', phoneNumber: '8462092523' };
    myIPhone.addContact(zoContact);
    expect(myIPhone.contacts).toEqual([zoContact]);
    expect(myIPhone.makeCall(zoContact.phoneNumber)).toEqual(`Calling Zo...`);
    myIPhone.removeContact('Zo');
    expect(myIPhone.contacts).toEqual([]);

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  it('AppleIPhone - sendIMessage(): returns the right message when messaging iPhones vs. others', () => {
    const myIPhone = new AppleIPhone('3448731233', 'iPhone 6S');
    const mayaAndroid = new Phone('3499217541');

    // we don't want you to just check the model, so it's random and counterfeited!
    const reubenIPhone = new AppleIPhone('3462217541', Math.random().toString(36).substring(7));
    const knockoffIphone = new Phone('3462217541');
    knockoffIphone.model = 'iPhon 77';

    const randomIMsg = Math.random().toString(36).substring(7);
    const reubenAppleMsg = myIPhone.sendIMessage(reubenIPhone, randomIMsg);
    expect(reubenAppleMsg).toEqual(`Message: ${randomIMsg} - sent from ${myIPhone.model}`);

    const mayaAndroidMsg = myIPhone.sendIMessage(mayaAndroid, 'Hey Maya');
    expect(mayaAndroidMsg).toEqual('Message could not be sent.');

    const knockoffIphoneMsg = myIPhone.sendIMessage(knockoffIphone, 'What even is that phone?');
    expect(knockoffIphoneMsg).toEqual('Message could not be sent.');

    scoreCounter.correct(expect); // DO NOT TOUCH
  });

  // IGNORE PLEASE
  beforeEach(() => scoreCounter.add(expect));
  afterAll(scoreCounter.export);
});
