# headless-accessibility-testing-automation
Headless Accessibility Testing Automation using chrome and puppeteer js


This demo will give you start and basic understanding of headless testing in chrome and also headless accessibility testing using chrome extension "axe-core".

This demo does testing of inbox of gmail.com.
It first does login into your account and then on your mailbox page it does accessibility testing and give your list of violations.

To run this code, perform following steps,

1. In gmail-test.js file do following changes
    a. Type your gmail id @ <username>
    b. Type your gmail account password @ <password>
    Note: This app doesn't transmit your personal details to any locationn. Its local to your machine only.

2. run command, npm install
3. run this code with commad, node gmail-test.js

Thats it. You can see search result in few seconds.

To make your automation HEADLESS, changes "headless" to false in gmail-test.js file.

To open developer tools option during automation, change "devtools" to true in gmail-test.js

By default axe-core runs 58 tests on all pages your do automation. If you want to disable any of this 58 rules you can do so. Example has given in gmail-test.js file.

Tip : This code makes very good use of es6 promise concept. If you are confused in understing this code you can read es6 promise to clear your doubts.
