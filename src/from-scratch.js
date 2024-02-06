const bankAccountFactory = (balance = 0) => {
  return { checkBalance, add, subtract }

  function checkBalance() {
    return balance 
  }

  function add(deposit) {
    balance += deposit
    console.log(`$${deposit} added.`)
  }

  function subtract(withdraw) {
    balance -= withdraw
    console.log(`$${withdraw} subtracted.`)
  }

};

class Phone {
  constructor(phoneNumber) {
    this.phoneNumber = phoneNumber
    this.contacts = []
  }

  makeCall(name) {
    const contact = this.contacts.find(contact => contact.name === name || contact.phoneNumber === name)
    if (!contact && name.length !== 10) return 'Invalid'
    return contact ? `Calling ${contact.name}...` : `Calling ${name}...` 
  }

  addContact(contactObj) {
    if (!contactObj?.name || !contactObj?.phoneNumber) return 'Invalid'
    if (contactObj.phoneNumber.length !== 10) return 'Invalid'
    this.contacts.push(contactObj)
    return `${contactObj.name} added.`
  }

  removeContact(name) {
    const idx = this.contacts.findIndex(contact => contact.name === name)
    if (idx === -1) return 'Contact not found.'
    this.contacts.splice(idx, 1)
    return `${name} removed.`
  } 
}

class AppleIPhone extends Phone {
  constructor(phoneNumber, model) {
    super(phoneNumber)
    this.model = model 
  }

  sendIMessage(recipientPhone, message) {
    const isIphone = recipientPhone instanceof AppleIPhone 
    return isIphone ? `Message: ${message} - sent from ${this.model}` : 'Message could not be sent.'
  }
}

module.exports = {
  bankAccountFactory,
  Phone,
  AppleIPhone,
};
