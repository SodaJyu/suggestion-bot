# This is Suggestion-Bot.

- [ ] Have you ever found yourself unsure of what you should do? 
- [ ] Struggling to make a decision?
- [ ] S/O annoyed by your indecisiveness?

If you answered yes to any of the above then this app might be for you.

Suggestion-Bot is an app that allows you to input a statement. The app then categorises the statement as either positive or negative using sentiment analysis.
The app will then return a suggestion based on whether the input was deemed positive or negative.


*This project was bootstrapped with create-react-app.*

## To begin with:
1. open a terminal, cd into backend. run ```npm i```.
2. repeat 1. but cd into frontend.
3. open a psql terminal and run ```CREATE DATABASE suggestions```.
4. in backend terminal, ``` npm run migrate ``` and ```npm run seed```.
5. create a ``` .env.local ``` file in your root directory and set the values to:```
DB_NAME=suggestions
DB_USER=<your postgres username>
DB_PASSWORD=<DB_USERs corresponding password> ```



## To start the servers:
type ```npm start``` into both frontend and backend terminals.
Your frontend server should now be running on ```localhost:3000```. If not, you can post an issue on Github.

## Once running:
You can add a new suggestion to the database by clicking the ``` New Suggestion ``` button. 
This will open a form where you can input your suggestion before pressing ```Add!```.
Otherwise you can type your conundrum into the text box located in the center of the page.
Upon pressing ```Submit``` a suggestion will pop-up.
If you like the suggestion, press the ```like``` button.
Otherwise press the ```Dislike``` button for a different suggestion.





