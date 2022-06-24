const types = [
  {type: 'pay', ID: 'Payment', title: 'Payment'},
  {type: 'keyreg', ID: 'KeyRegistration', title: 'Key Registration'},
  {type: 'acfg', ID: 'AssetConfiguration', title: 'Asset Configuration'},
  {type: 'axfer', ID: 'AssetTransfer', title: 'Asset Transfer'},
  {type: 'afrz', ID: 'AssetFreeze', title: 'Asset Freeze'},
  {type: 'appl', ID: 'ApplicationCall', title: 'Application Call'},
  // TODO: Find out what a "Compact Certificate" is.
  {type: 'cert', ID: 'RecordCompactCertificate', title: 'Record Compact Certificate'},
];

const actions = [
  {type: 'NoOpOC', title: 'Call approval program'},
  {type: 'OptInOC', title: `Allocate LocalState for the application in sender's account`},
  {type: 'CloseOutOC', title: `Deallocate LocalState for the application in sender's account`},
  {type: 'ClearStateOC', title: 'Never failing CloseOutOC'},
  {type: 'UpdateApplicationOC', title: 'Update ApprovalProgram and ClearStateProgram for the application'},
  {type: 'DeleteApplicationOC', title: `Delete AppParams for the application from the creator's balance record`},
];

export {types, actions};