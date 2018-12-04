# portfolioAPI-Express
A back-end challenge project created using Express/Node.js where user can do basic CRUD and add "?date=YYYY-MM-DD" to filter data.

Live demo: https://tungthecoder.com/portfolioAPI-Express

## A few points before we start...
* Basic investment schema that I've implemented:


    "_id"       : automatically created _id by mongodb
    "date"      : date where investment was made
    "company"   : company which made the investment
    "quantity"  : total quantity of investments
    "cost"      : cost of each investment
    
* I've implemented 4 functions: Add New Investment / See Today's Investment / See All Investment / Choose Date to Edit Data
* While in "Today's Investment" (https://tungthecoder.com/portfolioAPI-Express/investments), you can add extra query "?date=YYYY-MM-DD" to the end of URL to modify the date you want to see investments accordingly.
* You can also use Edit Data to see Investments made by a specific date!
* Edit function will edit investment by date => company name
## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
git clone https://github.com/TungTNg/portfolioAPI-Express.git # or clone your own fork
cd portfolioAPI-Express
npm install
npm start
node app.js
```

Your app should now be running on [localhost:3082](http://localhost:3082/).
