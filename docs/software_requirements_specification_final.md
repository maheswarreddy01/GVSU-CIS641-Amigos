# Overview 
The SRS document specifies the working example of our website “Gift me!”. This document lists the functional and non-functional requirements of our website. Gift me! is an online platform, which eases customers to select the greeting card of their interest based on the occasions without going to store. This application helps customers to select card from wide number of varieties.
# Software Requirements

## Functional Requirements
### Login 
| ID | Requirement |
| :-------------: | :----------: |
| FR1 | Login page shall consist of email ID and password fields. |
| FR2 | Login page shall be accessible for both user and admin.|
| FR3 | Admin shall be redirected to dashboard on entering the login details. |
| FR4 | Incorrect email ID and password shall result in a pop-up message – “Check your credentials!”. |
| FR5 | By clicking on the Forgot Password link, the user shall have the option to update their password. |

### Signup
| ID | Requirement |
| :-------------: | :----------: |
| FR6 | Signup page shall consist of User name, email ID, password and gender fields. |
| FR7 | All the mandatory fields shall be filled to sign up to the website. |
| FR8 | Password shall contain minimum 6 characters. |
| FR9 | A verification code shall be sent to the email ID provided in the signup page for activation of the user account.|
| FR10 | Error message shall be displayed if the user enters password less than 6 characters – “Password should be of minimum 6 characters”. |

### Dashboard – Admin
| ID | Requirement |
| :-------------: | :----------: |
| FR11 | Admin shall have access to the application. |
| FR12 | The website shall provide a dashboard with each product’s selling rate and available stock of the products. |
| FR13 | Admin shall be notified if any product is out of stock. |
| FR14 | Admin shall have access to view the orders placed by the users. |
| FR15 | Admin have access to view the order history of any particular user in the dashboard. |

### Manage Product
| ID | Requirement |
| :-------------: | :----------: |
| FR16 | Admin shall be able to view products and make changes in the product description. |
| FR17 | Admin shall be able to add new product or delete an existing product of any occasions. |
| FR18 | Admin shall be able to add new occasion or update and delete existing occasion in the website. |
| FR19 | Admin shall have access to view the review comments and rating given by the users to any particular item. |
| FR20 | Admin shall suggest the products to user based on user’s watch history. |

### Manage cart
| ID | Requirement |
| :-------------: | :----------: |
| FR21 | User shall be able to select the greeting card directly from home page or search the card based on the occasion from home screen. |
| FR22| Product description, review of the product and rating shall be visible to the user. |
| FR23| Selected greeting card can be added to the cart to on clicking add to cart button.  |
| FR24 | User shall have access to add multiple number of greeting cards to cart. |
| FR25 | User shall have access to view the existing greeting cards in the cart. |

### Manage Order
| ID | Requirement |
| :-------------: | :----------: |
| FR26 | User shall select the existing greeting card from cart and place the order. |
| FR27| User shall place the order of the greeting card from the card description page. |
| FR28| Multiple cards shall be placed in one order by the user. |
| FR29 | Quantity of a particular greeting card can be increased or decreased on clicking + and – near the product. |
| FR30 | User shall remove a particular greeting card from the greeting cards list if he/she doesn’t want to place the order. |
| FR31 | Shipping address shall be added in the orders page by the user. |
| FR32 | Total price including taxes and delivery fee shall be displayed to the user based on the items selected. |
| FR33 | User shall proceed to payment screen on clicking proceed to payment button. |

### Manage Payment
| ID | Requirement |
| :-------------: | :----------: |
| FR34 | User shall select the mode of payments like cash on delivery, net banking and credit card. |
| FR35 | On selecting net banking or credit card, user shall be redirected to respective bank page. |
| FR36 | User shall receive an OTP to the registered mobile number and on entering the OTP received, the payment gets confirmed. |
| FR37 | User shall cancel the payment and go back to order screen. |
| FR38 | Once the payment gets confirmed, user shall be navigated to order summary screen. |
 
### Order Summary
 | ID | Requirement |
| :-------------: | :----------: |
| FR39 | User shall be able to view order details and payment details. |
| FR40 | User shall be able to view the shipping address and expected delivery date of the items. |
| FR41 | User shall keep track of the order and view the order status. |
| FR42 | User shall update the shipping address of the order before the status of the order gets changed to Shipped. |
| FR43 | User shall be able to cancel the order before the order gets shipped and payment gets refunded if the user has done online payment. |

## Non-Functional Requirements
  
### Security
| ID | Requirement |
| :-------------: | :----------: |
| NFR1 | User identification: System shall identify the user based on the login credentials provided. |
| NFR2 | Login: Each user that uses the system shall have a login ID and password. |
| NFR3 | Data Alteration: The database must be immediately synced with any changes, such as inserts, deletions, updates, etc. |
| NFR4 | Admin Rights: Admin shall view any product details in the Gift Me website and add new product or delete existing product in the system. |
| NFR5 | Inactivity: User shall be logged off if he/she is inactive for majority of the login duration. |
  
### Performance
| ID | Requirement |
| :-------------: | :----------: |
| NFR6 | Responsiveness: Confirmation message shall be displayed within 5 seconds once the order is placed successfully. |
| NFR7 | User-Interface: The user interface shall respond in five seconds or less. |
| NFR8 | Scalability: The system shall be able to accommodate several users without experiencing any lag time. This will demonstrate the application's high scalability and capacity to manage the demand. |
| NFR9 | Capacity: The system must be able to accommodate 100 users instantaneously. |
| NFR10 | Login: Each user must be able to log in to the website within five seconds. |
  
### Maintainability
| ID | Requirement |
| :-------------: | :----------: |
| NFR11 | Backup: The system shall provide effective data backup. |
| NFR12 | Errors: The system shall keep track of any problems and maintain a record of them. |
| NFR13 | Versatility: The application shall be kept up to date in order to handle any unforeseen issues. |
| NFR14 | Modifiability: The system shall be flexible enough to accommodate future changes. |
| NFR15 | Precision: The application's information shall be true and correct. |
  
### Usability
| ID | Requirement |
| :-------------: | :----------: |
| NFR16 | Performance: The system must handle load, bandwidth, and reaction time efficiently. |
| NFR17 | The website shall be self‐explanatory. |
| NFR18 | Reliability: The system shall be simple to use and accessible throughout the day. |
| NFR19 | The application's user interface should shall be created such that user and admin won't have to waste time looking for items to interact with. |
| NFR20 | Application navigator or PDF shall be displayed to the first-time user in the help center. |
  
### Privacy
| ID | Requirement |
| :-------------: | :----------: |
| NFR21 | The system shall ensure the privacy of the user personal details. |
| NFR22 | The system shall ensure the confidentiality of user login credentials. |
| NFR23 | Cookies information shall be stored confidentially within the system. |
| NFR24 | System shall protect the admin rights.  |
| NFR25 | The system shall guarantee the privacy of payment transactions and credit/debit card details. |

