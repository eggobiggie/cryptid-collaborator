# friend-finder aka Cryptid Collaborator

The app itself can be found on [Heroku](https://obscure-dawn-62650.herokuapp.com/home.html)

When first directed to the page, the user will find an introduction to what the survey is about. At the bottom of the screen there are links for the users API, the cryptids API, and the github repo. 

![Home Page](./app/public/assets/images/cryptidImage.jpg)

Upon clicking the "Take Survey" button, the user is directed to a second page.

![Survey Page](./app/public/assets/images/cryptidImage2.jpg)

The user must add their name at the top.

The user then answers 10 questions that they can rate between 1 and 5 in terms of how much they may agree or disagree with a given statement.

When the user clicks "Submit", a modal will appear, informing them which cryptid they have been paired with.

![Modal](./app/public/assets/images/cryptidImage3.jpg)

If the user has not filled all of the fields in the survey, a modal will pop up informing them that they need to finish filling everything out.

![Second Modal](./app/public/assets/images/cryptidImage4.jpg)

The user name and scores are saved into the users API.
